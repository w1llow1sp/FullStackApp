import { useGetUserByIdQuery } from '../../model/userApi';
import { Loader } from '../../../../shared/ui/Loader/Loader';
import { Error } from '../../../../shared/ui';

interface SelectedUserProps {
  userId: string;
  onEdit?: (userId: string) => void;
  onDelete?: (userId: string) => void;
}

export const SelectedUser = ({ userId, onEdit, onDelete }: SelectedUserProps) => {
  const { data: user, isLoading, error } = useGetUserByIdQuery(userId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-4">
        <div className="text-center">
          <Loader />
          <p className="text-gray-500 mt-3 text-sm">Загрузка пользователя...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return <Error message="Ошибка загрузки пользователя" />;
  }

  if (!user) {
    return (
      <div className="text-center p-4">
        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
          <span className="text-xl">❓</span>
        </div>
        <p className="text-gray-500 text-sm">Пользователь не найден</p>
      </div>
    );
  }

  const handleEdit = () => {
    if (onEdit) {
      onEdit(user.id);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(user.id);
    }
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Аватар и основная информация */}
      <div className="text-center">
        <div className="relative inline-block">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
            <span className="text-2xl font-bold text-white">
              {user.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-3 border-white flex items-center justify-center">
            <span className="text-white text-xs">✓</span>
          </div>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-1">{user.name}</h3>
        <p className="text-gray-500 text-xs">ID: {user.id}</p>
      </div>

      {/* Информационные карточки */}
      <div className="space-y-3">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-3 border border-blue-100">
          <h4 className="font-semibold text-gray-800 mb-2 flex items-center text-sm">
            <span className="mr-2">📊</span>
            Основная информация
          </h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-white/50 rounded-lg">
              <span className="text-gray-600 font-medium text-sm">Возраст</span>
              <span className="font-bold text-gray-800">{user.age} лет</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-white/50 rounded-lg">
              <span className="text-gray-600 font-medium text-sm">Семейное положение</span>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                user.isMarried 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {user.isMarried ? 'В браке' : 'Не в браке'}
              </span>
            </div>
          </div>
        </div>

        {/* Статистика */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-3 border border-green-100">
          <h4 className="font-semibold text-gray-800 mb-2 flex items-center text-sm">
            <span className="mr-2">📈</span>
            Статистика
          </h4>
          <div className="grid grid-cols-2 gap-2">
            <div className="text-center p-2 bg-white/50 rounded-lg">
              <div className="text-lg font-bold text-blue-600">{user.age}</div>
              <div className="text-xs text-gray-500">Возраст</div>
            </div>
            <div className="text-center p-2 bg-white/50 rounded-lg">
              <div className="text-lg font-bold text-green-600">
                {user.isMarried ? 'Да' : 'Нет'}
              </div>
              <div className="text-xs text-gray-500">В браке</div>
            </div>
          </div>
        </div>

        {/* Действия */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-3 border border-purple-100">
          <h4 className="font-semibold text-gray-800 mb-2 flex items-center text-sm">
            <span className="mr-2">⚡</span>
            Быстрые действия
          </h4>
          <div className="space-y-2">
            <button
              onClick={handleEdit}
              className="w-full py-2 px-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 text-sm"
            >
              ✏️ Редактировать
            </button>
            <button
              onClick={handleDelete}
              className="w-full py-2 px-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg font-medium hover:from-red-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 text-sm"
            >
              🗑️ Удалить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
