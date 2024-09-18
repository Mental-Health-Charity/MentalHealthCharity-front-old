import { useEffect, useState } from 'react';
import useSearchUsers from '../hooks/useSearchUsers';
import { useDebounce } from 'use-debounce';
import './SearchUser.module.scss';
import { User } from '@/contexts/authProvider/Auth.provider';
import { SearchUsersPayload } from '../types';
import { useAdmin } from '@/contexts/adminProvider/Admin.provider';

interface Props {
  onChange: (user: User | null) => void;
}

const SearchUser = ({ onChange }: Props) => {
  const { error, loading, users } = useSearchUsers();
  const [query, setQuery] = useState('');
  const [debounceValue] = useDebounce(query, 500);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const { searchUsers } = useAdmin();

  const search = async (payload: SearchUsersPayload) => {
    try {
      const data = await searchUsers(payload);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (debounceValue.trim()) {
      search({ searchQuery: debounceValue });
    } else {
      setShowDropdown(false);
    }
  }, [debounceValue]);

  useEffect(() => {
    setShowDropdown(users && users.length > 0);
  }, [users]);

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setQuery(user.full_name);
    setShowDropdown(false);
    onChange(user);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (!e.target.value) {
      setSelectedUser(null);
      setShowDropdown(false);
      onChange(null);
    }
  };

  const handleInputFocus = () => {
    if (query) setShowDropdown(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => setShowDropdown(false), 100);
  };

  return (
    <div className="search-user">
      <div className="search-user__input-wrapper">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder="Search users..."
        />
        {selectedUser && (
          <div className="search-user__selected-user">
            <img src={selectedUser.avatar_url} alt={selectedUser.full_name} />
            <span>{selectedUser.full_name}</span>
            <button
              onClick={() => {
                setSelectedUser(null);
                setQuery('');
                onChange(null);
              }}
            >
              ×
            </button>
          </div>
        )}
      </div>
      {loading && <div className="search-user__loading">Loading...</div>}
      {error && <div className="search-user__error">Error fetching users</div>}
      {showDropdown && !loading && !error && (
        <ul className="search-user__dropdown">
          {users.map((user) => (
            <li
              key={user.id}
              className="search-user__dropdown-item"
              onClick={() => handleUserClick(user)}
            >
              <img
                src={user.avatar_url}
                alt={user.full_name}
                className="search-user__dropdown-avatar"
              />
              <div className="search-user__dropdown-info">
                <p className="search-user__dropdown-name">{user.full_name}</p>
                <p className="search-user__dropdown-email">{user.email}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchUser;
