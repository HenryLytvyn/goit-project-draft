'use client';

import { checkSession, getMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { useEffect, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const setUser = useAuthStore(state => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    state => state.clearIsAuthenticated
  );
  const setLoading = useAuthStore(state => state.setLoading);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      if (isInitialized) return;

      try {
        setLoading(true);
        const hasSession = await checkSession();

        if (hasSession) {
          const user = await getMe();

          if (user) {
            setUser(user);
          } else {
            console.warn('Session exists but no user data found');
            clearIsAuthenticated();
          }
        } else {
          clearIsAuthenticated();
        }
      } catch (error) {
        console.error('Auth initialization failed:', error);
        clearIsAuthenticated();
      } finally {
        setLoading(false);
        setIsInitialized(true);
      }
    };

    fetchSession();
  }, [clearIsAuthenticated, setUser, setLoading, isInitialized]);

  return <>{children}</>;
};

export default AuthProvider;
