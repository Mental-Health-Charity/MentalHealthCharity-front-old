import ErrorPage from '@/common/components/common/errorPage/ErrorPage.component';

function PageNotFound() {
  return <ErrorPage errorCode={404} content="Strona nie została znaleziona" />;
}

export default PageNotFound;
