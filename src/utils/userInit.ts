import { User } from '@/contexts/authProvider/Auth.provider';

const userInit: User = {
  email: '',
  full_name: '',
  password: '',
  is_active: false,
  user_role: 'user',
};

export default userInit;
