'use client';

// src/app/auth/[authType]/page.tsx
import { useParams } from 'next/navigation';
import RegistrationForm from '../../../components/RegistrationForm/RegistrationForm';
import LoginForm from '../../../components/LoginForm/LoginForm';

const AuthPage = () => {
  const { authType } = useParams();

  return (
    <div>
      {authType === 'register' && <RegistrationForm />}
      {authType === 'login' && <LoginForm />}
    </div>
  );
};

export default AuthPage;
