// import Link from 'next/link';
// import AuthNavigation from '../AuthNavigation/AuthNavigation';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import css from './Header.module.css';

export default async function Header() {
  return (
    <header className={css.header}>
      {/* <div className="container"> */}
      <div className={`container ${css.headerContainer}`}>
        <Logo />
        <Navigation className={css.nav} />
      </div>
    </header>
  );
}
