'use client';
import styles from './ChatWindow.module.scss';
import ChatMessage from './chatMessage/ChatMessage.component';
import ChatShortcut from './chatShortcut/ChatShortcut.component';
import { useEffect, useState } from 'react';
import { Chat, Message } from '@/utils/chatTypes';
import { User, useAuth } from '@/contexts/authProvider/Auth.provider';
import Image from 'next/image';
import LoadingIcon from '../../../images/static/loading.svg';
import Roles from '@/utils/roles';
import { useChatContext } from '@/hooks/useChatContext';
import Contract from './contract/Contract.component';
import Report from '../report/Report.component';
import { getChats, getMessages } from './lib/api';
import sendIcon from '../../../images/static/sendicon.png';
import clsx from 'clsx';
import defaultUserImg from '../../../images/static/user.png';
const ChatWindow = () => {
  const {
    selectedChat,
    sendMessage,
    wsMessages,
    setWsMessages,
    unreadedMessages,
  } = useChatContext();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string | null>();
  const [chats, setChats] = useState<Chat[]>([]);
  const [isHiddenMobileMenu, setIsHiddenMobileMenu] = useState(false);

  // const getUserRole = (participant: User) => {
  //   switch (participant.user_role) {
  //     case Roles.admin:
  //       return (
  //         <span
  //           className={
  //             styles.chatWindow__chat__participants__participant__roleAdmin
  //           }
  //         >
  //           [Admin]
  //         </span>
  //       );
  //     case Roles.volunteer:
  //       return (
  //         <span
  //           className={
  //             styles.chatWindow__chat__participants__participant__roleVolunteer
  //           }
  //         >
  //           [Wolontariusz]
  //         </span>
  //       );
  //     default:
  //       return null;
  //   }
  // };

  const searchChats = async () => {
    try {
      const data = getChats(1, 50);
      setChats((await data).items);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    searchChats();
  }, []);

  useEffect(() => {
    console.log(unreadedMessages);
  }, [unreadedMessages]);

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

  // useEffect(() => {
  //   if (wsMessages) {
  //     setWsMessages((prevMessages) =>
  //       [...prevMessages, ...wsMessages].reverse(),
  //     );
  //   }
  // }, [wsMessages]);

  useEffect(() => {
    setWsMessages([]);
    getChatMessages();
  }, [selectedChat]);

  return (
    <div className={styles.main}>
      {/* sidebar */}
      <div className={styles.main__sidebar}>
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
        </div>
        <input
          className={styles.main__sidebar__search}
          placeholder="Wyszukaj..."
          type="text"
        />
        <div className={styles.main__sidebar__chatList}>
          <p className={styles.main__sidebar__chatList__heading}>Chaty</p>
          <ul className={styles.main__sidebar__chatList__list}>
            {chats.map((chat, index) => (
              <ChatShortcut
                handleReadMessages={async () => getChatMessages()}
                key={index}
                chat={chat}
                participants={chat.participants}
              />
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.main__chat}></div>
      <div className={styles.main__sidebar}></div>
    </div>
    // <div className={styles.chatWindow}>
    //   <ul
    //     className={clsx(styles.chatWindow__chatsList, {
    //       [styles.hiddenMenu]: isHiddenMobileMenu,
    //     })}
    //   >
    //     <button
    //       className={styles.chatWindow__chatsList__closeIcon}
    //       type="button"
    //       onClick={() => {
    //         setIsHiddenMobileMenu(true);
    //       }}
    //     >
    //       X
    //     </button>
    //     {chats.map((chat, index) => (
    //       <ChatShortcut
    //         handleReadMessages={async () => getChatMessages()}
    //         key={index}
    //         chat={chat}
    //         participants={chat.participants}
    //       />
    //     ))}
    //   </ul>

    //   <div className={styles.chatWindow__chat}>
    //     <div className={styles.chatWindow__chat__report}>
    //       {selectedChat && <Contract chatId={selectedChat.id} />}
    //       <Report />
    //     </div>
    //     <div className={styles.chatWindow__chat__heading}>
    //       <h3 className={styles.chatWindow__chat__name}>
    //         {selectedChat?.name}
    //       </h3>
    //       <ul className={styles.chatWindow__chat__participants}>
    //         {selectedChat
    //           ? selectedChat.participants?.map((user, index) => {
    //               return (
    //                 <li
    //                   className={
    //                     styles.chatWindow__chat__participants__participant
    //                   }
    //                   key={index}
    //                 >
    //                   {getUserRole(user)}
    //                   <p
    //                     className={
    //                       styles.chatWindow__chat__participants__participant__name
    //                     }
    //                   >
    //                     {user.full_name ? user.full_name : 'Anonim'}
    //                   </p>
    //                   <p
    //                     className={
    //                       styles.chatWindow__chat__participants__participant__id
    //                     }
    //                   >
    //                     ({user.id})
    //                   </p>
    //                 </li>
    //               );
    //             })
    //           : 'Wybierz czat, aby rozpocząć rozmowę'}
    //       </ul>
    //     </div>

    //     <ul className={styles.chatWindow__chat__messages}>
    //       {!isLoading ? (
    //         wsMessages.length <= 0 && selectedChat ? (
    //           <p>Napisz pierwszą wiadomość na tym chacie!</p>
    //         ) : (
    //           wsMessages.map((message, index) => {
    //             return (
    //               <ChatMessage
    //                 key={index}
    //                 senderIsAuthor={
    //                   message.sender && message.sender.id === user?.id
    //                     ? true
    //                     : message.sender_id === user?.id
    //                 }
    //                 author={message.sender ? message.sender.full_name : ''}
    //                 content={message.content}
    //                 date={message.creation_date}
    //               />
    //             );
    //           })
    //         )
    //       ) : (
    //         <Image
    //           alt="ikona ładowania"
    //           src={LoadingIcon}
    //           width={60}
    //           height={60}
    //         />
    //       )}
    //     </ul>

    //     {user &&
    //     selectedChat?.participants?.some(
    //       (participant) => participant.id === user.id,
    //     ) ? (
    //       <form
    //         onSubmit={(e) => {
    //           e.preventDefault();
    //           selectedChat &&
    //             newMessage &&
    //             sendMessage(selectedChat?.id, newMessage);
    //           setNewMessage('');
    //         }}
    //         className={styles.chatWindow__chat__chatForm}
    //       >
    //         <textarea
    //           onChange={(e) => setNewMessage(e.target.value)}
    //           className={styles.chatWindow__chat__chatForm__input}
    //           placeholder="wiadomość..."
    //           value={newMessage || ''}
    //         />
    //         <button
    //           className={styles.chatWindow__chat__chatForm__send}
    //           type="submit"
    //           value=">"
    //         >
    //           <Image alt="send icon" src={sendIcon} height={36} width={36} />
    //         </button>
    //       </form>
    //     ) : (
    //       selectedChat?.name && (
    //         <p>
    //           Nie możesz wysyłać wiadomosci na tym chacie, nie jesteś członkiem
    //           tego czatu.
    //         </p>
    //       )
    //     )}
    //   </div>
    // </div>
  );
};

export default ChatWindow;
