'use client';
import { getChats } from '@/common/components/common/chatWindow/lib/api';
import MenteeForm from '@/common/components/forms/MenteeForm/MenteeForm.component';
import ChatSection from '@/common/components/menteePanel/chatSection/ChatSection.component';
import { useEffect, useState } from 'react';
import MenteeHero from '@/common/components/menteePanel/menteeHero/MenteeHero.component';
import { Chat } from '@/utils/chatTypes';

import FullScreenLoading from '@/common/components/common/fullScreenLoading/FullScreenLoading.component';
import { useAuth } from '@/contexts/authProvider/Auth.provider';
import { useRouter } from 'next/navigation';
import { infoPopUp } from '@/utils/defaultNotifications';

function MenteePanel() {
  const [chats, setChats] = useState<Chat[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
      infoPopUp('Zaloguj się, aby wyświetlić tą podstronę');
    }
  }, []);

  const searchChats = async () => {
    setIsLoading(true);
    try {
      const data = getChats(1, 2);
      setChats((await data).items);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    searchChats();
  }, []);

  return (
    <>
      {isLoading ? (
        <FullScreenLoading />
      ) : (
        <>{!chats || chats.length <= 0 ? <MenteeForm /> : <ChatSection />}</>
      )}
    </>
  );
}

export default MenteePanel;
