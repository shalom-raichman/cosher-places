export type KosherCategory = 'חלבי' | 'בשרי' | 'פרווה' | 'פרווה/חלבי' | 'לא ידוע'

export function deriveKosherCategory(activity: string | undefined): KosherCategory {
  const text = (activity ?? '').toLowerCase()
  const hasDairy = /חלבי|חלבית/.test(text)
  const hasMeat = /בשרי|בשרים/.test(text)
  const hasParve = /פרווה/.test(text)

  if (
    (hasParve && hasDairy) ||
    (hasDairy && !hasMeat && /קונדיטור|מאפה|קפה/.test(text))
  ) {
    return 'פרווה/חלבי'
  }
  if (hasDairy) return 'חלבי'
  if (hasMeat) return 'בשרי'
  if (hasParve) return 'פרווה'
  return 'לא ידוע'
}

export function getKosherCategoryBadgeColor(category: KosherCategory): string {
  switch (category) {
    case 'חלבי':
      return 'bg-blue-600'
    case 'בשרי':
      return 'bg-red-600'
    case 'פרווה':
      return 'bg-emerald-600'
    case 'פרווה/חלבי':
      return 'bg-cyan-600'
    default:
      return 'bg-gray-500'
  }
}
