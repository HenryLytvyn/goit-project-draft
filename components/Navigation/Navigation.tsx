import Link from 'next/link';
import css from './Navigation.module.css';
import AuthNavigation from '../AuthNavigation/AuthNavigation';

type NavProps = {
  variant?: 'header' | 'footer' | 'mobile-menu';
};

export default function Navigation({ variant }: NavProps) {
  return (
    <nav
      className={`${css.nav} ${variant === 'footer' ? css.navFooter : ''} ${variant === 'header' ? css.navHeader : ''}`}
    >
      <ul
        className={`${css.navList} ${variant === 'footer' ? css.navListFooter : ''}`}
      >
        <li className={css.navItem}>
          <Link className={css.navLink} href="#">
            Головна
          </Link>
        </li>
        <li className={css.navItem}>
          <Link className={css.navLink} href="#">
            Історії
          </Link>
        </li>
        <li className={css.navItem}>
          <Link className={css.navLink} href="#">
            Мандрівники
          </Link>
        </li>

        {variant === 'footer' || (
          <AuthNavigation
          // className={css.authNavItem}
          />
        )}
      </ul>
    </nav>
  );
}
