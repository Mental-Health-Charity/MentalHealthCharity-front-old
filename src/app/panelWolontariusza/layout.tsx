'use client';

import AccessDenied from '@/common/components/admin/accessDenied/AccessDenied.component';
import { useAuth } from '@/contexts/authProvider/Auth.provider';
import { ChatProvider } from '@/contexts/chatProvider/Chat.provider';

export default function VolunteerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  return (
    <ChatProvider>
      {user?.user_role === 'volunteer' || user?.user_role === 'admin' ? (
        children
      ) : (
        <AccessDenied minRole={'volunteer'} />
      )}
    </ChatProvider>
  );
}
