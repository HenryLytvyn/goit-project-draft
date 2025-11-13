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
    <section className={styles.travellerId}>
      <div className={`container ${styles.containerTraveller}`}>
        <TravellerInfo
          user={user}
          useDefaultStyles={false}
          priority={true}
          className={{
            wrapper: styles.wrapperContent,
            container: styles.travellerContainer,
            name: styles.travellerName,
            text: styles.travellerText,
          }}
          imageSize={{ width: 199, height: 199 }}
        />
        <div className={styles.travellerStories}>
          <h2 className={styles.travellerStoriesTitle}>Історії Мандрівника</h2>
        </div>
      </div>
    </section>
  );
}
