import { useQuery } from '@tanstack/react-query';
import { authApi } from '../api/authApi';
import { useAuthStore } from '@/app/store/authStore';
import { useEffect } from 'react';

export const useAuthMe = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const token = localStorage.getItem('access_token');
  const userId = localStorage.getItem('user_id');

  const query = useQuery({
    queryKey: ['authMe', userId],
    queryFn: () => {
      if (!userId) throw new Error('No user id found');
      return authApi.getUser(userId);
    },
    enabled: !!token && !!userId, // only run if we have a token and a user ID
    retry: false, // Don't retry if token is invalid or endpoint fails
  });

  // Sync user object with global Zustand store on success
  useEffect(() => {
    if (query.data?.data) {
      setUser(query.data.data);
    }
  }, [query.data, setUser]);

  // If there's an error (e.g. 401), fetchClient takes care of clearing token.

  return query;
};
