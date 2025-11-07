import Link from 'next/link';
import css from './Navigation.module.css';
import AuthNavigation from '../AuthNavigation/AuthNavigation';

// export default function Navigation() {
//   return (
//     <nav className={css.nav}>
//       <ul className={css.navList}>
//         <li className={css.navItem}>
//           <Link className={css.navLink} href="#">
//             Головна
//           </Link>
//         </li>
//         <li className={css.navItem}>
//           <Link className={css.navLink} href="#">
//             Історії
//           </Link>
//         </li>
//         <li className={css.navItem}>
//           <Link className={css.navLink} href="#">
//             Мандрівники
//           </Link>
//         </li>
//       </ul>
//     </nav>
//   );
// }

export default function Navigation({
  className = '',
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav className={`${css.nav} ${className}`} {...props}>
      <ul className={css.navList}>
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

        <AuthNavigation
        // className={css.authNavItem}
        />
      </ul>
    </nav>
  );
}
