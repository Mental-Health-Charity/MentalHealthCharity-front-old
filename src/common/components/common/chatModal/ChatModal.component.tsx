import { useAuth, User } from '@/contexts/authProvider/Auth.provider';
import { useChat } from '@/contexts/chatProvider/Chat.provider';
import { ChatData, Chat, Messages } from '@/utils/chatTypes';
import { successPopUp, failurePopUp } from '@/utils/defaultNotifications';
import Roles from '@/utils/roles';
import { useState, useEffect, FormEvent } from 'react';
import ChatWindow from '../chatWindow/ChatWindow.component';
import ChatMessage from '../chatWindow/chatMessage/ChatMessage.component';
import ChatShortcut from '../chatWindow/chatShortcut/ChatShortcut.component';
import styles from './ChatModal.module.scss';
import Image from 'next/image';
import LoadingIcon from '../../../images/static/loading.svg';

const ChatModal = () => {
  const { getChats, getMessages, sendMessage } = useChat();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [chats, setChats] = useState<ChatData | null>(null);
  const [selectedChat, setSelectedChat] = useState<Chat | null>();
  const [messages, setMessages] = useState<Messages | null>(null);
  const [newMessage, setNewMessage] = useState<string | null>();
  const [openModal, setOpenModal] = useState(false);

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
    try {
      const data = await getMessages(1, 100, chat?.id);
      setMessages(data);
      console.log(messages);
    } catch (error) {
      console.log('ERROR while retrieving data ', error);
    }
  };

  useEffect(() => {
    // == WARNING !!! WARNING !!! WARNING !!! WARNING !!! WARNING !!! WARNING !!! WARNING !!! ==
    // THIS CODE BELOW IS AN NON-OPTIMIZED PROTOTYPE USED ONLY FOR EARLY-ACCESS VERSION OF CHAT
    // THE REASON FOR THIS SOLUTION IS BACKEND WHICH CURRENTLY DOESN'T SUPPORT WEBSOCKETS.
    readChats(1);
    if (selectedChat) {
      const interval = setInterval(() => {
        handleReadMessages(selectedChat);
        console.log('downloading...');
      }, 10000);
      return () => clearInterval(interval);
    }
    // == END == == END == == END == == END == == END == == END == == END == == END == == END ==
  }, [selectedChat]);

  const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedChat && newMessage) {
      setIsLoading(true);
      try {
        console.log('New message: ', newMessage);
        await sendMessage(selectedChat.id, newMessage);
        handleReadMessages(selectedChat);
      } catch (error) {
        console.log('ERROR: while sending a message ', error);
      }
      setIsLoading(false);
    } else {
      console.log('ERROR: Chat is not selected or message is not a string!');
    }
  };

  return (
    <div className={styles.chatWindow}>
      {openModal ? (
        <>
          <p className={styles.chatWindow__heading}>
            Chat{' '}
            <button
              onClick={() => setOpenModal(false)}
              className={styles.chatWindow__heading__close}
            >
              X
            </button>
          </p>

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
                    Wypełnij formularz, aby przypisać Ci konkretnego
                    wolontariusza.
                  </p>
                )}
              </div>
            )}
          </ul>
          <div className={styles.chatWindow__chat}>
            <ul className={styles.chatWindow__chat__messages}>
              {messages && !isLoading && messages.items ? (
                messages.items.map((message, index) => {
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
        </>
      ) : (
        <button onClick={() => setOpenModal(true)}>Otwórz modal</button>
      )}
    </div>
  );
};

export default ChatModal;
