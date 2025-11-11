import { api } from "./api";
import { Story } from "@/types/story";


interface StoriesResponse {
  status: number;
  message: string;
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  data: Story[];
}





export async function fetchStories(page = 1, perPage = 3): Promise<Story[]> {
  
  const response = await api.get<StoriesResponse>(
    `/stories`, { params: { page, perPage, sort: 'favoriteCount' } }
  );
  console.log(response);
  return response.data?.data || [];
}

fetchStories(1, 3);



export async function addStoryToFavorites(storyId: string): Promise<void> {
  await api.post(`/stories/${storyId}/favorite`);
}


export async function removeStoryFromFavorites(storyId: string): Promise<void> {
  await api.delete(`/stories/${storyId}/favorite`);
}



