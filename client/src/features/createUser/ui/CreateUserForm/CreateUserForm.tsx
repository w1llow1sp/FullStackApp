import { useState } from 'react';
import { useCreateUserMutation } from '../../../../entities/user/model/userApi';
import type { CreateUserInput } from '../../../../entities/user/model/types';

export const CreateUserForm = () => {
  const [formData, setFormData] = useState<CreateUserInput>({
    name: '',
    age: 0,
    isMarried: false,
  });

  const [createUser, { isLoading }] = useCreateUserMutation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev: CreateUserInput) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || formData.age <= 0) {
      return;
    }

    try {
      await createUser(formData).unwrap();
      setFormData({ name: '', age: 0, isMarried: false });
    } catch (error) {
      console.error('Failed to create user:', error);
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Создать нового пользователя</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Имя
          </label>
          <input
            type="text"
            name="name"
            placeholder="Введите имя"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Возраст
          </label>
          <input
            type="number"
            name="age"
            placeholder="Введите возраст"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.age || ''}
            onChange={handleInputChange}
            min="1"
            required
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="isMarried"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            checked={formData.isMarried}
            onChange={handleInputChange}
          />
          <label className="ml-2 block text-sm text-gray-700">
            В браке
          </label>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading || !formData.name || formData.age <= 0}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Создание...
              </>
            ) : (
              'Создать пользователя'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
