// app/travellers/[travellerId]/page.tsx
import { getUserByIdServer } from '@/lib/api/serverApi';
import TravellerInfo from '@/components/TravellerInfo/TravellerInfo';
import styles from './TravellerPage.module.css';

interface TravellerPageProps {
  params: Promise<{
    travellerId: string;
  }>;
}

export default async function TravellerPage({ params }: TravellerPageProps) {
  const { travellerId } = await params;
  const res = await getUserByIdServer(travellerId);
  const user = res.data.user;

  return (
    <section className={styles.travellersId}>
      <div className="container">
        <div className={styles.pageContainer}>
          <div className={styles.profileContainer}>
            <TravellerInfo
              user={user}
              useDefaultStyles={false}
              priority={true}
              className={{
                name: styles.travellerName,
                text: styles.travellerText,
              }}
              imageSize={{ width: 199, height: 199 }}
            />
          </div>

          <div>
            <h2>Travellers Stories</h2>
          </div>
        </div>
      </div>
    </section>
  );
}
