// Components/Header/Header.tsx

import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import HeaderClient from './Header.client';
import css from './Header.module.css';

export default function Header() {
  const isMainPage = true;

  return (
    <header className={`${css.header} ${css.headerMainPage}`}>
      <div className={`container ${css.headerContainer}`}>
        <Logo variant={isMainPage ? 'header-main-page' : undefined} />
        <Navigation variant={isMainPage ? 'header-main-page' : 'header'} />
        <HeaderClient variant={isMainPage ? 'header-main-page' : undefined} />
      </div>
    </header>
  );
}
