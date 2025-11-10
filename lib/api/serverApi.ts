import { cookies } from 'next/headers';
import { api } from './api';
import { User } from '@/types/user';

// export const checkServerSession = async () => {
//   const cookieStore = await cookies();
//   const res = await api.get('/auth/session', {
//     headers: {
//       Cookie: cookieStore.toString(),
//     },
//   });
//   return res;
// };

export const getServerMe = async () => {
  const cookieStore = await cookies();
  const { data } = await api.get<User>('/users/me/profile', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};
