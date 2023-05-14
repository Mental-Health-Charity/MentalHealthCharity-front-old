'use client';
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
        <h1 style={{ margin: '25%' }}>Odmowa dostępu</h1>
      )}
    </AdminProvider>
  );
}
