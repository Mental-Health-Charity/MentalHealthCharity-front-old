'use client';
import CMS from '@/common/components/admin/cms/CMS.component';
import { usePathname } from 'next/navigation';

function CMSpage() {
  const id = usePathname();
  const numericId = id ? parseInt(id.split('/').pop(), 10) : undefined;
  console.log('edit', numericId);
  return <CMS id={numericId} />;
}

export default CMSpage;
