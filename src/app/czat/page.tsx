'use client';
import ChatWindow from '@/common/components/common/chatWindow/ChatWindow.component';
import { ChatProvider } from '@/contexts/chatProvider/Chat.provider';

function Chat() {
  return (
    <ChatProvider>
      <ChatWindow />
    </ChatProvider>
  );
}

export default Chat;
