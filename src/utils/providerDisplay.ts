// Maps known provider tokens to Hebrew display names
const providerTokenToDisplay: Record<string, string> = {
  landa: 'לנדא',
  rubin: 'רובין',
  badatz: 'בד"ץ',
  eida: 'העדה החרדית',
  tzohar: 'צהר',
}

function normalizeBaseName(pathOrName: string): string {
  const base = pathOrName.split('/').pop() || pathOrName
  return base.replace(/\.[^.]+$/, '') // strip extension
}

export function mapProviderFileNameToDisplay(pathOrName: string): string {
  const base = normalizeBaseName(pathOrName).toLowerCase()
  const tokens = base.split(/[^a-zA-Zא-ת0-9]+/).filter(Boolean)
  const tokenSet = new Set(tokens)

  for (const [token, display] of Object.entries(providerTokenToDisplay)) {
    if (tokenSet.has(token)) return display
  }

  // Fallback: make a readable name from the base
  const humanized = base.replace(/[-_]+/g, ' ').trim()
  return humanized || 'ללא ספק'
}
