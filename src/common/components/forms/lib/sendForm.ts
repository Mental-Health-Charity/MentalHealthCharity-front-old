import { getCookiesAuth } from '@/utils/cookies';
import { ApiForm, MenteeFormArgs } from '@/utils/types';

export const sendForm = async (form: ApiForm<any | MenteeFormArgs>) => {
  try {
    const headers = await getCookiesAuth();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/form/`,
      {
        method: 'post',
        headers,
        body: JSON.stringify(form),
      },
    );

    if (!response.ok) {
      throw new Error(
        'Nie udało się wysłać formularza. Kod błędu: ' + response.status,
      );
    }
  } catch (error) {
    console.error('Wystąpił błąd podczas wysyłania formularza:', error);
    throw error;
  }
};
