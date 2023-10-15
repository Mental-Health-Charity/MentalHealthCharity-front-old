import ErrorPage from '@/common/components/common/errorPage/ErrorPage.component';

function ServerSideError() {
  return (
    <ErrorPage
      content="Wystąpił błąd podczas renderowania podstrony od strony serwera. Nie dostarczono pakietów."
      errorCode={500}
    />
  );
}

export default ServerSideError;
