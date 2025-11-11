// components/TravellersList/TravellersList.tsx
import { getUsersServer } from '@/lib/api/serverApiTravellers';
import type { User } from '@/types/userTravellers';
import TravellersListClient from './TravellersListClient';
import styles from './TravellersList.module.css';

export default async function TravellersList() {
  let initialUsers: User[] = [];
  let totalPages = 1;

  try {
    const res = await getUsersServer(1, 4);
    initialUsers = res.data.users ?? [];
    totalPages = res.data.totalPages ?? 1;
  } catch (err) {
    console.error('Error fetching users:', err);
  }

  return (
    <section className={styles.our__travellers}>
      <div className="container">
        <h2 className={styles.travellers__title}>Наші Мандрівники</h2>

        {/* Клієнтський компонент для рендеру списку */}
        <TravellersListClient
          initialUsers={initialUsers}
          perPage={4}
          totalPages={totalPages}
          initialPage={1}
        />
      </div>
    </section>
  );
}
