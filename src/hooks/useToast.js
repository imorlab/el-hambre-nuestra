import toast from 'react-hot-toast';

export function useToast() {
  const showSuccess = (message) => {
    toast.success(message);
  };

  const showError = (message) => {
    toast.error(message);
  };

  const showWarning = (message) => {
    toast(message, {
      icon: '⚠️',
      style: {
        background: '#1a1915',
        color: '#f0e8d5',
        border: '1px solid #2e2c24',
      },
    });
  };

  const showInfo = (message) => {
    toast(message, {
      icon: 'ℹ️',
      style: {
        background: '#1a1915',
        color: '#f0e8d5',
        border: '1px solid #2e2c24',
      },
    });
  };

  return { showSuccess, showError, showWarning, showInfo };
}