import { useState, useEffect } from 'react';
import { getCurrentUser, onAuthStateChange, signIn, signUp, signOut } from '../services/auth';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe;
    
    const initAuth = async () => {
      unsubscribe = onAuthStateChange((user) => {
        setUser(user);
        setLoading(false);
      });
      
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      setLoading(false);
    };
    
    initAuth();
    
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return { user, loading, signIn, signUp, signOut };
}