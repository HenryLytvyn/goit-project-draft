'use client';

import { useParams } from 'next/navigation';
import MessageNoStories from '@/components/MessageNoStories/MessageNoStories';

type Story = {
  id: string;
  title: string;
  content?: string;
  imageUrl?: string;
};

export default function TravelerPage() {
  const params = useParams<{ travellerId: string }>();
  const { travellerId } = params;

  // 🧩 Тимчасові дані
  const traveller = {
    id: travellerId,
    name: 'Anastasia Oliynyk',
    bio: 'I love active travel and exploration of the cultures of the world.',
    avatarUrl: '/images/anastasia.jpg',
  };

  const stories: Story[] = []; // Порожній масив для демонстрації відсутності історій
  return (
    <main style={{ padding: '40px' }}>
      <h1>Traveler Profile</h1>
      <p>ID: {traveller.id}</p>
      <p>Name: {traveller.name}</p>
      <p>About: {traveller.bio}</p>

      {stories.length > 0 ? (
        <ul>
          {stories.map(story => (
            <li key={story.id}>{story.title}</li>
          ))}
        </ul>
      ) : (
        <MessageNoStories
          text="Цей користувач ще не публікував історій"
          buttonText="Назад до історій"
          redirectPath="/stories"
        />
      )}
    </main>
  );
}
