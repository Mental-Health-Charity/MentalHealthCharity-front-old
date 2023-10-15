import styles from './ChatWindow.module.scss';
import ChatMessage from './chatMessage/ChatMessage.component';
import ChatShortcut from './chatShortcut/ChatShortcut.component';
import { useEffect, useState } from 'react';
import { Chat, Message } from '@/utils/chatTypes';
import { User, useAuth } from '@/contexts/authProvider/Auth.provider';
import Image from 'next/image';
import LoadingIcon from '../../../images/static/loading.svg';
import 'react-toastify/dist/ReactToastify.css';
import Roles from '@/utils/roles';
import { useChatContext } from '@/hooks/useChatContext';
import Contract from './contract/Contract.component';
import Report from '../report/Report.component';
import { BASE_URL } from '@/config';
import { getChats, getMessages } from './lib/api';
import sendIcon from '../../../images/static/sendicon.png';
const ChatWindow = () => {
  const {
    chatsList,
    loading,
    ready,
    selectedChat,
    sendMessage,
    ws,
    wsMessages,
  } = useChatContext();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string | null>();
  const [chats, setChats] = useState<Chat[]>([]);

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

  const searchChats = async () => {
    try {
      const data = getChats(1, 50);
      setChats((await data).items);
      console.log('chats', chats);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    searchChats();
  }, []);

  const getChatMessages = async () => {
    if (selectedChat) {
      console.log('GETMESSAGES');
      try {
        const data = getMessages(1, 8, selectedChat?.id);
        setMessages((await data).items);
        console.log(messages);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (wsMessages) {
      setMessages((prevMessages) => [...prevMessages, ...wsMessages].reverse());
    }
  }, [wsMessages]);

  useEffect(() => {
    setMessages([]);
    getChatMessages();
  }, [selectedChat]);

  return (
    <div className={styles.chatWindow}>
      <ul className={styles.chatWindow__chatsList}>
        {chats.map((chat, index) => (
          <ChatShortcut
            handleReadMessages={async () => getChatMessages()}
            key={index}
            chat={chat}
            participants={chat.participants}
          />
        ))}
      </ul>

      <div className={styles.chatWindow__chat}>
        <div className={styles.chatWindow__chat__report}>
          {/* {selectedChat && <Contract chatId={selectedChat.id} />} */}
          {/* <Report /> */}
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
          {messages.map((message, index) => {
            return (
              <ChatMessage
                key={index}
                senderIsAuthor={
                  message.sender && message.sender.id === user?.id
                    ? true
                    : message.sender_id === user?.id
                }
                author={message.sender ? message.sender.full_name : ''}
                content={message.content}
                date={message.creation_date}
              />
            );
          })}
        </ul>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            selectedChat &&
              newMessage &&
              sendMessage(selectedChat?.id, newMessage);
          }}
          className={styles.chatWindow__chat__chatForm}
        >
          <textarea
            onChange={(e) => setNewMessage(e.target.value)}
            className={styles.chatWindow__chat__chatForm__input}
            placeholder="wiadomość..."
          />
          <button
            className={styles.chatWindow__chat__chatForm__send}
            type="submit"
            value=">"
          >
            <Image alt="send icon" src={sendIcon} height={36} width={36} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
