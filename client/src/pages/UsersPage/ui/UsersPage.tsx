import { useState, useCallback, useEffect } from 'react';
import { Header } from '../../../widgets/Header/ui/Header';
import { UsersList } from '../../../widgets/UsersList/ui/UsersList';
import { SelectedUserWidget } from '../../../widgets/SelectedUserWidget/ui/SelectedUserWidget';
import { UsersFilters } from '../../../widgets/UsersFilters';
import { useGetUsersQuery, useUpdateUserMutation, useDeleteUserMutation } from '../../../entities/user/model/userApi';
import { EditUserModal } from '../../../features/editUser';
import { ConfirmDialog } from '../../../shared/ui/ConfirmDialog';
import { Notification } from '../../../shared/ui/Notification';
import type { User, UpdateUserInput } from '../../../entities/user/model/types';

export const UsersPage = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const { data: users = [], isLoading, error } = useGetUsersQuery();

  // Модалки и уведомления
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
    isVisible: boolean;
  }>({
    message: '',
    type: 'info',
    isVisible: false,
  });

  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setNotification({ message, type, isVisible: true });
  };
  const hideNotification = () => {
    setNotification(prev => ({ ...prev, isVisible: false }));
  };

  const handleUserSelect = (user: User | null) => {
    setSelectedUser(user);
  };

  const handleClearSelection = () => {
    setSelectedUser(null);
  };

  // Открыть модалку редактирования
  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsEditModalOpen(true);
  };
  // Сохранить изменения пользователя
  const handleSaveUser = async (userData: UpdateUserInput) => {
    try {
      await updateUser(userData).unwrap();
      setIsEditModalOpen(false);
      setEditingUser(null);
      showNotification('Пользователь успешно обновлен', 'success');
    } catch (error) {
      showNotification('Ошибка при обновлении пользователя', 'error');
    }
  };
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingUser(null);
  };

  // Открыть модалку удаления
  const handleDeleteUser = (user: User) => {
    setDeletingUser(user);
    setIsConfirmDialogOpen(true);
  };
  // Подтвердить удаление
  const confirmDelete = async () => {
    if (!deletingUser) return;
    try {
      await deleteUser({ id: deletingUser.id }).unwrap();
      if (selectedUser?.id === deletingUser.id) {
        setSelectedUser(null);
      }
      showNotification('Пользователь успешно удален', 'success');
    } catch (error) {
      showNotification('Ошибка при удалении пользователя', 'error');
    } finally {
      setIsConfirmDialogOpen(false);
      setDeletingUser(null);
    }
  };
  const cancelDelete = () => {
    setIsConfirmDialogOpen(false);
    setDeletingUser(null);
  };

  // Мемоизированная функция фильтрации
  const handleFilterChange = useCallback((filtered: User[]) => {
    setFilteredUsers(filtered);
  }, []);

  // Инициализация filteredUsers при загрузке users
  useEffect(() => {
    if (users.length > 0) {
      setFilteredUsers(users);
    }
  }, [users]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header />
      <div className="container mx-auto px-4 py-6">
        {/* Заголовок страницы */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
            Управление пользователями
          </h1>
          <p className="text-gray-600">
            Создавайте, редактируйте и управляйте пользователями вашей системы
          </p>
        </div>

        {/* Мобильная версия: фильтры сверху */}
        <div className="lg:hidden mb-6">
          <UsersFilters users={users} onFilterChange={handleFilterChange} />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* Левая колонка: фильтры и статистика (только на десктопе) */}
          <div className="xl:col-span-3 lg:col-span-4 hidden lg:block">
            <div className="sticky top-6 space-y-4">
              <UsersFilters users={users} onFilterChange={handleFilterChange} />
            </div>
          </div>

          {/* Центр: список пользователей */}
          <div className="xl:col-span-6 lg:col-span-5 col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-5 max-w-3xl mx-auto overflow-y-auto max-h-[80vh]">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                <span className="mr-2">👥</span>
                Список пользователей
              </h2>
              <UsersList 
                selectedUser={selectedUser} 
                onUserSelect={handleUserSelect} 
                users={filteredUsers.length > 0 ? filteredUsers : users}
                isLoading={isLoading}
                error={error}
                onEditUser={handleEditUser}
                onDeleteUser={handleDeleteUser}
              />
            </div>
          </div>

          {/* Правая колонка: выбранный пользователь */}
          <div className="xl:col-span-3 lg:col-span-3">
            <div className="sticky top-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-5">
                <SelectedUserWidget 
                  selectedUser={selectedUser} 
                  onClearSelection={handleClearSelection}
                  onEditUser={handleEditUser}
                  onDeleteUser={handleDeleteUser}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Мобильная версия: выбранный пользователь снизу */}
        {selectedUser && (
          <div className="lg:hidden mt-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-5">
              <SelectedUserWidget 
                selectedUser={selectedUser} 
                onClearSelection={handleClearSelection}
                onEditUser={handleEditUser}
                onDeleteUser={handleDeleteUser}
              />
            </div>
          </div>
        )}
      </div>

      {/* Модалки и уведомления */}
      <EditUserModal
        user={editingUser}
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        onSave={handleSaveUser}
        isLoading={isUpdating}
      />
      <ConfirmDialog
        isOpen={isConfirmDialogOpen}
        title="Подтверждение удаления"
        message={`Вы уверены, что хотите удалить пользователя "${deletingUser?.name}"? Это действие нельзя отменить.`}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        confirmText="Удалить"
        isLoading={isDeleting}
      />
      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={hideNotification}
      />
    </div>
  );
}; 