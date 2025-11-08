// Components/MobileMenuBtn/MobileMenuBtn.tsx

import css from './MobileMenuBtn.module.css';

type MobileMenuBtnProps = {
  handleClick: () => void;
  isOpen: boolean;
};

export default function MobileMenuBtn({
  handleClick,
  isOpen,
}: MobileMenuBtnProps) {
  return (
    <button onClick={handleClick} className={css.button} aria-label="Menu">
      <div className={`${css.navIcon} ${isOpen ? css.open : ''}`}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </button>
  );
}
