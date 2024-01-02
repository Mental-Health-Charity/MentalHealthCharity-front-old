import React from 'react';
import ErrorPage from '@/common/components/common/errorPage/ErrorPage.component';

interface RouteGuardProps {
  children: React.ReactNode;
  hasRequiredPermissions: boolean;
}

const RouteGuard = ({ children, hasRequiredPermissions }: RouteGuardProps) => {
  if (hasRequiredPermissions) {
    return <>{children}</>;
  } else {
    return (
      <ErrorPage content="Strona nie została znaleziona" errorCode={404} />
    );
  }
};

export default RouteGuard;
