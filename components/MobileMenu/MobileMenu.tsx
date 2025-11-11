// import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import css from './MobileMenu.module.css';

export default function MobileMenu() {
  return (
    <div className="container">
      <div className={css.mobileMenu}>
        {/* <div className={css.logo}>
        <Logo />
      </div> */}
        <Navigation variant="mobile-menu" />
      </div>
    </div>
  );
}
