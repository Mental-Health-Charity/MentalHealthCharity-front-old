import Footer from '@/common/components/common/layout/footer/Footer.component';
import styles from '@/common/styles/_global.module.scss';
import Navbar from '@/common/components/common/layout/navbar/Navbar.component';
import { AuthProvider, User } from '@/contexts/authProvider/Auth.provider';
import { restoreUserSession } from '@/utils/cookies';
import ToastProvider from '@/common/components/common/layout/modalPortal/ModalPortal.component';
import { Metadata } from 'next';
import CookiesBar from '@/common/components/common/CookiesBar/CookiesBar.component';
import Sidebar from '@/common/components/Sidebar/Sidebar.component';

export const metadata: Metadata = {
  metadataBase: new URL('https://fundacjaperyskop.org'),
  alternates: {
    canonical: '/',
    languages: {
      'pl-PL': '/pl-PL',
    },
  },
  openGraph: {
    title: 'Fundacja Peryskop',
    description:
      'Fundacja Peryskop oferuje darmową pomoc psychologiczną, wspierając osoby potrzebujące wsparcia emocjonalnego.',
    url: 'https://nextjs.org',
    siteName: 'Fundacja Peryskop',
    images: '/logoMain.png',
    type: 'website',
    locale: 'pl_PL',
  },
  twitter: {
    site: '@site',
    card: 'summary_large_image',
    images: '/logoMain.png',
    description: 'Fundacja Peryskop - Darmowa Pomoc Psychologiczna.',
  },
  title: 'Fundacja Peryskop',
  creator: 'Jakub Łobos',
  description:
    'Fundacja Peryskop oferuje darmową pomoc psychologiczną, wspierając osoby potrzebujące wsparcia emocjonalnego.',
  keywords:
    'Fundacja Peryskop, pomoc psychologiczna, wsparcie emocjonalne, darmowa pomoc, fundacja charytatywna',
  authors: [{ name: 'Jakub Łobos', url: 'https://github.com/JakubLobos' }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user: User = await restoreUserSession();

  return (
    <html lang="pl">
      <body className={styles.body}>
        <AuthProvider user={user}>
          <ToastProvider>
            <Sidebar />
            <Navbar />
            {children}
            <Footer />
          </ToastProvider>
        </AuthProvider>
        <CookiesBar />
      </body>
    </html>
  );
}
