'use client';
import styles from './ChatWindow.module.scss';
import ChatMessage from './chatMessage/ChatMessage.component';
import ChatShortcut from './chatShortcut/ChatShortcut.component';
import { useEffect, useState } from 'react';
import { Chat } from '@/utils/chatTypes';
import { useAuth } from '@/contexts/authProvider/Auth.provider';
import Image from 'next/image';
import LoadingIcon from '../../../images/static/loading.svg';
import { useChatContext } from '@/hooks/useChatContext';
import Contract from './contract/Contract.component';
import Report from '../report/Report.component';
import { getChats, getMessages } from './lib/api';
import sendIcon from '../../../images/static/sendicon.png';
import clsx from 'clsx';
import MessageIcon from '../../../images/static/message.png';
import defaultUserImg from '../../../images/static/user.png';
import { failurePopUp } from '@/utils/defaultNotifications';
import Arrow from '../../../images/static/arrow.svg';
import Notes from './notes/Notes.component';

const ChatWindow = () => {
  const {
    selectedChat,
    sendMessage,
    wsMessages,
    setWsMessages,
    setSelectedChat,
  } = useChatContext();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [newMessage, setNewMessage] = useState<string | null>();
  const [chats, setChats] = useState<Chat[]>([]);
  const [isChatsLoading, setIsChatsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isChatListOpen, setIsChatListOpen] = useState(false);

  const searchChats = async () => {
    setIsChatsLoading(true);
    try {
      const data = getChats(1, 50);
      setChats((await data).items);
      setSelectedChat((await data).items[0]);
    } catch (error) {
      console.error(error);
    }
    setIsChatsLoading(false);
  };

  useEffect(() => {
    searchChats();
  }, []);

  const getChatMessages = async () => {
    if (selectedChat) {
      setIsLoading(true);
      try {
        const data = getMessages(1, 30, selectedChat?.id);
        setWsMessages((await data).items);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (selectedChat && newMessage) {
      sendMessage(selectedChat.id, newMessage);
      setNewMessage('');
    } else {
      failurePopUp('Błąd z wysyłaniem wiadomosci. Spróbuj odświeżyć stronę.');
    }
  };

  useEffect(() => {
    setWsMessages([]);
    getChatMessages();
  }, [selectedChat]);

  return (
    <>
      <section className={styles.mobileTopbar}>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={styles.mobileTopbar__chatInfo}
        >
          <Image
            alt="Ikona wiadomości"
            src={MessageIcon}
            width={32}
            height={32}
          />
          <p>{selectedChat?.name}</p>
        </button>
        <button
          onClick={() => setIsChatListOpen(!isChatListOpen)}
          className={styles.mobileTopbar__moreChats}
        >
          Lista chatów
        </button>
      </section>
      <section className={styles.main}>
        {/* sidebar */}
        <div
          className={clsx(styles.main__sidebar, {
            [styles['sidebar--active']]: isChatListOpen,
          })}
        >
          <div className={styles.main__sidebar__user}>
            <Image
              width={50}
              height={50}
              alt="Profil użytkownika"
              src={defaultUserImg}
            />
            <div className={styles.main__sidebar__user__wrapper}>
              <p className={styles.main__sidebar__user__wrapper__name}>
                {user?.full_name}
              </p>
              <p className={styles.main__sidebar__user__wrapper__role}>
                {user?.user_role}
              </p>
            </div>
            <button
              onClick={() => setIsChatListOpen(false)}
              className={styles.main__sidebar__user__mobileCloseBtn}
            >
              <Image src={Arrow} alt="Arrow back" width={32} height={32} />
            </button>
          </div>
          <input
            className={styles.main__sidebar__search}
            placeholder="Wyszukaj..."
            type="text"
          />

          <div className={styles.main__sidebar__chatList}>
            <p className={styles.main__sidebar__chatList__heading}>Chaty</p>
            <ul className={styles.main__sidebar__chatList__list}>
              {isChatsLoading ? (
                <Image
                  alt="ikona ładowania"
                  src={LoadingIcon}
                  width={60}
                  height={60}
                />
              ) : (
                chats.map((chat, index) => (
                  <ChatShortcut
                    setSelectedChat={setSelectedChat}
                    key={index}
                    chat={chat}
                    participants={chat.participants}
                  />
                ))
              )}
            </ul>
          </div>
        </div>
        <div className={styles.main__chat}>
          <ul className={styles.main__chat__messages}>
            {!isLoading ? (
              wsMessages.length <= 0 && selectedChat ? (
                <p className={styles.main__chat__messages__noMessagesFound}>
                  Napisz pierwszą wiadomość na tym chacie!
                </p>
              ) : (
                wsMessages.map((message) => {
                  return (
                    <ChatMessage
                      isPending={message.isPending}
                      key={message.id}
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
                })
              )
            ) : (
              <Image
                alt="ikona ładowania"
                src={LoadingIcon}
                width={60}
                height={60}
              />
            )}
          </ul>
          <div className={styles.main__chat__inputWrapper}>
            <textarea
              value={newMessage || ''}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <button
              onClick={handleSendMessage}
              type="submit"
              aria-label="submit message"
              value=">"
            >
              <Image alt="send icon" src={sendIcon} height={36} width={36} />
            </button>
          </div>
        </div>
        <div
          className={clsx(styles.main__sidebar, {
            [styles['sidebar--active']]: isSidebarOpen,
          })}
        >
          <div className={styles.main__sidebar__chatInfo}>
            <Image
              alt="Ikona wiadomości"
              src={MessageIcon}
              width={32}
              height={32}
            />
            <p>{selectedChat?.name}</p>

            <button
              onClick={() => setIsSidebarOpen(false)}
              className={styles.main__sidebar__user__mobileCloseBtn}
            >
              <Image src={Arrow} alt="Arrow back" width={32} height={32} />
            </button>
          </div>

          <div className={styles.main__sidebar__chatSettings}>
            {selectedChat && <Contract chatId={selectedChat.id} />}
            {selectedChat && <Report />}
            {selectedChat && <Notes chatId={selectedChat.id} />}
          </div>
          <div className={styles.main__sidebar__usersWrapper}>
            <p>Uczestnicy</p>
            <ul className={styles.main__sidebar__usersWrapper__list}>
              {selectedChat?.participants?.map((user) => (
                <li
                  key={user.id}
                  className={styles.main__sidebar__usersWrapper__list__item}
                >
                  <Image
                    alt="User default img"
                    width={32}
                    height={32}
                    src={defaultUserImg}
                  />
                  <div
                    className={
                      styles.main__sidebar__usersWrapper__list__item__userInfo
                    }
                  >
                    <p
                      className={
                        styles.main__sidebar__usersWrapper__list__item__userInfo__name
                      }
                    >
                      {user.full_name}
                    </p>
                    <p
                      className={
                        styles.main__sidebar__usersWrapper__list__item__userInfo__role
                      }
                    >
                      {user.user_role}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default ChatWindow;
