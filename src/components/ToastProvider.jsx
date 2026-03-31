import { Toaster } from 'react-hot-toast';

export default function ToastProvider({ children }) {
  return (
    <>
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1a1915',
            color: '#f0e8d5',
            border: '1px solid #2e2c24',
            borderRadius: '12px',
            padding: '12px 16px',
          },
          success: {
            iconTheme: {
              primary: '#c9a84c',
              secondary: '#1a1915',
            },
          },
          error: {
            iconTheme: {
              primary: '#c05252',
              secondary: '#1a1915',
            },
          },
        }}
      />
      {children}
    </>
  );
}