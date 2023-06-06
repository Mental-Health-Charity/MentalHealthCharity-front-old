'use server';

import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';

export const createCookies = async (
  key: string,
  value: string,
  options: Partial<ResponseCookie>,
) => {
  cookies().set(key, value, options);
};

export const getCookies = (key: string) => {
  return cookies().get(key)?.value;
};

export const isCookieExist = (key: string) => {
  return cookies().get(key)?.value !== undefined;
};

export const expireCookie = (key: string) => {
  return cookies().set(key, '', { maxAge: 0 });
};

// export const deleteCookie = (key: string) => {
//   return cookies().set(key, '');
// };
