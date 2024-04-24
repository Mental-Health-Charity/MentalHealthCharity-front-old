'use client';

import { AdminProvider } from '@/contexts/adminProvider/Admin.provider';
import { useAuth } from '@/contexts/authProvider/Auth.provider';
import RouteGuard from '@/hooks/RouteGuard';
import Roles from '@/utils/roles';
import { CookiesProvider } from 'react-cookie';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();

  return (
    <CookiesProvider>
      <AdminProvider>
        <RouteGuard
          hasRequiredPermissions={
            user?.user_role === Roles.admin ||
            user?.user_role === Roles.coordinator ||
            user?.user_role === Roles.redactor ||
            user?.user_role === Roles.supervisor ||
            user?.user_role === Roles.volunteer
          }
        >
          {children}
        </RouteGuard>
      </AdminProvider>
    </CookiesProvider>
  );
}
