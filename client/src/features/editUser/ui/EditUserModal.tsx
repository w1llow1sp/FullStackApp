import { useState, useEffect, useRef } from 'react';
import type { User, UpdateUserInput } from '../../../entities/user/model/types';

interface EditUserModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (userData: UpdateUserInput) => void;
  isLoading?: boolean;
}

export const EditUserModal = ({ user, isOpen, onClose, onSave, isLoading = false }: EditUserModalProps) => {
  const [formData, setFormData] = useState<UpdateUserInput>({
    id: '',
    name: '',
    age: 0,
    isMarried: false,
  });
  const nameInputRef = useRef<HTMLInputElement>(null);

  // Обновляем форму при изменении пользователя
  useEffect(() => {
    if (user) {
      setFormData({
        id: user.id,
        name: user.name,
        age: user.age,
        isMarried: user.isMarried,
      });
    }
  }, [user]);

  // Автофокус на имя
  useEffect(() => {
    if (isOpen && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [isOpen]);

  // Клавиши Enter/Esc
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Enter') {
        const active = document.activeElement as HTMLElement;
        if (active && ['INPUT', 'SELECT'].includes(active.tagName)) {
          (document.getElementById('edit-user-form') as HTMLFormElement)?.requestSubmit();
        }
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen || !user) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      {/* Overlay с блюром и затемнением */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-lg transition-all duration-300" />
      <div className="relative animate-fade-in-up scale-95 opacity-0 animate-[fadeInUp_0.25s_ease-out_forwards] bg-white/70 backdrop-blur-2xl shadow-2xl max-w-md w-full border border-white/30 rounded-3xl overflow-hidden">
        {/* Заголовок */}
        <div className="flex justify-between items-center px-7 pt-7 pb-3 border-b border-gray-200/40">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-md">
              <span className="text-white text-2xl">✏️</span>
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-gray-800">Редактировать пользователя</h2>
              <p className="text-gray-500 text-sm mt-1">Обновите данные пользователя</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 ml-2"
            disabled={isLoading}
            tabIndex={0}
            aria-label="Закрыть"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form id="edit-user-form" onSubmit={handleSubmit} className="px-7 py-6 space-y-7">
          {/* Имя */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 flex items-center">
              <span className="mr-2">📝</span>
              Имя пользователя
            </label>
            <div className="relative">
              <input
                ref={nameInputRef}
                type="text"
                name="name"
                placeholder="Введите имя пользователя"
                className="w-full px-4 py-3 pl-10 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white/70 text-gray-800 placeholder-gray-400 transition-all duration-200 shadow-sm focus:shadow-lg outline-none"
                value={formData.name}
                onChange={handleInputChange}
                required
                disabled={isLoading}
                autoComplete="off"
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
                className="w-full px-4 py-3 pl-10 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white/70 text-gray-800 placeholder-gray-400 transition-all duration-200 shadow-sm focus:shadow-lg outline-none"
                value={formData.age || ''}
                onChange={handleInputChange}
                min="1"
                max="120"
                required
                disabled={isLoading}
                autoComplete="off"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-400">📊</span>
              </div>
            </div>
          </div>

          {/* Семейное положение */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 flex items-center">
              <span className="mr-2">💍</span>
              Семейное положение
            </label>
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 border border-green-200 flex items-center">
              <label className="flex items-center space-x-3 cursor-pointer select-none">
                <div className="relative">
                  <input
                    type="checkbox"
                    name="isMarried"
                    className="sr-only"
                    checked={formData.isMarried}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                  <div className={`w-7 h-7 rounded-lg border-2 transition-all duration-300 flex items-center justify-center shadow-sm ${
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
                <span className="text-gray-700 font-medium text-base">В браке</span>
              </label>
            </div>
          </div>

          {/* Разделитель */}
          <div className="border-t border-gray-200/60 pt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="flex items-center px-5 py-2.5 rounded-xl font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-200 shadow-sm"
              disabled={isLoading}
            >
              <span className="mr-2">✖️</span>Отмена
            </button>
            <button
              type="submit"
              className="flex items-center px-5 py-2.5 rounded-xl font-semibold bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                  Сохранение...
                </>
              ) : (
                <>
                  <span className="mr-2">💾</span>Сохранить изменения
                </>
              )}
            </button>
          </div>
        </form>
      </div>
      <style>{`
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(40px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}; 