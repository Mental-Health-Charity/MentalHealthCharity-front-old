'use client';

import AccessDenied from '@/common/components/admin/accessDenied/AccessDenied.component';
import { AdminProvider } from '@/contexts/adminProvider/Admin.provider';
import { useAuth } from '@/contexts/authProvider/Auth.provider';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  return (
    <AdminProvider>
      {user?.user_role === 'admin' ? (
        children
      ) : (
        <AccessDenied minRole={'admin'} />
      )}
    </AdminProvider>
  );
}
