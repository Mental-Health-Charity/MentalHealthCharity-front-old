'use client';

import React from 'react';
import { useAuth } from '@/contexts/authProvider/Auth.provider';
import { ChatProvider } from '@/contexts/chatProvider/Chat.provider';

export default function VolunteerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();

  return <ChatProvider>{children}</ChatProvider>;
}
