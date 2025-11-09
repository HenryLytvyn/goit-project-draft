import Link from 'next/link';
import css from './AuthNavigation.module.css';
import ProfileAndLogoutLinks from './ProfileAndLogoutLinks/ProfileAndLogoutLinks';

type NavProps = {
  variant?: 'header-main-page' | 'mobile-menu';
};

export default async function AuthNavigation({ variant }: NavProps) {
  const isAuthenticated = true;

  return (
    <>
      {!isAuthenticated && (
        <>
          <li className={css.loginItem}>
            <Link
              href="#"
              prefetch={false}
              className={`${css.loginLink} ${variant === 'header-main-page' ? css.loginLinkMainPage : ''}`}
            >
              Вхід
            </Link>
          </li>
          <li className={`${css.loginItem} ${css.loginItemRegister}`}>
            <Link
              href="#"
              prefetch={false}
              className={`${css.loginLink} ${css.loginLinkRegister} ${variant === 'header-main-page' ? css.loginLinkRegisterMainPage : ''} ${variant === 'mobile-menu' ? css.loginLinkRegisterMobileMenu : ''}`}
            >
              Реєстрація
            </Link>
          </li>
        </>
      )}

      {isAuthenticated && (
        <>
          <li className={css.publichStoryItem}>
            <Link className={css.publichStoryLink} href="#">
              Опублікувати історію
            </Link>
          </li>
          <li>
            <ProfileAndLogoutLinks />
          </li>
        </>
      )}
    </>
  );
}
