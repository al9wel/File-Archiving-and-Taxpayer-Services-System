import { useEffect, useState } from 'react';
import { firebaseChatApi } from '../api/firebaseChatApi';
import type { Message } from '@/types/CustomerService';

export const useMessages = (chatId: string | undefined) => {
  const [data, setData] = useState<Message[]>([]);
  const [isPending, setIsPending] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!chatId) {
      setData([]);
      setIsPending(false);
      return;
    }

    setIsPending(true);
    setIsError(false);
    
    try {
      const unsubscribe = firebaseChatApi.subscribeToMessages(chatId, (messages) => {
        setData(messages);
        setIsPending(false);
      });
      
      return () => {
        unsubscribe();
      };
    } catch (error) {
      console.error("Error subscribing to messages:", error);
      setIsError(true);
      setIsPending(false);
    }
  }, [chatId]);

  return {
    data,
    isPending,
    isLoading: isPending,
    isError
  };
};
