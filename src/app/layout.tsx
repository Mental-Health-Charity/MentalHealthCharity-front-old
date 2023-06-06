import Footer from '@/common/components/common/layout/footer/Footer.component';
import styles from '../common/styles/_global.module.scss';
import Navbar from '@/common/components/common/layout/navbar/Navbar.component';
import { AuthProvider, User } from '@/contexts/authProvider/Auth.provider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCookies, isCookieExist } from '@/utils/cookies';
import { restoreUserSession } from '@/utils/getLocalStorageAuthToken';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let user: User | null = null;
  user = await restoreUserSession();

  return (
    <html lang="pl">
      <head />
      <body className={styles.body}>
        <AuthProvider user={user}>
          <Navbar />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
