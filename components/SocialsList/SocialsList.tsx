import Link from 'next/link';
import { Icon } from '../Icon/Icon';
import css from './SocialsList.module.css';

export default function SocialsList() {
  return (
    <ul className={css.list}>
      <li className={css.item}>
        <Link className={css.link} href="#">
          <Icon name="icon-Facebook" className={css.icon}></Icon>
        </Link>
      </li>
      <li className={css.item}>
        <Link className={css.link} href="#">
          <Icon name="icon-Instagram" className={css.icon}></Icon>
        </Link>
      </li>
      <li className={css.item}>
        <Link className={css.link} href="#">
          <Icon name="icon-X" className={css.icon}></Icon>
        </Link>
      </li>
      <li className={css.item}>
        <Link className={css.link} href="#">
          <Icon name="icon-Youtube" className={css.icon}></Icon>
        </Link>
      </li>
    </ul>
  );
}
