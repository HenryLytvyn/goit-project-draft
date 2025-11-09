import { Icon } from '@/components/Icon/Icon';
import css from './ProfileAndLogoutLinks.module.css';
import Link from 'next/link';

export default function ProfileAndLogoutLinks() {
  return (
    <div>
      <Link href="#" className={css.profileLink}>
        <Icon name="avatar" className={css.avatar} />
        <p>Ім&apos;я</p>
        <div></div>
      </Link>
    </div>
  );
}
