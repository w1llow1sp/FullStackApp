import { useState } from 'react';
import { CreateUserModal } from '../../../features/createUser/ui/CreateUserModal/CreateUserModal';

export const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Управление пользователями</h1>
            <button
              onClick={openModal}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              + Добавить пользователя
            </button>
          </div>
        </div>
      </header>

      <CreateUserModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}; 