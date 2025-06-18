import { useState } from 'react';
import { Header } from '../../../widgets/Header/ui/Header';
import { UsersList } from '../../../widgets/UsersList/ui/UsersList';
import { SelectedUserWidget } from '../../../widgets/SelectedUserWidget/ui/SelectedUserWidget';
import type { User } from '../../../entities/user/model/types';

export const UsersPage = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleUserSelect = (user: User | null) => {
    setSelectedUser(user);
  };

  const handleClearSelection = () => {
    setSelectedUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Список пользователей */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">Список пользователей</h2>
              <UsersList 
                selectedUser={selectedUser} 
                onUserSelect={handleUserSelect} 
              />
            </div>
            
            {/* Выбранный пользователь */}
            <div className="lg:col-span-1">
              <SelectedUserWidget 
                selectedUser={selectedUser} 
                onClearSelection={handleClearSelection} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 