import { useGetUserByIdQuery } from '../../api/userApi';
import { Loader } from '../../../../shared/ui/Loader/Loader';
import { Error } from '../../../../shared/ui/Error/Error';

interface SelectedUserProps {
  userId: string;
}

export const SelectedUser = ({ userId }: SelectedUserProps) => {
  const { data: user, isLoading, error } = useGetUserByIdQuery(userId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-4">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <Error message="Ошибка загрузки пользователя" />;
  }

  if (!user) {
    return (
      <p className="text-gray-500 text-center">Пользователь не найден</p>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl font-bold text-blue-600">
            {user.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <h3 className="text-xl font-bold text-gray-800">{user.name}</h3>
        <p className="text-gray-600">ID: {user.id}</p>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-800 mb-3">Дополнительная информация</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Возраст:</span>
            <span className="font-medium">{user.age} лет</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Семейное положение:</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              user.isMarried 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {user.isMarried ? 'В браке' : 'Не в браке'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}; 