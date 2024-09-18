import { User } from '@/contexts/authProvider/Auth.provider';
import { searchUsers } from '../api';
import { SearchUsersPayload } from '../types';
import { useState } from 'react';
import { failurePopUp } from '@/utils/defaultNotifications';

const useSearchUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const search = async (payload: SearchUsersPayload) => {
    setLoading(true);
    try {
      const data = await searchUsers(payload);
      setUsers(data.items);
    } catch (e) {
      setError(true);
      failurePopUp('Wystąpił problem podczas pobierania użytkowników');
      console.error(e);
    }
  };

  return { users, loading, error, search };
};

export default useSearchUsers;
