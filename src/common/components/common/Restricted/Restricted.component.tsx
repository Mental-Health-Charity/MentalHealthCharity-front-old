import { useAuth } from '@/contexts/authProvider/Auth.provider';

interface RestrictedProps {
  children: React.ReactNode;
  roles: string[];
}

const Restricted = ({ children, roles }: RestrictedProps) => {
  const { user } = useAuth();

  if (user && roles.includes(user.user_role)) {
    return <>{children}</>;
  } else {
    return null;
  }
};

export default Restricted;
