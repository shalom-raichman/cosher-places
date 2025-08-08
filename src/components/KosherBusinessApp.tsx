import React from 'react'
import { Search, MapPin, Utensils, FileText, Filter } from 'lucide-react'
import { useBusinesses } from '../hooks/useBusinesses'
import { useFilters } from '../hooks/useFilters'
import { getActivityColor } from '../utils/activityColor'
import {
  deriveKosherCategory,
  getKosherCategoryBadgeColor,
} from '../utils/kosherCategory'

const KosherBusinessApp: React.FC = () => {
  const { businesses, loading, error } = useBusinesses('/kosher-list-landa-filtered.csv')
  const { filters, filterOptions, filteredBusinesses, updateFilter, clearFilters } =
    useFilters(businesses)

  return (
    <div className='bg-gray-50' dir='rtl'>
      <div className='container mx-auto px-4 py-8 max-w-7xl'>
        {/* Header */}
        <div className='text-center mb-8 bg-white border border-gray-200 rounded-2xl p-8 shadow-sm'>
          <h1 className='text-3xl md:text-4xl font-extrabold text-gray-900 mb-2'>
            🍽️ עסקים כשרים
          </h1>
          <p className='text-gray-600'>מדריך עסקים כשרים</p>

          {loading && (
            <div className='text-gray-700 text-lg'>
              <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600 mx-auto mb-2'></div>
              טוען נתונים...
            </div>
          )}

          {error && (
            <div className='bg-red-50 text-red-700 border border-red-200 p-4 rounded-xl'>
              {error}
            </div>
          )}
        </div>

        {businesses.length > 0 && (
          <>
            {/* Filters */}
            <div className='sticky top-4 z-20 bg-white/95 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-xl border border-gray-100'>
              <div className='flex items-center justify-between mb-6'>
                <h2 className='text-2xl font-bold text-gray-800 flex items-center gap-2'>
                  <Filter size={24} />
                  סינון תוצאות
                </h2>
                <button
                  onClick={clearFilters}
                  className='bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors duration-200'
                >
                  נקה מסננים
                </button>
              </div>

              {/* Quick category tabs */}
              <div className='mb-4 flex flex-wrap gap-2'>
                {['הכל', 'חלבי', 'בשרי', 'פרווה', 'פרווה/חלבי'].map((label) => (
                  <button
                    key={label}
                    onClick={() => updateFilter('category', label === 'הכל' ? '' : label)}
                    className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                      (filters as any).category === label ||
                      (label === 'הכל' && !(filters as any).category)
                        ? 'bg-purple-600 text-white border-purple-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4'>
                {/* City Filter */}
                <div className='space-y-2'>
                  <label className='block text-sm font-medium text-gray-700'>
                    סינון לפי עיר
                  </label>
                  <select
                    value={filters.city}
                    onChange={(e) => updateFilter('city', e.target.value)}
                    className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent'
                  >
                    <option value=''>כל הערים</option>
                    {filterOptions.cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Provider Filter */}
                <div className='space-y-2'>
                  <label className='block text-sm font-medium text-gray-700'>
                    סינון לפי ספק כשרות
                  </label>
                  <select
                    value={filters.provider}
                    onChange={(e) => updateFilter('provider', e.target.value)}
                    className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent'
                  >
                    <option value=''>כל הספקים</option>
                    {filterOptions.providers.map((provider) => (
                      <option key={provider} value={provider}>
                        {provider}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Search */}
                <div className='space-y-2'>
                  <label className='block text-sm font-medium text-gray-700'>
                    חיפוש חופשי
                  </label>
                  <div className='relative'>
                    <Search
                      size={20}
                      className='absolute right-3 top-3.5 text-gray-400'
                    />
                    <input
                      type='text'
                      placeholder='חיפוש בשם העסק או כתובת...'
                      value={filters.search}
                      onChange={(e) => updateFilter('search', e.target.value)}
                      className='w-full pr-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent'
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Results Info */}
            <div className='glass rounded-2xl p-4 mb-6 text-center text-white'>
              <p className='text-lg font-medium'>
                נמצאו{' '}
                <span className='text-purple-300 font-bold'>
                  {filteredBusinesses.length}
                </span>{' '}
                עסקים
                {businesses.length !== filteredBusinesses.length && (
                  <span className='text-white/70'> מתוך {businesses.length} סה"כ</span>
                )}
              </p>
            </div>

            {/* Business Cards */}
            {filteredBusinesses.length > 0 ? (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                {filteredBusinesses.map((business, index) => {
                  const category = deriveKosherCategory(business.activity)
                  const categoryColor = getKosherCategoryBadgeColor(category)
                  return (
                    <div
                      key={index}
                      className='relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden'
                    >
                      {/* Business Name + Category */}
                      <div className='flex items-start justify-between gap-2 mb-4'>
                        <h3 className='text-xl font-bold text-gray-800 line-clamp-2'>
                          {business.name}
                        </h3>
                        <span className={`badge ${categoryColor}`}>{category}</span>
                      </div>

                      {/* Business Info */}
                      <div className='space-y-3'>
                        {/* Address */}
                        {business.address && (
                          <div className='flex items-start gap-3'>
                            <MapPin
                              size={18}
                              className='text-gray-500 mt-0.5 flex-shrink-0'
                            />
                            <div>
                              <p className='text-gray-700'>{business.address}</p>
                              {business.city && (
                                <p className='text-sm text-gray-500'>{business.city}</p>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Provider, Type and City badges row */}
                        <div className='flex flex-wrap gap-2 mt-1'>
                          {business.provider && (
                            <span className='inline-block px-2.5 py-1 rounded-full text-xs bg-gray-100 text-gray-800 border border-gray-200'>
                              כשרות: {business.provider}
                            </span>
                          )}
                          {business.type && (
                            <span className='inline-block px-2.5 py-1 rounded-full text-xs bg-gray-100 text-gray-800 border border-gray-200'>
                              {business.type}
                            </span>
                          )}
                          {business.city && (
                            <span className='inline-block px-2.5 py-1 rounded-full text-xs bg-gray-100 text-gray-800 border border-gray-200'>
                              {business.city}
                            </span>
                          )}
                        </div>

                        {/* Activity */}
                        {business.activity && (
                          <div className='flex items-start gap-3'>
                            <Utensils
                              size={18}
                              className='text-gray-500 mt-0.5 flex-shrink-0'
                            />
                            <div className='flex-1'>
                              {business.activity.split(',').map((activity, idx) => (
                                <span
                                  key={idx}
                                  className={`inline-block text-white text-xs px-3 py-1 rounded-full mr-1 mb-1 ${getActivityColor(
                                    activity.trim()
                                  )}`}
                                >
                                  {activity.trim()}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className='text-center py-16 bg-white/90 backdrop-blur-sm rounded-2xl'>
                <FileText size={64} className='mx-auto text-gray-400 mb-4' />
                <h3 className='text-2xl font-medium text-gray-800 mb-2'>
                  לא נמצאו תוצאות
                </h3>
                <p className='text-gray-600 mb-4'>נסה לשנות את קריטריוני החיפוש</p>
                <button
                  onClick={clearFilters}
                  className='bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors duration-200'
                >
                  נקה מסננים
                </button>
              </div>
            )}
          </>
        )}

        {businesses.length === 0 && !loading && !error && (
          <div className='text-center py-16 bg-white/90 backdrop-blur-sm rounded-2xl'>
            <FileText size={64} className='mx-auto text-gray-400 mb-4' />
            <h3 className='text-2xl font-medium text-gray-800 mb-2'>אין נתונים להצגה</h3>
            <p className='text-gray-600'>הקובץ לא נטען או ריק</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default KosherBusinessApp
