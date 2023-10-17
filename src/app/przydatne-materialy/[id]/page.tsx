'use client';
import FullScreenLoading from '@/common/components/common/fullScreenLoading/FullScreenLoading.component';
import ArticlePage from '@/common/components/przydatneMaterialy/ArticlePage/ArticlePage.component';
import { usePathname, useRouter } from 'next/navigation';

const Profil = () => {
  const id = usePathname();
  const numericId = id ? parseInt(id.split('/').pop() || '', 10) : undefined;

  console.log(numericId);

  return numericId !== undefined ? (
    <ArticlePage id={numericId} />
  ) : (
    <FullScreenLoading />
  );
};

export default Profil;
