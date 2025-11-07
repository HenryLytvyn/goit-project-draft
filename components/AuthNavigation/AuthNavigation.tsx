import Link from 'next/link';
import css from './AuthNavigation.module.css';

export default async function AuthNavigation() {
  // {
  // className = '',
  // ...props
  // }: React.HTMLAttributes<HTMLElement>
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
            <Link href="#" prefetch={false} className={css.loginLink}>
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
              className={`${css.loginLink} ${css.loginLinkRegister}`}
            >
              Реєстрація
            </Link>
          </li>
        </>
      )}
    </>
  );
}
