'use client';
import UserProfile from '@/common/components/profil/UserProfile.component';
import { usePathname } from 'next/navigation';

const Profil = () => {
  const id = usePathname();
  const numericId = id ? parseInt(id.split('/').pop() || '', 10) : undefined;

  return numericId !== undefined ? (
    <UserProfile id={numericId} />
  ) : (
    <p>loading...</p>
  );
};

export default Profil;
