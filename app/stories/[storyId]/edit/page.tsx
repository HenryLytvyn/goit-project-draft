'use client';

import { useParams } from 'next/navigation';

export default function EditStoryPage() {
  const params = useParams();
  return <h2>EditStory – {params.storyId}</h2>;
}
