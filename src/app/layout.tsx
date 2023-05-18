'use client';
import Footer from '@/common/components/common/layout/footer/Footer.component';
import styles from '../common/styles/_global.module.scss';
import Navbar from '@/common/components/common/layout/navbar/Navbar.component';
import { AuthProvider } from '@/contexts/authProvider/Auth.provider';
import { ChatProvider } from '@/contexts/chatProvider/Chat.provider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <head />
      <body className={styles.body}>
        <AuthProvider>
          <Navbar />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
