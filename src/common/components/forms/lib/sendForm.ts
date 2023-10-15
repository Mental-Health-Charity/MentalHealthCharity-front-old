import { getCookiesAuth } from '@/utils/cookies';
import { ApiForm, MenteeFormArgs } from '@/utils/types';

export const sendForm = async (form: ApiForm<MenteeFormArgs>) => {
  const headers = await getCookiesAuth();

  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/form/`, {
    method: 'post',
    headers,
    body: JSON.stringify(form),
  });
};
