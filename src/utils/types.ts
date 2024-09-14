import { User } from '@/contexts/authProvider/Auth.provider';

export interface MenteeFormArgs {
  age: string;
  contacts: Array<{
    name: string;
    value: string;
  }>;
  description: string;
  phone?: number;
  tos?: boolean;
  source: string;
  themes: Array<{ name: string; value: string }>;
}

export interface VolunteerForm {
  source: string;
  contacts: Array<{
    name: string;
    value: string;
  }>;
  description: string;
  age: number;
  phone: number;
  education: string;
  did_help: string;
  themes: string[];
  reason: string;
  id: number;
  current_step: number;
  form_status: string;
  form_type: string;
  created_by: User;
  creation_date: string;
}

export interface ApiForm<Fields> {
  fields: Fields;
  form_type_id: number;
}

export enum FormStatus {
  WAITED = 'WAITED',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

export interface Form<T> {
  fields: T;
  id: number;
  current_step: number;
  form_status: FormStatus;
  form_type: {
    form_type: string;
    max_step: number;
    id: number;
    is_active: true;
  };
  created_by: User;
  creation_date: string;
}

export interface Pagination<T> {
  items: Array<T>;
  total: number;
  page: number;
  size: number;
  pages: number;
}

export interface CreateChatPayload {
  name: string;
  flags: Record<string, string>;
}
