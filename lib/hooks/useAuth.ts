import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import {
  login as loginApi,
  register as registerApi,
} from '@/lib/api/clientApi';
import { LoginRequest, RegisterRequest } from '@/types/auth';

export const useAuth = () => {
  const router = useRouter();
  const { setUser, setLoading } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Registration function
  const register = async (values: RegisterRequest) => {
    setIsSubmitting(true);
    setLoading(true);

    try {
      const user = await registerApi(values);
      setUser(user);

      router.push('/');
    } catch (error: unknown) {
      console.error('Registration error:', error);
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  // Login function
  const login = async (values: LoginRequest) => {
    setIsSubmitting(true);
    setLoading(true);

    try {
      const user = await loginApi(values);
      setUser(user);
      router.push('/');
    } catch (error: unknown) {
      console.error('Login error:', error);
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  return {
    register,
    login,
    isSubmitting,
  };
};
