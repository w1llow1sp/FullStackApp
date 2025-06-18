import type { User, FilterOptions } from '../../entities/user/model/types';

export const filterUsers = (users: User[], filters: FilterOptions): User[] => {
  return users.filter(user => {
    // Поиск по имени
    if (filters.search && !user.name.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }

    // Фильтр по возрасту
    if (filters.ageFilter !== 'all') {
      switch (filters.ageFilter) {
        case 'young': // 18-30
          if (user.age < 18 || user.age > 30) return false;
          break;
        case 'adult': // 31-50
          if (user.age < 31 || user.age > 50) return false;
          break;
        case 'senior': // 51+
          if (user.age < 51) return false;
          break;
      }
    }

    // Фильтр по семейному положению
    if (filters.marriageFilter !== 'all') {
      switch (filters.marriageFilter) {
        case 'married':
          if (!user.isMarried) return false;
          break;
        case 'single':
          if (user.isMarried) return false;
          break;
      }
    }

    return true;
  });
}; 