import { User } from '@/contexts/authProvider/Auth.provider';

export interface ChatData {
  items: Chat[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

export interface Chat {
  id: number;
  name: string;
  creation_date: string;
  is_active: boolean;
  participants?: User[];
}
