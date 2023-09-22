'use client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ChatModal from '../../chatModal/ChatModal.component';
import { ChatProvider } from '@/contexts/chatProvider/Chat.provider';
import { useAuth } from '@/contexts/authProvider/Auth.provider';

const ModalPortal = () => {
  const auth = useAuth();
  return (
    <>
      {/* {auth.user && (
        <ChatProvider>
          <ChatModal />
        </ChatProvider>
      )} */}
      <ToastContainer />
    </>
  );
};

export default ModalPortal;
