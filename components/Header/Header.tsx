import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import css from './Header.module.css';

export default async function Header() {
  return (
    <header className={css.header}>
      <div className={`container ${css.headerContainer}`}>
        <Logo variant="header-main-page" />
        <Navigation variant="header-main-page" />
      </div>
    </header>
  );
}
