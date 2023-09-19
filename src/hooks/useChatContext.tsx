import { ChatContext } from '@/contexts/chatProvider/Chat.provider';
import { useContext } from 'react';

export const useChatContext = () => {
  const data = useContext(ChatContext);

  return data;
};
