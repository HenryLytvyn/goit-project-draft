'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { authConfirmGoogle } from '@/lib/api/clientApi';
import toast from 'react-hot-toast';

export default function GoogleCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');

    if (!code) {
      toast.error('Не знайдено коду авторизації');
      router.replace('/auth/login');
      return;
    }

    const confirmGoogleLogin = async () => {
      try {
        toast.loading('Входимо через Google...');
        const user = await authConfirmGoogle(code);

        if (user) {
          toast.dismiss();
          toast.success(`Вітаємо, ${user.name || 'мандрівнику'}!`);
          router.replace('/profile'); // 👈 редирект куди після входу
        } else {
          throw new Error('Користувача не знайдено');
        }
      } catch (error) {
        console.error('❌ Помилка при підтвердженні Google входу:', error);
        toast.dismiss();
        toast.error('Не вдалося увійти через Google');
        router.replace('/auth/login');
      }
    };

    confirmGoogleLogin();
  }, [searchParams, router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <p>Підтвердження входу через Google...</p>
    </div>
  );
}