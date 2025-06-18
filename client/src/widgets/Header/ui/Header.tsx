import { useState } from 'react';
import { CreateUserModal } from '../../../features/createUser/ui/CreateUserModal/CreateUserModal';

export const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 shadow-xl border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <span className="text-xl">👤</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white mb-1">User Manager</h1>
                <p className="text-blue-100 text-xs">Управление пользователями</p>
              </div>
            </div>
            <button
              onClick={openModal}
              className="group relative bg-white/20 hover:bg-white/30 text-white font-semibold py-2 px-4 rounded-lg backdrop-blur-sm border border-white/30 transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center space-x-2 text-sm"
            >
              <span className="text-base">+</span>
              <span>Добавить пользователя</span>
              <div className="absolute inset-0 bg-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </header>

      <CreateUserModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};
