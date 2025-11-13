export type User = {
  _id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  articlesAmount: number;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export interface AuthResponse {
  user: User;
  message?: string;
}

export interface GetUsersResponse {
  data: {
    users: User[];
    page: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
  status: number;
  message: string;
}

export interface GetUserByIdResponse {
  status: number;
  message: string;
  data: {
    user: User;
    articles: {
      _id: string;
      title: string;
      img: string;
      date: string;
      favoriteCount: number;
    }[];
    totalArticles: number;
  };
}
