'use client';

import { useEffect, useState } from 'react';
import { Story } from '@/types/story';
import TravellersStoriesItem from '../TravellersStoriesItem/TravellersStoriesItem';
import { fetchStories } from '@/lib/api/serverApi';
import css from './TravellersStories.module.css';

interface TravellersStoriesProps {
  isAuthenticated: boolean;
}

export default function TravellersStories({ isAuthenticated }: TravellersStoriesProps) {
  const [stories, setStories] = useState<Story[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const loadStories = async () => {
    try {
      setLoading(true);
      const newStories = await fetchStories(page, 3);
      if (newStories.length === 0) {
        setHasMore(false);
      } else {
        setStories(prev => [...prev, ...newStories]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStories();
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [page]);

  return (
    <section>
      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stories.map(story => (
          <TravellersStoriesItem key={story._id} story={story} isAuthenticated={isAuthenticated} />
        ))}
      </ul>

      {hasMore && (
        <div className={css.stories__footer}>
          <button
            onClick={() => setPage(prev => prev + 1)}
            disabled={loading}
            className={css.stories__more}
          >
            {loading ? 'Завантаження...' : 'Переглянути всі'}
          </button>
        </div>
      )}
    </section>
  );
}