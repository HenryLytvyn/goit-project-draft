import Link from 'next/link';
import css from './AuthNavigation.module.css';

type NavProps = {
  variant?: 'header-main-page';
};

export default async function AuthNavigation({ variant }: NavProps) {
  const isAuthenticated = false;

  return (
    <>
      {!isAuthenticated && (
        <>
          <li
            className={css.loginItem}
            // className={`${css.authNavItem} ${className}`}
            // {...props}
          >
            <Link
              href="#"
              prefetch={false}
              className={`${css.loginLink} ${variant === 'header-main-page' ? css.loginLinkMainPage : ''}`}
            >
              Вхід
            </Link>
          </li>
          <li
            className={`${css.loginItem} ${css.loginItemRegister}`}
            // className={`${css.authNavItem} ${className}`}
            // {...props}
          >
            <Link
              href="#"
              prefetch={false}
              className={`${css.loginLink} ${css.loginLinkRegister} ${variant === 'header-main-page' ? css.loginLinkRegisterMainPage : ''}`}
            >
              Реєстрація
            </Link>
          </li>
        </>
      )}
    </>
  );
}
