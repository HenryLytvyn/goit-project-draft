'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './AuthLayout.module.css';
import Image from 'next/image';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const pathname = usePathname();

  const isRegister = pathname === '/auth/register';
  const isLogin = pathname === '/auth/login';

  return (
    <div className={styles.authPage}>
      <div className={styles.logoContainer}>
        <Link className={styles.logoLink} href="/">
          <Image
            src="/icons/logo-icon.svg"
            alt="Логотип компанії"
            width={22.4}
            height={22.4}
          />
          <span className={styles.logoText}>Подорожники</span>
        </Link>
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.formCard}>
          <div className={styles.tabs}>
            <Link
              href="/auth/register"
              className={`${styles.tab} ${isRegister ? styles.active : ''}`}
            >
              Реєстрація
            </Link>
            <Link
              href="/auth/login"
              className={`${styles.tab} ${isLogin ? styles.active : ''}`}
            >
              Вхід
            </Link>
          </div>

          <div className={styles.content}>{children}</div>

          {/* Footer */}
          <div className={styles.footer}>
            <p>© 2025 Подорожники</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
