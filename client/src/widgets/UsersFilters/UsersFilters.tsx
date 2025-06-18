import { useState, useCallback } from 'react';
import { FilterUsers } from '../../features/filterUsers';
import { UsersStats } from '../../shared/ui/UsersStats';
import { filterUsers } from '../../shared/lib/filterUsers';
import type { User, FilterOptions } from '../../entities/user/model/types';

interface UsersFiltersProps {
  users: User[];
  onFilterChange: (filteredUsers: User[]) => void;
}

export const UsersFilters = ({ users, onFilterChange }: UsersFiltersProps) => {
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    ageFilter: 'all',
    marriageFilter: 'all',
  });

  const handleFilterChange = useCallback((newFilters: FilterOptions) => {
    setFilters(newFilters);
    const filteredUsers = filterUsers(users, newFilters);
    onFilterChange(filteredUsers);
  }, [users, onFilterChange]);

  return (
    <>
      <FilterUsers onFilterChange={handleFilterChange} />
      
      {users && users.length > 0 && (
        <UsersStats 
          users={users} 
          filteredCount={filterUsers(users, filters).length} 
        />
      )}
    </>
  );
}; 