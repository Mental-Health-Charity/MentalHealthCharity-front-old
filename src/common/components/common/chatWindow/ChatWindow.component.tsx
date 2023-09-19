import { useChat } from '@/contexts/chatProvider/Chat.provider';
import styles from './ChatWindow.module.scss';
import ChatMessage from './chatMessage/ChatMessage.component';
import ChatShortcut from './chatShortcut/ChatShortcut.component';
import { FormEvent, useEffect, useState } from 'react';
import { Chat, ChatData, Message, Messages } from '@/utils/chatTypes';
import { User, useAuth } from '@/contexts/authProvider/Auth.provider';
import Image from 'next/image';
import LoadingIcon from '../../../images/static/loading.svg';
import 'react-toastify/dist/ReactToastify.css';
import { failurePopUp, successPopUp } from '@/utils/defaultNotifications';
import Roles from '@/utils/roles';
import SadEmoteLoadingFailIcon from '../../../images/static/sademotefailloading.svg';
import Report from '../report/Report.component';
import Contract from './contract/Contract.component';
import { Socket, io } from 'socket.io-client';
import { getCookies, getCookiesAuth } from '@/utils/cookies';

const ChatWindow = () => {
  const { getChats, getMessages, sendMessage } = useChat();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [chats, setChats] = useState<ChatData | null>(null);
  const [selectedChat, setSelectedChat] = useState<Chat | null>();
  const [messages, setMessages] = useState<Array<Message>>([]);
  const [newMessage, setNewMessage] = useState<string | null>();
  const [ws, setWS] = useState<WebSocket>();

  const handleSocketInit = async () => {
    const data = await getCookies('jwtToken');
    const socketTest = new WebSocket(
      `wss://mentalhealthcharity-backend-production.up.railway.app/ws-chat?token=${data}&chat_id=5`,
    );
    socketTest.onopen = () => setWS(socketTest);
    if (ws) {
      ws.onmessage = (msg) => setMessages(msg.data);
    }
  };

  useEffect(() => {
    handleSocketInit();
  }, [selectedChat]);

  const readChats = async (page: number) => {
    setIsLoading(true);
    try {
      const data: ChatData = await getChats(page, 30);
      setChats(data);
      console.log(data);
      user && successPopUp('Wczytano dostępne czaty!');
    } catch (error) {
      console.log('Error retrieving data ', error);
      failurePopUp('Wystąpił błąd podczas wczytywania czatów...');
    }
    setIsLoading(false);
  };

  const handleReadMessages = async (chat: Chat) => {
    if (ws) {
      // ws.onclose();
      const cookiesToken = await getCookies('jwtToken');

      console.log('chat_id', chat.id);

      const socketTest = new WebSocket(
        `wss://mentalhealthcharity-backend-production.up.railway.app/ws-chat?token=${cookiesToken}&chat_id=5`,
      );

      socketTest.onopen = () => setWS(socketTest);
      ws.onmessage = (msg) => setMessages(msg.data);
    }
  };

  const getUserRole = (participant: User) => {
    switch (participant.user_role) {
      case Roles.admin:
        return (
          <span
            className={
              styles.chatWindow__chat__participants__participant__roleAdmin
            }
          >
            [Admin]
          </span>
        );
      case Roles.volunteer:
        return (
          <span
            className={
              styles.chatWindow__chat__participants__participant__roleVolunteer
            }
          >
            [Wolontariusz]
          </span>
        );
      default:
        return null;
    }
  };

  const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedChat && newMessage) {
      console.log(messages);
      // Wyślij wiadomość za pomocą WebSocket
      console.log('send');
      ws?.send(newMessage);
    }
  };

  useEffect(() => {
    readChats(1);
  }, []);

  return (
    <div className={styles.chatWindow}>
      <h2 className={styles.chatWindow__heading}>Chat</h2>
      <ul className={styles.chatWindow__chatsList}>
        {chats && chats.items?.length > 0 ? (
          chats.items.map((chat, index) => (
            <ChatShortcut
              handleReadMessages={handleReadMessages}
              setSelectedChat={setSelectedChat}
              key={index}
              chat={chat}
              participants={chat.participants}
            />
          ))
        ) : (
          <div className={styles.chatWindow__chatsList__error}>
            <h3 className={styles.chatWindow__chatsList__error__heading}>
              Ups... Brak dostępnych czatów
            </h3>
            {user?.user_role === Roles.user && (
              <p className={styles.chatWindow__chatsList__error__content}>
                Wypełnij formularz, aby przypisać Ci konkretnego wolontariusza.
              </p>
            )}
          </div>
        )}
      </ul>
      <div className={styles.chatWindow__chat}>
        <div className={styles.chatWindow__chat__report}>
          {selectedChat && <Contract chatId={selectedChat.id} />}
          <Report />
        </div>
        <div className={styles.chatWindow__chat__heading}>
          <h3 className={styles.chatWindow__chat__name}>
            {selectedChat?.name}
          </h3>

          <ul className={styles.chatWindow__chat__participants}>
            {selectedChat
              ? selectedChat.participants?.map((user, index) => {
                  return (
                    <li
                      className={
                        styles.chatWindow__chat__participants__participant
                      }
                      key={index}
                    >
                      {getUserRole(user)}
                      <p
                        className={
                          styles.chatWindow__chat__participants__participant__name
                        }
                      >
                        {user.full_name ? user.full_name : 'Anonim'}
                      </p>
                      <p
                        className={
                          styles.chatWindow__chat__participants__participant__id
                        }
                      >
                        ({user.id})
                      </p>
                    </li>
                  );
                })
              : 'Wybierz czat, aby rozpocząć rozmowę'}
          </ul>
        </div>
        <ul className={styles.chatWindow__chat__messages}>
          {messages && !isLoading && messages ? (
            messages.map((message, index) => {
              return (
                <ChatMessage
                  key={index}
                  senderIsAuthor={message.sender.id === user?.id}
                  author={message.sender.full_name}
                  content={message.content}
                  date={message.creation_date}
                />
              );
            })
          ) : (
            <Image
              alt="Ikona ładowania"
              src={LoadingIcon}
              width={64}
              height={64}
            />
          )}
        </ul>
        <form
          onSubmit={(e) => handleSendMessage(e)}
          className={styles.chatWindow__chat__chatForm}
        >
          <textarea
            onChange={(e) => setNewMessage(e.target.value)}
            className={styles.chatWindow__chat__chatForm__input}
            placeholder="wiadomość..."
          />
          <input
            className={styles.chatWindow__chat__chatForm__send}
            type="submit"
            value="wyślij"
          />
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
