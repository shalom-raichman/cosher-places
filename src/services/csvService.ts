import { parse } from 'csv-parse/browser/esm/sync'
import type { Business } from '../types/business'
import { mapProviderFileNameToDisplay } from '../utils/providerDisplay'

// Map Hebrew headers to English keys once
const headerMap: Record<string, keyof Business> = {
  'שם עסק': 'name',
  כתובת: 'address',
  עיר: 'city',
  סוג: 'type',
  'פעילות עסק': 'activity',
}

export async function parseCSVFile(file: File): Promise<Business[]> {
  const rawText = await file.text()
  const text = sanitizeCsvText(rawText)
  const records = parse(text, {
    columns: (header: string[]) =>
      header.map((h) => (headerMap as Record<string, string>)[h] || h),
    skip_empty_lines: true,
    trim: true,
  }) as Array<Record<string, unknown>>

  const validBusinesses: Business[] = (records || [])
    .filter((row) => (row as any).name && String((row as any).name).trim())
    .map((row) => ({
      name: String((row as any).name ?? '').trim(),
      address: String((row as any).address ?? '').trim(),
      city: String((row as any).city ?? '').trim(),
      type: String((row as any).type ?? '').trim(),
      activity: String((row as any).activity ?? '').trim(),
      provider: inferProviderFromFileName(file.name),
    }))

  return validBusinesses
}

export async function loadCSVFromPath(path: string): Promise<Business[]> {
  // Read using a custom window.fs if available, otherwise fetch from public
  const hasWindowFs = typeof window !== 'undefined' && (window as any).fs?.readFile
  if (hasWindowFs) {
    const fileData: string = await (window as any).fs.readFile(path, { encoding: 'utf8' })
    const blob = new Blob([fileData], { type: 'text/csv' })
    const file = new File([blob], path, { type: 'text/csv' })
    return parseCSVFile(file)
  }

  const response = await fetch(path)
  if (!response.ok) {
    throw new Error(`Failed to fetch CSV from ${path}`)
  }
  const rawText = await response.text()
  const text = sanitizeCsvText(rawText)
  const records = parse(text, {
    columns: (header: string[]) =>
      header.map((h) => (headerMap as Record<string, string>)[h] || h),
    skip_empty_lines: true,
    trim: true,
  }) as Array<Record<string, unknown>>
  return (records || [])
    .filter((row) => (row as any).name && String((row as any).name).trim())
    .map((row) => ({
      name: String((row as any).name ?? '').trim(),
      address: String((row as any).address ?? '').trim(),
      city: String((row as any).city ?? '').trim(),
      type: String((row as any).type ?? '').trim(),
      activity: String((row as any).activity ?? '').trim(),
      provider: inferProviderFromFileName(path),
    }))
}

function inferProviderFromFileName(pathOrName: string): string {
  try {
    return mapProviderFileNameToDisplay(pathOrName)
  } catch {
    return 'ללא ספק'
  }
}

function sanitizeCsvText(text: string): string {
  // Find the first line that looks like a header (contains key Hebrew columns)
  const lines = text.split(/\r?\n/)
  const headerIndex = lines.findIndex(
    (line) => /שם\s*עסק/.test(line) && /כתובת/.test(line) && /עיר/.test(line)
  )
  if (headerIndex > 0) {
    return lines.slice(headerIndex).join('\n')
  }
  return text
}
