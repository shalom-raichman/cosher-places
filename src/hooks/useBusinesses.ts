import { useEffect, useState } from 'react'
import type { Business } from '../types/business'
import { loadCSVFromPath, parseCSVFile } from '../services/csvService'

export function useBusinesses(defaultCsvPath?: string) {
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    if (!defaultCsvPath) return
    setLoading(true)
    setError('')
    loadCSVFromPath(defaultCsvPath)
      .then(setBusinesses)
      .catch(() => setError('שגיאה בטעינת קובץ ה-CSV. אנא בדוק שהקובץ תקין.'))
      .finally(() => setLoading(false))
  }, [defaultCsvPath])

  const loadFromFileSystem = async (path: string) => {
    try {
      setLoading(true)
      setError('')
      const loaded = await loadCSVFromPath(path)
      setBusinesses(loaded)
    } catch (e) {
      setError('שגיאה בטעינת קובץ ה-CSV. אנא בדוק שהקובץ תקין.')
    } finally {
      setLoading(false)
    }
  }

  const uploadFile = async (file: File) => {
    try {
      setLoading(true)
      setError('')
      const loaded = await parseCSVFile(file)
      setBusinesses(loaded)
    } catch (e) {
      setError('שגיאה בפענוח קובץ ה-CSV. אנא בדוק שהקובץ תקין.')
    } finally {
      setLoading(false)
    }
  }

  return {
    businesses,
    setBusinesses,
    loading,
    error,
    loadFromFileSystem,
    uploadFile,
  } as const
}
