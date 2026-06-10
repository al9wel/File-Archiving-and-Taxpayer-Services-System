import { useMutation } from '@tanstack/react-query';
import { firebaseChatApi } from '../api/firebaseChatApi';
import { useAuth } from '@/hooks/useAuth';

export const useSendMessage = () => {
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ chatId, message }: { chatId: string; message: string }) => {
      const userName = user ? `${user.firstName} ${user.lastName}` : 'Admin';
      await firebaseChatApi.sendMessage(chatId, message, userName, "admin");
    },
  });
};
