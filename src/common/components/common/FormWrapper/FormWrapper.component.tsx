import { useAuth } from '@/contexts/authProvider/Auth.provider';
import { useEffect, useState, ReactNode } from 'react';
import Loader from '../Loader/Loader.component';

interface FormWrapperProps {
  children: ReactNode;
}

const FormWrapper = ({ children }: FormWrapperProps) => {
  const { canUserSendForm } = useAuth();
  const [canSendForm, setCanSendForm] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleCanUserSendForm = async () => {
    setIsLoading(true);
    try {
      const data = await canUserSendForm();
      setCanSendForm(data);
    } catch (err) {
      console.error('Error while checking if user can send form', err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    handleCanUserSendForm();
  }, []);

  if (isLoading) return <Loader />;

  if (canSendForm) {
    return <>{children}</>;
  } else {
    return (
      <div>
        <h1>Status formularza</h1>
        <p>Wysłałeś pomyślnie już swój formularz!</p>
      </div>
    );
  }
};

export default FormWrapper;
