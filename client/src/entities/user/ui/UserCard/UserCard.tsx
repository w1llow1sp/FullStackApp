import type { User } from '../../model/types';

interface UserCardProps {
  user: User;
  isSelected?: boolean;
  onSelect?: (user: User) => void;
  onEdit?: (user: User) => void;
  onDelete?: (user: User) => void;
  isDeleting?: boolean;
}

export const UserCard = ({
  user,
  isSelected = false,
  onSelect,
  onEdit,
  onDelete,
  isDeleting = false
}: UserCardProps) => {
  return (
    <div className={`group relative overflow-hidden rounded-xl transition-all duration-300 transform hover:scale-105 max-w-full w-full
      min-h-[340px] flex flex-col justify-between
      ${isSelected 
        ? 'bg-gradient-to-br from-blue-500 to-blue-600 shadow-xl shadow-blue-500/30 ring-2 ring-blue-300' 
        : 'bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl border border-white/20'
      }`}>
      
      {/* Градиентный фон для выбранной карточки */}
      {isSelected && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-500/20"></div>
      )}
      
      <div className="relative p-5 flex-1 flex flex-col justify-between">
        {/* Аватар пользователя */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
              isSelected 
                ? 'bg-white/20 text-white' 
                : 'bg-gradient-to-br from-blue-500 to-purple-600 text-white'
            }`}>
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className={`font-bold text-lg mb-1 truncate break-words whitespace-normal
                ${isSelected ? 'text-white' : 'text-gray-800'}`}
              >
                {user.name}
              </h3>
              <p className={`text-xs ${
                isSelected ? 'text-blue-100' : 'text-gray-500'
              }`}>
                ID: {user.id}
              </p>
            </div>
          </div>
          
          {/* Кнопки действий */}
          <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {onEdit && (
              <button
                onClick={() => onEdit(user)}
                className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 ${
                  isSelected 
                    ? 'bg-white/20 text-white hover:bg-white/30' 
                    : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                }`}
                title="Редактировать"
              >
                ✏️
              </button>
            )}

            {onDelete && (
              <button
                onClick={() => onDelete(user)}
                disabled={isDeleting}
                className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 disabled:opacity-50 ${
                  isSelected 
                    ? 'bg-white/20 text-white hover:bg-white/30' 
                    : 'bg-red-100 text-red-700 hover:bg-red-200'
                }`}
                title="Удалить"
              >
                {isDeleting ? '⏳' : '🗑️'}
              </button>
            )}
          </div>
        </div>

        {/* Информация о пользователе */}
        <div className="space-y-3 mb-4">
          <div className={`flex items-center justify-between p-3 rounded-lg ${
            isSelected 
              ? 'bg-white/10' 
              : 'bg-gray-50/50'
          }`}>
            <span className={`font-medium text-sm ${
              isSelected ? 'text-blue-100' : 'text-gray-600'
            }`}>
              Возраст
            </span>
            <span className={`font-bold text-lg ${
              isSelected ? 'text-white' : 'text-gray-800'
            }`}>
              {user.age} лет
            </span>
          </div>

          <div className={`flex items-center justify-between p-3 rounded-lg ${
            isSelected 
              ? 'bg-white/10' 
              : 'bg-gray-50/50'
          }`}>
            <span className={`font-medium text-sm ${
              isSelected ? 'text-blue-100' : 'text-gray-600'
            }`}>
              Семейное положение
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              user.isMarried 
                ? isSelected
                  ? 'bg-green-400/30 text-green-100'
                  : 'bg-green-100 text-green-800'
                : isSelected
                  ? 'bg-yellow-400/30 text-yellow-100'
                  : 'bg-yellow-100 text-yellow-800'
            }`}>
              {user.isMarried ? 'В браке' : 'Не в браке'}
            </span>
          </div>
        </div>

        {/* Кнопка выбора */}
        {onSelect && (
          <div className="mt-4 flex-shrink-0">
            <button
              onClick={() => onSelect(user)}
              className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 text-sm ${
                isSelected
                  ? 'bg-white/20 text-white hover:bg-white/30 shadow-lg'
                  : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-md hover:shadow-lg'
              }`}
            >
              {isSelected ? '✓ Выбран' : 'Выбрать пользователя'}
            </button>
          </div>
        )}
      </div>

      {/* Декоративные элементы */}
      <div className={`absolute top-0 right-0 w-16 h-16 rounded-full opacity-10 ${
        isSelected ? 'bg-white' : 'bg-blue-500'
      } transform translate-x-8 -translate-y-8`}></div>
    </div>
  );
};
