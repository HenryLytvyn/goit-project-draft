'use client';

// import { checkSession, getMe } from '@/lib/api/clientApi';
// import { useAuthStore } from '@/lib/store/authStore';
// import { useEffect } from 'react';

type Props = {
  children: React.ReactNode;
};

export default function AuthProvider({ children }: Props) {
  // const setUser = useAuthStore(state => state.setUser);
  // const clearIsAuthenticated = useAuthStore(
  //   state => state.clearIsAuthenticated
  // );

  // useEffect(() => {
  //   async function fetchUser() {
  //     try {
  //       await checkSession();
  //       const user = await getMe();
  //       setUser(user);
  //     } catch {
  //       clearIsAuthenticated();
  //       console.log('ERROR!!!!!!');
  //     }
  //   }
  //   fetchUser();
  // }, [setUser, clearIsAuthenticated]);

  return children;
}
