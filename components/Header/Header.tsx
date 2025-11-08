// import { Icon } from '../Icon/Icon';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import css from './Header.module.css';

export default async function Header() {
  return (
    <header className={css.header}>
      {/* <div className="container"> */}
      <div className={`container ${css.headerContainer}`}>
        <Logo />
        <Navigation variant="header" />
        {/* <Icon name="icon-logout" size={24} /> */}
      </div>
    </header>
  );
}
