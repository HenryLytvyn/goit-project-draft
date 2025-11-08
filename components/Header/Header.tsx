// Components/Header/Header.tsx

// import { useState } from 'react';
// import Logo from '../Logo/Logo';
// import Navigation from '../Navigation/Navigation';
// import css from './Header.module.css';
// import MobileMenuBtn from '../MobileMenuBtn/MobileMenuBtn';

// export default function Header() {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   function handleMobileMenu() {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   }

//   return (
//     <header className={css.header}>
//       <div className={`container ${css.headerContainer}`}>
//         <Logo variant="header-main-page" />
//         <Navigation variant="header-main-page" />
//         <MobileMenuBtn
//           handleClick={handleMobileMenu}
//           isOpen={isMobileMenuOpen}
//         />
//       </div>
//     </header>
//   );
// }

import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import HeaderClient from './Header.client';
import css from './Header.module.css';

export default function Header() {
  return (
    <header className={css.header}>
      <div className={`container ${css.headerContainer}`}>
        <Logo variant="header-main-page" />
        <Navigation variant="header-main-page" />
        <HeaderClient />
      </div>
    </header>
  );
}
