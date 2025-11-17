// import { api } from '@/lib/api/api';
import axios from 'axios';

// const baseURL = process.env.NEXT_PUBLIC_API_URL + 'api';
const baseURL = 'http://localhost:3001/api';

const nextServer = axios.create({
  baseURL,
  withCredentials: true,
});

type Category =
  | 'Європа'
  | 'Азія'
  | 'Пустелі'
  | 'Африка'
  | 'Гори'
  | 'Америка'
  | 'Балкани'
  | 'Кавказ'
  | 'Океанія';

interface EditStory {
  title: string;
  article: string;
  category: Category;
  img: File;
}

interface StoryResponse {
  status: number;
  message: string;
  data: object;
}

export async function editStory(
  storyToEdit: EditStory
): Promise<StoryResponse> {
  const formData = new FormData();
  formData.append('title', storyToEdit.title);
  formData.append('article', storyToEdit.article);
  formData.append('category', storyToEdit.category);
  formData.append('img', storyToEdit.img);

  const { data } = await nextServer.patch<StoryResponse>('/stories', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}
