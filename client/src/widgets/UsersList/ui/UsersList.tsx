import { useState } from 'react';
import { useUpdateUserMutation, useDeleteUserMutation } from '../../../entities/user/model/userApi';
import { Loader } from '../../../shared/ui/Loader/Loader';
import { Error } from '../../../shared/ui/Error/Error';
import { ConfirmDialog } from '../../../shared/ui/ConfirmDialog';
import { Notification } from '../../../shared/ui/Notification';
import { EditUserModal } from '../../../features/editUser';
import { UsersGrid } from '../../UsersGrid';
import type { User, UpdateUserInput } from '../../../entities/user/model/types';

interface UsersListProps {
  users: User[];
  isLoading: boolean;
  error: any;
  selectedUser: User | null;
  onUserSelect: (user: User | null) => void;
  onEditUser?: (user: User) => void;
  onDeleteUser?: (user: User) => void;
}

export const UsersList = ({ users, isLoading, error, selectedUser, onUserSelect, onEditUser, onDeleteUser }: UsersListProps) => {
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  // Уведомления
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
    isVisible: boolean;
  }>({
    message: '',
    type: 'info',
    isVisible: false,
  });

  const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setNotification({ message, type, isVisible: true });
  };

  const hideNotification = () => {
    setNotification(prev => ({ ...prev, isVisible: false }));
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsEditModalOpen(true);
  };

  const handleSaveUser = async (userData: UpdateUserInput) => {
    try {
      await updateUser(userData).unwrap();
      setIsEditModalOpen(false);
      setEditingUser(null);
      showNotification('Пользователь успешно обновлен', 'success');
    } catch (error) {
      console.error('Ошибка при обновлении пользователя:', error);
      showNotification('Ошибка при обновлении пользователя', 'error');
    }
  };

  const handleDeleteUser = (user: User) => {
    setDeletingUser(user);
    setIsConfirmDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!deletingUser) return;
    try {
      await deleteUser({ id: deletingUser.id }).unwrap();
      if (selectedUser?.id === deletingUser.id) {
        onUserSelect(null);
      }
      showNotification('Пользователь успешно удален', 'success');
    } catch (error) {
      console.error('Ошибка при удалении пользователя:', error);
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

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingUser(null);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Error message="Ошибка загрузки пользователей" />;
  }

  if (!users || users.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-gray-600">Пользователи не найдены</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <UsersGrid
        users={users}
        selectedUser={selectedUser}
        onUserSelect={onUserSelect}
        onEdit={onEditUser || handleEditUser}
        onDelete={onDeleteUser || handleDeleteUser}
        isDeleting={isDeleting}
      />

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