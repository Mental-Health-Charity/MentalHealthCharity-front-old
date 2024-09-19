import { BASE_URL } from '@/config';
import { Chat, ChatData, Message, Messages } from '@/utils/chatTypes';
import { getCookies, getCookiesAuth } from '@/utils/cookies';
import { set } from 'date-fns';
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { User, useAuth } from '../authProvider/Auth.provider';
import { failurePopUp } from '@/utils/defaultNotifications';

type Contract = {
  is_confirmed: boolean;
  content: string;
  id: number;
};

export interface Report {
  report_type: string;
  subject: string;
  description: string;
}

type ChatContextType = {
  loading: boolean;
  ready: boolean;
  getMessages: (
    page: number,
    size: number,
    chatId: number,
  ) => Promise<Messages>;
  sendMessage: (chatId: number, content: string) => Promise<void>;
  createReport: (report: Report) => Promise<void>;
  editContract: (chatId: number, content: string) => Promise<Contract>;
  selectedChat: Chat | undefined;
  setSelectedChat: Dispatch<SetStateAction<Chat | undefined>>;
  chatsList: Chat[];
  ws: WebSocket | undefined;
  unreadedMessages: number;
  wsMessages: Message[];
  setWsMessages: React.Dispatch<React.SetStateAction<Message[]>>;
};

export const ChatContext = React.createContext<ChatContextType>({
  loading: true,
  ready: false,
  getMessages: async (_page, _size, _chatId) => {
    return {} as Messages;
  },
  sendMessage: async (_chatId, _content) => {},
  createReport: async (_report) => {},
  editContract: async (_chatId, _content) => {
    return {} as Contract;
  },
  selectedChat: undefined,
  setSelectedChat: () => {},
  chatsList: [],
  ws: undefined,
  unreadedMessages: 0,
  wsMessages: [],
  setWsMessages: () => {},
});

const specificStatusCodeMappings = {
  1000: 'Normal Closure',
  1001: 'Going Away',
  1002: 'Protocol Error',
  1003: 'Unsupported Data',
  1004: '(For future)',
  1005: 'No Status Received',
  1006: 'Abnormal Closure',
  1007: 'Invalid frame payload data',
  1008: 'Policy Violation',
  1009: 'Message too big',
  1010: 'Missing Extension',
  1011: 'Internal Error',
  1012: 'Service Restart',
  1013: 'Try Again Later',
  1014: 'Bad Gateway',
  1015: 'TLS Handshake',
};

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const SIZE = 5;
  const [loading, setIsLoading] = useState(true);
  const [headers, setHeaders] = useState<HeadersInit | undefined>();
  const [selectedChat, setSelectedChat] = useState<Chat | undefined>();
  const [chatsList, setChatsList] = useState<Chat[]>([]);
  const [ws, initWS] = useState<WebSocket>();
  const [unreadedMessagesWS, initUnreadedMessagesWS] = useState<WebSocket>();
  const [unreadedMessages, setUnreadedMessages] = useState(0);
  const [wsMessages, setWsMessages] = useState<Message[]>([]);
  const { user } = useAuth();

  const wsConnectToChat = useCallback(async () => {
    const data = await getCookies('jwtToken');

    if (data && selectedChat?.id) {
      if (ws) {
        ws.close();
      }

      const newWebSocket = new WebSocket(
        `wss://api.fundacjaperyskop.org/ws-chat?token=${data}&chat_id=${selectedChat.id}`,
      );

      newWebSocket.onopen = () => {
        console.warn('connected');
        console.warn('[WS][CONNECTED]');
      };

      newWebSocket.onclose = (evt) => {
        failurePopUp(
          'Połączenie z chatem zostało przerwane, sprawdź swoje połączenie z internetem.',
        );
        console.warn(
          `[WS][CLOSED] ${
            specificStatusCodeMappings[
              evt.code as keyof typeof specificStatusCodeMappings
            ]
          }`,
        );
      };

      initWS(newWebSocket);
    }
  }, [selectedChat]);

  useEffect(() => {
    (async () => {
      setHeaders(await getCookiesAuth());
    })();
  }, []);

  useEffect(() => {
    wsConnectToChat();
  }, [wsConnectToChat]);

  useEffect(() => {
    (async () => {
      const data = await getCookies('jwtToken');
      initUnreadedMessagesWS(
        new WebSocket(
          `wss://api.fundacjaperyskop.org/ws-unread-chats?token=${data}`,
        ),
      );
    })();
  }, []);

  useEffect(() => {
    if (unreadedMessagesWS) {
      unreadedMessagesWS.onmessage = (evt) => {
        setUnreadedMessages(evt.data);
      };
    }
  }, [unreadedMessagesWS]);

  const sendMessage = async (chatId: number, content: string) => {
    if (ws && content.trim() !== '') {
      setWsMessages((prevMessages) => [
        {
          content,
          creation_date: new Date().toISOString(),
          id: 0,
          sender: user as User,
          isPending: true,
        },
        ...prevMessages,
      ]);
      ws.send(JSON.stringify({ chatId, content }));
    }
  };

  useEffect(() => {
    if (ws) {
      ws.onopen = () => {
        console.warn('connected');
        console.warn('[WS][CONNECTED]');
      };

      ws.onclose = (evt) => {
        console.warn(
          `[WS][CLOSED] ${
            specificStatusCodeMappings[
              evt.code as keyof typeof specificStatusCodeMappings
            ]
          }`,
        );
      };

      ws.onmessage = (e) => {
        var server_message = e.data;
        console.info('MESSAGE', server_message);
        return false;
      };
    }
  }, [ws]);

  useEffect(() => {
    if (ws) {
      ws.onmessage = (e) => {
        const server_message = e.data;
        const newMessage = JSON.parse(server_message);

        console.log('newMessage', newMessage);

        setWsMessages((prevMessages) => {
          const updatedMessages = prevMessages.map((message) => {
            if (message.isPending && message.content === newMessage.content) {
              return newMessage;
            } else {
              return message;
            }
          });

          // If the new message is not found in the previous messages, add it to the array
          if (
            !updatedMessages.some((message) => message.id === newMessage.id)
          ) {
            updatedMessages.unshift(newMessage);
          }

          return updatedMessages;
        });
      };
    }
  }, [ws, wsMessages]);

  return (
    <ChatContext.Provider
      value={
        {
          loading,
          ready: !!ws,
          chatsList,
          ws,
          setSelectedChat,
          sendMessage,
          selectedChat,
          wsMessages,
          setWsMessages,
        } as unknown as ChatContextType
      }
    >
      {children}
    </ChatContext.Provider>
  );
};
