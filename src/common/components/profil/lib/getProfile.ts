import { User } from '@/contexts/authProvider/Auth.provider';

export interface PublicProfileData {
  avatar_url: string;
  description: string;
  id: number;
  user: User;
}

export const getProfile = async (id: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user-public-profile/${id}`,
    {
      method: 'get',
    },
  );

  const data: PublicProfileData = await res.json();
  return data;
};

export default getProfile;
