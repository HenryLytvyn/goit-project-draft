import Link from 'next/link';
import css from './Navigation.module.css';
import AuthNavigation from '../AuthNavigation/AuthNavigation';

type NavProps = {
  variant?: 'header' | 'header-main-page' | 'footer' | 'mobile-menu';
};

export default function Navigation({ variant }: NavProps) {
  return (
    <nav
      className={`${css.nav} ${variant === 'footer' ? css.navFooter : ''} ${variant === 'header' ? css.navHeader : ''} ${variant === 'header-main-page' ? css.navHeader : ''}`}
    >
      <ul
        className={`${css.navList} ${variant === 'footer' ? css.navListFooter : ''}`}
      >
        <li
          className={`${css.navItem} ${variant === 'header-main-page' ? css.navItemHeaderMain : ''}`}
        >
          <Link
            className={`${css.navLink} ${variant === 'header-main-page' ? css.navLinkHeaderMain : ''}`}
            href="#"
          >
            Головна
          </Link>
        </li>
        <li
          className={`${css.navItem} ${variant === 'header-main-page' ? css.navItemHeaderMain : ''}`}
        >
          <Link
            className={`${css.navLink} ${variant === 'header-main-page' ? css.navLinkHeaderMain : ''}`}
            href="#"
          >
            Історії
          </Link>
        </li>
        <li
          className={`${css.navItem} ${variant === 'header-main-page' ? css.navItemHeaderMain : ''}`}
        >
          <Link
            className={`${css.navLink} ${variant === 'header-main-page' ? css.navLinkHeaderMain : ''}`}
            href="#"
          >
            Мандрівники
          </Link>
        </li>

        {variant === 'footer' || <AuthNavigation />}
      </ul>
    </nav>
  );
}
