import { useState, useEffect, useCallback } from 'react';
import type { FilterOptions } from '../../../entities/user/model/types';

interface FilterUsersProps {
  onFilterChange: (filters: FilterOptions) => void;
}

export const FilterUsers = ({ onFilterChange }: FilterUsersProps) => {
  const [search, setSearch] = useState('');
  const [ageFilter, setAgeFilter] = useState<FilterOptions['ageFilter']>('all');
  const [marriageFilter, setMarriageFilter] = useState<FilterOptions['marriageFilter']>('all');
  const [isExpanded, setIsExpanded] = useState(false);

  // Debounce для поиска
  const debouncedSearch = useCallback(
    (() => {
      let timeoutId: number;
      return (value: string) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          setSearch(value);
        }, 300);
      };
    })(),
    []
  );

  // Обновляем фильтры при изменении
  useEffect(() => {
    onFilterChange({
      search,
      ageFilter,
      marriageFilter,
    });
  }, [search, ageFilter, marriageFilter, onFilterChange]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  const clearFilters = () => {
    setSearch('');
    setAgeFilter('all');
    setMarriageFilter('all');
    const searchInput = document.getElementById('search-input') as HTMLInputElement;
    if (searchInput) {
      searchInput.value = '';
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm">🔍</span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">Фильтры и поиск</h3>
            <p className="text-gray-500 text-xs">Найдите нужных пользователей</p>
          </div>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="group bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1.5 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center space-x-2 text-sm"
        >
          <span>{isExpanded ? 'Скрыть' : 'Показать'}</span>
          <span className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>
      </div>

      {/* Поиск всегда видимый */}
      <div className="mb-4">
        <label htmlFor="search-input" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
          <span className="mr-2">🔎</span>
          Поиск по имени
        </label>
        <div className="relative">
          <input
            id="search-input"
            type="text"
            placeholder="Введите имя пользователя..."
            onChange={handleSearchChange}
            className="w-full px-4 py-3 pl-12 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white/70 text-gray-800 placeholder-gray-400 transition-all duration-200 shadow-sm focus:shadow-lg outline-none text-base"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-400 text-base">👤</span>
          </div>
        </div>
      </div>

      {/* Раскрывающиеся фильтры */}
      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
        isExpanded ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="space-y-4 pt-3 border-t border-gray-200">
          {/* Фильтр по возрасту */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-3 border border-blue-100">
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
              <span className="mr-2">📊</span>
              Фильтр по возрасту
            </label>
            <div className="relative">
              <select
                value={ageFilter}
                onChange={(e) => setAgeFilter(e.target.value as FilterOptions['ageFilter'])}
                className="w-full px-4 py-3 pr-10 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white/70 text-gray-800 transition-all duration-200 shadow-sm focus:shadow-lg outline-none text-base appearance-none cursor-pointer"
              >
                <option value="all">Все возрасты</option>
                <option value="young">Молодые (18-30)</option>
                <option value="adult">Взрослые (31-50)</option>
                <option value="senior">Старшие (50+)</option>
              </select>
              {/* Кастомная стрелка */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>

          {/* Фильтр по семейному положению */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-3 border border-green-100">
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
              <span className="mr-2">💍</span>
              Семейное положение
            </label>
            <div className="relative">
              <select
                value={marriageFilter}
                onChange={(e) => setMarriageFilter(e.target.value as FilterOptions['marriageFilter'])}
                className="w-full px-4 py-3 pr-10 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white/70 text-gray-800 transition-all duration-200 shadow-sm focus:shadow-lg outline-none text-base appearance-none cursor-pointer"
              >
                <option value="all">Все</option>
                <option value="married">В браке</option>
                <option value="single">Не в браке</option>
              </select>
              {/* Кастомная стрелка */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>

          {/* Кнопка очистки фильтров */}
          <button
            onClick={clearFilters}
            className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white py-2 px-3 rounded-lg font-semibold hover:from-red-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2 text-sm mt-2"
          >
            <span>🗑️</span>
            <span>Очистить все фильтры</span>
          </button>
        </div>
      </div>
    </div>
  );
}; 