import { useEffect } from 'react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error' | 'info';
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export const Notification = ({ 
  message, 
  type, 
  isVisible, 
  onClose, 
  duration = 3000 
}: NotificationProps) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-gradient-to-r from-green-500 to-green-600',
          icon: '✅',
          border: 'border-green-400',
          shadow: 'shadow-green-500/25'
        };
      case 'error':
        return {
          bg: 'bg-gradient-to-r from-red-500 to-red-600',
          icon: '❌',
          border: 'border-red-400',
          shadow: 'shadow-red-500/25'
        };
      case 'info':
        return {
          bg: 'bg-gradient-to-r from-blue-500 to-blue-600',
          icon: 'ℹ️',
          border: 'border-blue-400',
          shadow: 'shadow-blue-500/25'
        };
      default:
        return {
          bg: 'bg-gradient-to-r from-gray-500 to-gray-600',
          icon: '📢',
          border: 'border-gray-400',
          shadow: 'shadow-gray-500/25'
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div className={`${styles.bg} ${styles.border} ${styles.shadow} px-6 py-4 rounded-2xl shadow-2xl flex items-center space-x-4 backdrop-blur-sm border-2 max-w-sm`}>
        <div className="flex-shrink-0">
          <span className="text-2xl">{styles.icon}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white font-medium text-sm leading-relaxed">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
        >
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}; 