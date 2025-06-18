import { SelectedUser } from '../../../entities/user/ui/SelectedUser/SelectedUser';
import type { User } from '../../../entities/user/model/types';

interface SelectedUserWidgetProps {
  selectedUser: User | null;
  onClearSelection: () => void;
  onEditUser?: (user: User) => void;
  onDeleteUser?: (user: User) => void;
}

export const SelectedUserWidget = ({ 
  selectedUser, 
  onClearSelection, 
  onEditUser, 
  onDeleteUser 
}: SelectedUserWidgetProps) => {
  if (!selectedUser) {
    return (
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-5">
        <div className="text-center py-6">
          <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-2xl">👤</span>
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">Выберите пользователя</h3>
          <p className="text-gray-500 text-sm">Нажмите на карточку пользователя для просмотра деталей</p>
        </div>
      </div>
    );
  }

  const handleEdit = (userId: string) => {
    if (onEditUser) {
      onEditUser(selectedUser);
    }
  };

  const handleDelete = (userId: string) => {
    if (onDeleteUser) {
      onDeleteUser(selectedUser);
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800 flex items-center">
          <span className="mr-2">👤</span>
          Детали пользователя
        </h3>
        <button
          onClick={onClearSelection}
          className="w-7 h-7 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
          title="Закрыть"
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <SelectedUser 
        userId={selectedUser.id} 
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}; 