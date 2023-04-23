'use client';
import UserEditor from '@/common/components/admin/userEditor/UserEditor.component';
import UserSearch from '@/common/components/admin/userSearch/UserSearch.component';
import UsersList from '@/common/components/admin/usersList/UsersList.component';
import { AdminProvider } from '@/contexts/adminProvider/Admin.provider';

function Admin() {
  return (
    <AdminProvider>
      <UsersList />
      <UserSearch />
      <UserEditor />
    </AdminProvider>
  );
}

export default Admin;
