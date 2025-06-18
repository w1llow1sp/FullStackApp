import { SelectedUser } from '../../../entities/user/ui/SelectedUser/SelectedUser';
import type { User } from '../../../entities/user/model/types';

interface SelectedUserWidgetProps {
  selectedUser: User | null;
  onClearSelection: () => void;
}

export const SelectedUserWidget = ({ selectedUser, onClearSelection }: SelectedUserWidgetProps) => {
  if (!selectedUser) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Выбранный пользователь</h3>
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <p className="text-gray-500">Выберите пользователя из списка</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">Детали пользователя</h3>
        <button
          onClick={onClearSelection}
          className="text-gray-400 hover:text-gray-600 focus:outline-none p-1"
          title="Закрыть"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <SelectedUser userId={selectedUser.id} />
    </div>
  );
}; 