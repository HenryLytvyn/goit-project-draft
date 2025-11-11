// components/TravellersList/TravellersList.tsx
import { getUsersServer } from '@/lib/api/serverApi';
import type { User } from '@/types/user';
import TravellerInfo from '@/components/TravellerInfo/TravellerInfo';
import Link from 'next/link';
import styles from './TravellersList.module.css';

export default async function TravellersList() {
  let users: User[] = [];

  try {
    const res = await getUsersServer(1, 4); // Отримуємо лише 4 користувачів
    users = res.data.data ?? [];
  } catch (err) {
    console.error('Error fetching users:', err);
  }

  return (
    <section className={styles.our__travellers}>
      <div className="container">
        <h2 className={styles.travellers__title}>Наші Мандрівники</h2>

        <ul className={styles.travellers__list}>
          {users.map(user => (
            <li key={user._id} className={styles.travellers__item}>
              <TravellerInfo user={user} useDefaultStyles={true} />
              <Link
                href={`/travellers/${user._id}`}
                className={styles.traveller__btn}
              >
                Переглянути профіль
              </Link>
            </li>
          ))}
        </ul>

        {/* Кнопка веде на сторінку зі всіма користувачами */}
        <div className={styles.loadMoreWrapper}>
          <Link href="/travellers" className={styles.traveller__btn__more}>
            Показати всіх
          </Link>
        </div>
      </div>
    </section>
  );
}
