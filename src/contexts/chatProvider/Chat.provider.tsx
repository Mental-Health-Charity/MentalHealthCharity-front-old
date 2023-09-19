import { BASE_URL } from '@/config';
import { Chat, ChatData, Messages } from '@/utils/chatTypes';
import { getCookies, getCookiesAuth } from '@/utils/cookies';
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';

type Contract = {
  is_confirmed: boolean;
  content: string;
  id: number;
};

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

  const wsConnectToChat = useCallback(async () => {
    const data = await getCookies('jwtToken');
    if (data && selectedChat?.id)
      initWS(
        new WebSocket(
          `ws://mentalhealthcharity-backend-production.up.railway.app/ws-chat?token=${data}&chat_id=${selectedChat.id}`,
        ),
      );
  }, [selectedChat]);

  useEffect(() => {
    (async () => {
      setHeaders(await getCookiesAuth());
    })();
  }, []);

  useEffect(() => {
    if (headers) {
      setIsLoading(true);
      let page = 1;
      const chatsList: Chat[] = [];

      (async () => {
        const res = await fetch(
          `${BASE_URL}/api/v1/chat/?page=${page}&size=${SIZE}`,
          {
            method: 'get',
            headers,
          },
        );
        const data = (await res.json()) as ChatData;
        chatsList.push(...data.items);
        page++;
        for (page; page <= data.pages; page++) {
          const res = await fetch(
            `${BASE_URL}/api/v1/chat/?page=${page}&size=${SIZE}`,
            {
              method: 'get',
              headers,
            },
          );
          const data = (await res.json()) as ChatData;
          chatsList.push(...data.items);
        }
      })();

      setChatsList(chatsList);
      setIsLoading(false);
    }
  }, [headers]);

  useEffect(() => {
    wsConnectToChat();
  }, [wsConnectToChat]);

  useEffect(() => {
    (async () => {
      const data = await getCookies('jwtToken');
      initUnreadedMessagesWS(
        new WebSocket(
          `ws://mentalhealthcharity-backend-production.up.railway.app/ws-unread-chats?token=${data}`,
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
        alert(server_message);
        return false;
      };
    }
  }, [ws]);

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
        alert(server_message);
        return false;
      };
    }
  }, [ws]);

  return (
    <ChatContext.Provider
      value={
        {
          loading,
          ready: !!ws,
          chatsList,
          ws,
          setSelectedChat,
          selectedChat,
        } as unknown as ChatContextType
      }
    >
      {children}
    </ChatContext.Provider>
  );
};
