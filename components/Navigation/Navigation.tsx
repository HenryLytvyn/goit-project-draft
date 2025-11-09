// import Link from 'next/link';
// import css from './Navigation.module.css';
// import AuthNavigation from '../AuthNavigation/AuthNavigation';

// type NavProps = {
//   variant?: 'header' | 'header-main-page' | 'footer' | 'mobile-menu';
// };

// export default function Navigation({ variant }: NavProps) {
//   return (
//     <nav
//       className={`${css.nav} ${variant === 'footer' ? css.navFooter : ''} ${variant === 'header' ? css.navHeader : ''} ${variant === 'header-main-page' ? css.navHeader : ''}`}
//     >
//       <ul
//         className={`${css.navList} ${variant === 'footer' ? css.navListFooter : ''}`}
//       >
//         <li
//           className={`${css.navItem} ${variant === 'header-main-page' ? css.navItemHeaderMain : ''}`}
//         >
//           <Link
//             className={`${css.navLink} ${variant === 'header-main-page' ? css.navLinkHeaderMain : ''}`}
//             href="#"
//           >
//             Головна
//           </Link>
//         </li>
//         <li
//           className={`${css.navItem} ${variant === 'header-main-page' ? css.navItemHeaderMain : ''}`}
//         >
//           <Link
//             className={`${css.navLink} ${variant === 'header-main-page' ? css.navLinkHeaderMain : ''}`}
//             href="#"
//           >
//             Історії
//           </Link>
//         </li>
//         <li
//           className={`${css.navItem} ${variant === 'header-main-page' ? css.navItemHeaderMain : ''}`}
//         >
//           <Link
//             className={`${css.navLink} ${variant === 'header-main-page' ? css.navLinkHeaderMain : ''}`}
//             href="#"
//           >
//             Мандрівники
//           </Link>
//         </li>

//         {/* {variant === 'footer' || <AuthNavigation />} */}

//         {variant === 'header-main-page' && (
//           <AuthNavigation variant="header-main-page" />
//         )}

//         {variant === 'header' && <AuthNavigation />}

//         {variant === 'mobile-menu' && <AuthNavigation variant="mobile-menu" />}
//       </ul>
//     </nav>
//   );
// }

import Link from 'next/link';
import css from './Navigation.module.css';
import AuthNavigation from '../AuthNavigation/AuthNavigation';

type NavProps = {
  variant?: 'header' | 'header-main-page' | 'footer' | 'mobile-menu';
};

const navItems = [
  { href: '#', label: 'Головна' },
  { href: '#', label: 'Історії' },
  { href: '#', label: 'Мандрівники' },
];

export default function Navigation({ variant }: NavProps) {
  function getNavClass() {
    switch (variant) {
      case 'footer':
        return css.navFooter;
      // case 'header':
      case 'header-main-page':
        return css.navHeader;
      default:
        return '';
    }
  }

  function getNavListClass() {
    return variant === 'footer' ? css.navListFooter : '';
  }
  function getNavItemClass() {
    return variant === 'header-main-page' ? css.navItemHeaderMain : '';
  }
  function getNavLinkClass() {
    return variant === 'header-main-page' ? css.navLinkHeaderMain : '';
  }
  return (
    <nav className={`${css.nav} ${getNavClass()}`}>
      <ul className={`${css.navList} ${getNavListClass()}`}>
        {navItems.map(({ href, label }) => (
          <li key={label} className={`${css.navItem} ${getNavItemClass()}`}>
            <Link href={href} className={`${css.navLink} ${getNavLinkClass()}`}>
              {label}
            </Link>
          </li>
        ))}

        {variant === 'header-main-page' && (
          <AuthNavigation variant="header-main-page" />
        )}
        {variant === 'header' && <AuthNavigation />}
        {variant === 'mobile-menu' && <AuthNavigation variant="mobile-menu" />}
      </ul>
    </nav>
  );
}
