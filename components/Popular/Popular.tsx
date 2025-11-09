import TravellersStories from '../TravellersStories/TravellersStories';
import css from './Popular.module.css';

interface PopularProps {
  isAuthenticated: boolean;
}

export default function Popular({ isAuthenticated }: PopularProps) {
  return (
    <section className="stories">
      <div className="container">
        <h2 className={css.stories__title}>Популярні історії</h2>
        <TravellersStories isAuthenticated={isAuthenticated} />
      </div>
    </section>
  );
}