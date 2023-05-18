export const getLocalStorageAuthToken = (
  headers: URLSearchParams | Headers,
) => {
  headers.append(
    'Authorization',
    `${localStorage.getItem('jwtTokenType')} ${localStorage.getItem(
      'jwtToken',
    )}`,
  );
};
