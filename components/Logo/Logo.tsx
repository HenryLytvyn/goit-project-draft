import Link from 'next/link';
import css from './Logo.module.css';

export default function Logo() {
  return (
    <Link className={css.logoLink} href="#">
      <span className={css.logoText}>Подорожники</span>
    </Link>
  );
}
