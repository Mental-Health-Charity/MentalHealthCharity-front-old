import { createContext, useContext, SetStateAction, Dispatch } from 'react';
import { EditUser, User } from '../authProvider/Auth.provider';
import { ChatData } from '@/utils/chatTypes';
import { getCookiesAuth } from '@/utils/cookies';
import Roles from '@/utils/roles';
import { Form, FormStatus, Pagination, VolunteerForm } from '@/utils/types';
import { failurePopUp, successPopUp } from '@/utils/defaultNotifications';

interface AdminContextType {
  getUsers: (limit: { from: number; to: number }) => Promise<Pagination<User>>;
  getUserById: (id: number) => Promise<User>;
  editUser: (id: number, userData: EditUser) => Promise<User>;
  getChats: (page: number, size: number) => Promise<ChatData>;
  createChat: (name: string) => Promise<void>;
  addParticipant: (chatId: number, userId: number) => Promise<void>;
  removeParticipant: (chatId: number, userId: number) => Promise<void>;
  createArticle: (article: Article, id?: number) => Promise<void>;
  getArticleCategory: (
    page: number,
    size: number,
  ) => Promise<ArticleCategoryList>;
  createArticleCategory: (name: string) => Promise<void>;
  manageArticle: (id: number, articleStatus: ArticleStatus) => Promise<Article>;
  getForms: (
    page: number,
    size: number,
    formType: number,
    form_status: FormStatus,
  ) => Promise<Pagination<Form<VolunteerForm>>>;
  updateForm: (formId: number) => Promise<Form<VolunteerForm>>;
  rejectForm: (formId: number) => Promise<void>;
  removeArticleCategory: (id: number) => Promise<void>;
  editArticleCategory: (name: string, id: number) => Promise<void>;
}

export interface Article {
  title: string;
  content: string;
  banner_url: string;
  video_url: string;
  article_category_id?: number;
  article_category?: {
    id: number;
  };
  required_role?: 'ANYONE' | Roles.admin | Roles.volunteer;
}

export interface ArticleCategory {
  name: string;
  id: number;
  is_active: boolean;
}

export interface ArticleCategoryList {
  items: Array<ArticleCategory>;
  total: number;
  page: number;
  size: number;
  pages: number;
}

export enum Status {
  REJECT = 'REJECTED',
  CORRECTED = 'CORRECTED',
  DRAFT = 'DRAFT',
  DELETED = 'DELETED',
  PUBLISHED = 'PUBLISHED',
  SENT = 'SENT',
}

export interface ArticleStatus {
  status: Status;
  reject_message: string;
}

const AdminContext = createContext<AdminContextType>({} as AdminContextType);

const useProvideAdmin = () => {
  const getUsers = async (limit: { from: number; to: number }) => {
    const headers = await getCookiesAuth();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/users/?skip=${limit.from}&limit=${limit.to}`,
      {
        method: 'get',
        headers,
      },
    );
    const data = await res.json();
    return data as Pagination<User>;
  };

  const getUserById = async (id: number) => {
    const headers = await getCookiesAuth();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/users/${id}`,
      {
        method: 'get',
        headers,
      },
    );
    const data = await res.json();
    return data as User;
  };

  const editUser = async (id: number, userData: EditUser) => {
    const headers = await getCookiesAuth();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/users/${id}/edit-as-admin`,
      {
        method: 'put',
        headers,
        body: JSON.stringify(userData),
      },
    );
    const data = await res.json();
    return data as User;
  };

  const manageArticle = async (id: number, articleStatus: ArticleStatus) => {
    const headers = await getCookiesAuth();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/article/${id}/change-status`,
      {
        method: 'put',
        headers,
        body: JSON.stringify(articleStatus),
      },
    );
    const data = await res.json();
    return data as Article;
  };

  const getChats = async (page: number, size: number) => {
    const headers = await getCookiesAuth();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/chat/?page=${page}&size=${size}`,
      {
        method: 'get',
        headers,
      },
    );
    const data = await res.json();
    return data as ChatData;
  };

  const getArticleCategory = async (page: number, size: number) => {
    const headers = await getCookiesAuth();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/article-category/?page=${page}&size=${size}`,
      {
        method: 'get',
        headers,
      },
    );
    const data = await res.json();
    return data as ArticleCategoryList;
  };

  const getForms = async (
    page: number,
    size: number,
    formType: number,
    form_status: FormStatus,
  ) => {
    const headers = await getCookiesAuth();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/form/?page=${page}&size=${size}&form_type_id=${formType}&form_status=${form_status}`,
      {
        method: 'get',
        headers,
      },
    );
    const data = await res.json();
    return data as Pagination<Form<VolunteerForm>>;
  };

  const updateForm = async (formId: number) => {
    const headers = await getCookiesAuth();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/form/${formId}/accept`,
      {
        method: 'PUT',
        headers,
      },
    );
    const data = await res.json();
    return data as Form<VolunteerForm>;
  };

  const rejectForm = async (formId: number) => {
    const headers = await getCookiesAuth();

    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/form/${formId}`, {
      method: 'DELETE',
      headers,
    });
  };

  const createChat = async (name: string) => {
    const headers = await getCookiesAuth();

    const body = {
      name: name,
    };

    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/chat/`, {
      method: 'post',
      headers,
      body: JSON.stringify(body),
    });
  };

  const createArticleCategory = async (name: string) => {
    const headers = await getCookiesAuth();

    const body = {
      name: name,
    };

    await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/article-category/`,
      {
        method: 'post',
        headers,
        body: JSON.stringify(body),
      },
    );
  };

  const removeArticleCategory = async (id: number) => {
    try {
      const headers = await getCookiesAuth();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/article-category/${id}`,
        {
          method: 'delete',
          headers,
        },
      );

      if (!res.ok) {
        throw new Error('Error while deleting category');
      } else {
        successPopUp('Kategoria została usunięta');
      }
    } catch (error) {
      failurePopUp('Błąd podczas usuwania kategorii');
      console.error(error);
    }
  };

  const editArticleCategory = async (name: string, id: number) => {
    try {
      const headers = await getCookiesAuth();

      const body = {
        name: name,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/article-category/${id}`,
        {
          method: 'put',
          headers,
          body: JSON.stringify(body),
        },
      );

      if (!res.ok) {
        failurePopUp('Błąd podczas edycji kategorii');
        throw new Error('Error while deleting category');
      } else {
        successPopUp('Kategoria została zaktualizowana');
      }

      const data = await res.json();
    } catch (error) {
      failurePopUp('Błąd podczas edycji kategorii');
      console.error(error);
    }
  };

  const addParticipant = async (chatId: number, userId: number) => {
    const headers = await getCookiesAuth();

    await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/chat/${chatId}/participant/${userId}}`,
      {
        method: 'post',
        headers,
      },
    );
  };

  const removeParticipant = async (chatId: number, userId: number) => {
    const headers = await getCookiesAuth();

    await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/chat/${chatId}/corrector/${chatId}?participant_id=${userId}`,
      {
        method: 'delete',
        headers,
      },
    );
  };

  const createArticle = async (article: Article, id?: number) => {
    const headers = await getCookiesAuth();

    await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/article/${id ? id : ''}`,
      {
        method: id ? 'PUT' : 'POST',
        headers,
        body: JSON.stringify(article),
      },
    );
  };

  return {
    getUsers,
    getUserById,
    manageArticle,
    editUser,
    getChats,
    createChat,
    addParticipant,
    removeParticipant,
    removeArticleCategory,
    editArticleCategory,
    createArticle,
    getArticleCategory,
    createArticleCategory,
    getForms,
    updateForm,
    rejectForm,
  };
};

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const admin = useProvideAdmin();

  return (
    <AdminContext.Provider value={admin}>{children}</AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
