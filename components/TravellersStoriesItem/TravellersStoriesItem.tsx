'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Story } from '@/types/story';
import { addStoryToFavorites, removeStoryFromFavorites } from '@/lib/api/serverApi';
import css from './TravellersStoriesItem.module.css';
import { Icon } from '../Icon/Icon';

interface TravellersStoriesItemProps {
  story: Story;
  isAuthenticated: boolean;
}

export default function TravellersStoriesItem({ story, isAuthenticated }: TravellersStoriesItemProps) {
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(story.isFavorite ?? false);
  const [isSaving, setIsSaving] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(story.favoriteCount);

  const handleSave = async () => {
    if (!isAuthenticated) {
      router.push('/auth/register');
      return;
    }

    try {
      setIsSaving(true);
      if (!isSaved) {
        await addStoryToFavorites(story._id);
        setFavoriteCount(prev => prev + 1);
        setIsSaved(true);
        toast.success('Додано до збережених!');
      } else {
        await removeStoryFromFavorites(story._id);
        setFavoriteCount(prev => prev - 1);
        setIsSaved(false);
        toast('Видалено із збережених');
      }
    } catch (error) {
        console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <li className={css.story}>
      <Image src={story.img} alt={story.title} width={400} height={200} className={css.story__img} />

      <div className={css.story__content}>
        
        <p className={css.story__category}>{story.category}</p>
        <h3 className={css.story__title}>{story.title}</h3>
        <p className={css.story__text}>{story.article}</p>
              
      <div className={css.story__author}>
      <Image src={story.author.avatarUrl} alt="Автор" className={css.story__avatar} />
      <div className={css.story__info}>
        <p className={css.story__name}>{story.author.name}</p>
            <p className={css.story__meta}>{story.date} •  <span className="favoriteCount">{favoriteCount}</span><Icon name="icon-bookmark" className={css.icon} /></p>
      </div>
    </div>
<div className={css.story__actions}>
          <button
            onClick={() => router.push(`/stories/${story._id}`)}
            className={css.story__btn}
          >
            Переглянути статтю
          </button>

          
            <button
              onClick={handleSave}
              disabled={isSaving}
              className={css.story__save}
            >
              {isSaved ? <Icon name='icon-bookmark' className={css.story__save} /> : <Icon name='icon-bookmark' className={css.icon__bookmark} />}
            </button>
           
          
        </div>
      </div>
    </li>
  );
};