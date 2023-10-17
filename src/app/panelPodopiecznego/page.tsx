'use client';
import { getChats } from '@/common/components/common/chatWindow/lib/api';
import MenteeForm from '@/common/components/forms/MenteeForm/MenteeForm.component';
import ChatSection from '@/common/components/menteePanel/chatSection/ChatSection.component';
import { useEffect, useState } from 'react';
import MenteeHero from '@/common/components/menteePanel/menteeHero/MenteeHero.component';
import { Chat } from '@/utils/chatTypes';

import FullScreenLoading from '@/common/components/common/fullScreenLoading/FullScreenLoading.component';

function MenteePanel() {
  const [chats, setChats] = useState<Chat[] | null>(null);

  const searchChats = async () => {
    try {
      const data = getChats(1, 2);
      setChats((await data).items);
      console.log('chats', chats);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    searchChats();
  }, []);

  return (
    <>
      {/* 
      <MenteeHero />
      <MenteeForm />
      <ChatSection />
      */}
      {!chats ? (
        <FullScreenLoading />
      ) : (
        <>{chats.length > 0 ? <ChatSection /> : <MenteeForm />}</>
      )}
    </>
  );
}

export default MenteePanel;
