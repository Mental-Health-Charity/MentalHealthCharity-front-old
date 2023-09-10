'use client';
import UserProfile from '@/common/components/profil/UserProfile.component';
import { usePathname, useRouter } from 'next/navigation';
import Router from 'next/router';

const Profil = () => {
  const id = usePathname();
  const numericId = id ? parseInt(id.split('/').pop(), 10) : undefined;

  console.log(numericId);

  return numericId !== undefined ? (
    <UserProfile id={numericId} />
  ) : (
    <p>loading...</p>
  );
};

export default Profil;
