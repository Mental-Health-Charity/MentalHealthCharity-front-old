import { EditUser, User } from '@/contexts/authProvider/Auth.provider';
import Roles from './roles';

const userInit: EditUser = {
  full_name: '',
  is_active: false,
  user_role: Roles.user,
};

export default userInit;
