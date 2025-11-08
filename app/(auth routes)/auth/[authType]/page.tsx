import { notFound } from 'next/navigation';
import AuthLayout from '@/components/AuthForms/AuthLayout/AuthLayout';
import RegistrationForm from '@/components/AuthForms/RegistrationForm/RegistrationForm';
import LoginForm from '@/components/AuthForms/LoginForm/LoginForm';

export async function generateMetadata({ params }: AuthPageProps) {
  const { authType } = params;

  const titles = {
    register: 'Реєстрація | Подорожники',
    login: 'Вхід | Подорожники',
  };

  const descriptions = {
    register: 'Зареєструйтеся та приєднайтесь до спільноти мандрівників',
    login: 'Увійдіть до спільноти подорожників України',
  };

  return {
    title: titles[authType as keyof typeof titles] || 'Подорожники',
    description: descriptions[authType as keyof typeof descriptions] || '',
  };
}

interface AuthPageProps {
  params: {
    authType: string;
  };
}

export default function AuthPage({ params }: AuthPageProps) {
  const { authType } = params;

  if (authType !== 'register' && authType !== 'login') {
    notFound();
  }

  return (
    <AuthLayout>
      {authType === 'register' ? <RegistrationForm /> : <LoginForm />}
    </AuthLayout>
  );
}
