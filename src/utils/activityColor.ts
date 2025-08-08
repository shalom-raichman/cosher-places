const activityColorMap: Record<string, string> = {
  'קייטרינג בשרי': 'bg-red-500',
  'קייטרינג חלבי': 'bg-blue-500',
  'מסעדות ומזנונים': 'bg-green-500',
  'מסעדה חלבית': 'bg-blue-400',
  'אולמות': 'bg-purple-500',
  'ישיבות ומוסדות': 'bg-indigo-500',
  'מעדניות': 'bg-yellow-500',
  'בתי מלון': 'bg-pink-500',
  'בתי אבות': 'bg-gray-500',
  'עיצובי פירות וקינוחים': 'bg-orange-500',
};

export function getActivityColor(activity: string): string {
  for (const [key, color] of Object.entries(activityColorMap)) {
    if (activity.includes(key)) return color;
  }
  return 'bg-gray-400';
}


