import { useEffect, useState } from 'react';
import { firebaseChatApi } from '../api/firebaseChatApi';
import type { Chat } from '@/types/CustomerService';

export const useChats = () => {
  const [data, setData] = useState<Chat[]>([]);
  const [isPending, setIsPending] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsPending(true);
    setIsError(false);
    
    try {
      const unsubscribe = firebaseChatApi.subscribeToChats((chats) => {
        setData(chats);
        setIsPending(false);
      });
      
      return () => {
        unsubscribe();
      };
    } catch (error) {
      console.error("Error subscribing to chats:", error);
      setIsError(true);
      setIsPending(false);
    }
  }, []);

  return {
    data,
    isPending,
    isLoading: isPending,
    isError
  };
};
