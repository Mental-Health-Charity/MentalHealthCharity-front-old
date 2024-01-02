'use client';

import { useAuth } from '@/contexts/authProvider/Auth.provider';
import RouteGuard from '@/hooks/RouteGuard';
import Roles from '@/utils/roles';

export default function RecruitmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();

  return (
    <RouteGuard
      hasRequiredPermissions={
        user?.user_role === Roles.admin || user?.user_role === Roles.coordinator
      }
    >
      {children}
    </RouteGuard>
  );
}
