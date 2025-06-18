import { useState, useEffect } from 'react';
import { useCreateUserMutation } from '../../../../entities/user/model/userApi';
import type { CreateUserInput } from '../../../../entities/user/model/types';

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateUserModal = ({ isOpen, onClose }: CreateUserModalProps) => {
  const [formData, setFormData] = useState<CreateUserInput>({
    name: '',
    age: 0,
    isMarried: false,
  });

  const [createUser, { isLoading }] = useCreateUserMutation();

  // Обработка клавиши Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Блокируем скролл на body
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

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
      onClose();
    } catch (error) {
      console.error('Failed to create user:', error);
    }
  };

  const handleClose = () => {
    setFormData({ name: '', age: 0, isMarried: false });
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 modal-backdrop flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="modal-content bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl max-w-md w-full border border-white/20">
        {/* Заголовок */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white text-lg">👤</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Создать пользователя</h2>
              <p className="text-gray-500 text-sm">Заполните данные нового пользователя</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Имя */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 flex items-center">
              <span className="mr-2">📝</span>
              Имя пользователя
            </label>
            <div className="relative">
              <input
                type="text"
                name="name"
                placeholder="Введите имя пользователя"
                className="input-modern"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-400">👤</span>
              </div>
            </div>
          </div>

          {/* Возраст */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 flex items-center">
              <span className="mr-2">🎂</span>
              Возраст
            </label>
            <div className="relative">
              <input
                type="number"
                name="age"
                placeholder="Введите возраст"
                className="input-modern"
                value={formData.age || ''}
                onChange={handleInputChange}
                min="1"
                max="120"
                required
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-400">📊</span>
              </div>
            </div>
          </div>

          {/* Семейное положение */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700 flex items-center">
              <span className="mr-2">💍</span>
              Семейное положение
            </label>
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 border border-green-200">
              <label className="flex items-center space-x-3 cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    name="isMarried"
                    className="sr-only"
                    checked={formData.isMarried}
                    onChange={handleInputChange}
                  />
                  <div className={`w-6 h-6 rounded-lg border-2 transition-all duration-300 flex items-center justify-center ${
                    formData.isMarried 
                      ? 'bg-green-500 border-green-500' 
                      : 'bg-white border-gray-300'
                  }`}>
                    {formData.isMarried && (
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-gray-700 font-medium">В браке</span>
              </label>
            </div>
          </div>

          {/* Кнопки */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200/50">
            <button
              type="button"
              onClick={handleClose}
              className="btn-secondary"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              disabled={isLoading || !formData.name || formData.age <= 0}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Создание...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <span>✓</span>
                  <span>Создать пользователя</span>
                </div>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 