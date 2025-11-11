import { ReactNode } from 'react';

interface AuthLayoutWrapperProps {
  children: ReactNode;
}

export default function AuthLayoutWrapper({
  children,
}: AuthLayoutWrapperProps) {
  return <>{children}</>;
}
