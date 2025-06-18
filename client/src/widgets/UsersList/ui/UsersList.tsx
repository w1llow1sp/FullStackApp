import { useGetUsersQuery } from '../../../entities/user/api/userApi';
import { UserCard } from '../../../entities/user/ui/UserCard/UserCard';
import { Loader } from '../../../shared/ui/Loader/Loader';
import { Error } from '../../../shared/ui/Error/Error';
import type { User } from '../../../entities/user/model/types';

interface UsersListProps {
  selectedUser: User | null;
  onUserSelect: (user: User | null) => void;
}

export const UsersList = ({ selectedUser, onUserSelect }: UsersListProps) => {
  const { data: users, isLoading, error } = useGetUsersQuery();

  const handleUserSelect = (user: User) => {
    onUserSelect(selectedUser?.id === user.id ? null : user);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Error message="Ошибка загрузки пользователей" />;
  }

  if (!users || users.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-lg text-gray-600">Пользователи не найдены</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {users.map((user) => (
        <UserCard 
          key={user.id} 
          user={user} 
          isSelected={selectedUser?.id === user.id}
          onSelect={handleUserSelect}
        />
      ))}
    </div>
  );
}; 