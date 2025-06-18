import { useRef, useEffect } from 'react';
import { UserCard } from '../../entities/user/ui/UserCard/UserCard';
import type { User } from '../../entities/user/model/types';

interface UsersGridProps {
  users: User[];
  selectedUser: User | null;
  onUserSelect: (user: User | null) => void;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  isDeleting: boolean;
}

export const UsersGrid = ({ 
  users, 
  selectedUser, 
  onUserSelect, 
  onEdit, 
  onDelete, 
  isDeleting 
}: UsersGridProps) => {
  const gridRef = useRef<HTMLDivElement>(null);

  // Плавный скролл к выбранному пользователю
  useEffect(() => {
    if (selectedUser && gridRef.current) {
      const selectedElement = gridRef.current.querySelector(`[data-user-id="${selectedUser.id}"]`);
      if (selectedElement) {
        selectedElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'nearest'
        });
      }
    }
  }, [selectedUser]);

  const handleUserSelect = (user: User) => {
    onUserSelect(selectedUser?.id === user.id ? null : user);
  };

  if (users.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-gray-600">По вашему запросу ничего не найдено</p>
      </div>
    );
  }

  return (
    <div 
      ref={gridRef}
      className="grid gap-4 grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2"
      style={{ scrollBehavior: 'smooth' }}
    >
      {users.map((user) => (
        <div key={user.id} data-user-id={user.id}>
          <UserCard 
            user={user} 
            isSelected={selectedUser?.id === user.id}
            onSelect={handleUserSelect}
            onEdit={onEdit}
            onDelete={onDelete}
            isDeleting={isDeleting}
          />
        </div>
      ))}
    </div>
  );
}; 