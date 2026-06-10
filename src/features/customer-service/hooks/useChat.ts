import { useQuery } from '@tanstack/react-query';
import { firebaseChatApi } from '../api/firebaseChatApi';

export const useChat = (chatId: string | undefined) => {
  return useQuery({
    queryKey: ['chat', chatId],
    queryFn: async () => {
      if (!chatId) return null;
      return await firebaseChatApi.getChat(chatId);
    },
    enabled: !!chatId,
  });
};
