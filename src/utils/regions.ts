export type Region = 'צפון' | 'מרכז' | 'ירושלים' | 'דרום' | 'שפלה' | 'כללי'

// Naive region inference from city name; adjust as needed
const north = new Set([
  'נהריה',
  'עכו',
  'מגדל העמק',
  'יקנעם',
  'יוקנעם',
  'טבריה',
  'כרמיאל',
  'חיפה',
])
const center = new Set([
  'תל אביב',
  'פתח תקוה',
  'רמת גן',
  'גבעתיים',
  'בני ברק',
  'הרצליה',
  'נתניה',
])
const jerusalem = new Set(['ירושלים', 'ביתר עילית'])
const south = new Set(['אשקלון', 'אשדוד', 'באר שבע', 'ערד'])
const shfela = new Set(['רחובות', 'נס ציונה', 'ראשון לציון', 'לוד', 'יבנה', 'מודיעין'])

export function inferRegion(city?: string): Region {
  if (!city) return 'כללי'
  if (north.has(city)) return 'צפון'
  if (center.has(city)) return 'מרכז'
  if (jerusalem.has(city)) return 'ירושלים'
  if (south.has(city)) return 'דרום'
  if (shfela.has(city)) return 'שפלה'
  return 'כללי'
}
