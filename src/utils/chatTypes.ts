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

export interface Message {
  content: string;
  id: number;
  sender: User;
  creation_date: string;
}

export interface Messages {
  items: Message[];
  total: number;
  page: number;
  size: number;
  pages: number;
}
