import type { User } from '../../model/types';

interface UserCardProps {
  user: User;
  isSelected?: boolean;
  onSelect?: (user: User) => void;
}

export const UserCard = ({ user, isSelected = false, onSelect }: UserCardProps) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 border-2 transition-all cursor-pointer ${
      isSelected 
        ? 'border-blue-500 bg-blue-50' 
        : 'border-gray-200 hover:border-gray-300 hover:shadow-lg'
    }`}>
      <h2 className="text-xl font-bold text-gray-800 mb-2">{user.name}</h2>
      <p className="text-gray-600 mb-2">Возраст: {user.age}</p>
      <p className="text-gray-600 mb-4">
        В браке: 
        <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
          user.isMarried 
            ? 'bg-green-100 text-green-800' 
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {user.isMarried ? 'Да' : 'Нет'}
        </span>
      </p>
      
      {onSelect && (
        <button
          onClick={() => onSelect(user)}
          className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
            isSelected
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {isSelected ? 'Выбран' : 'Выбрать'}
        </button>
      )}
    </div>
  );
}; 