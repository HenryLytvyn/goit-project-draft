// import Link from 'next/link';
import css from './Header.module.css';
// import TagsMenu from '../TagsMenu/TagsMenu';
// import AuthNavigation from '../AuthNavigation/AuthNavigation';

export default async function Header() {
  return (
    <header className={css.header}>
      <div className="container">
        <p>HEADER</p>
      </div>
    </header>
  );
}
