export enum Errors {
  USER_ARLEADY_EXISTS = 'The user with this username already exists in the system',
  INCORRECT_EMAIL_OR_PASSWORD = 'Incorrect email or password',
  NOT_ENOUGH_PRIVILEGES = 'Not enough privileges',
  UNKNOWN = 'Unknown error',
}

export const ErrorsToMessage = {
  [Errors.USER_ARLEADY_EXISTS]: 'Ten adres email jest już w użyciu',
  [Errors.INCORRECT_EMAIL_OR_PASSWORD]: 'Nieprawidłowy email lub hasło',
  [Errors.NOT_ENOUGH_PRIVILEGES]: 'Brak uprawnień do wykonania tej operacji',
  [Errors.UNKNOWN]: 'Wystąpił nieznany błąd',
};

export function getMessageForError(errorKey: string | undefined): string {
  return ErrorsToMessage[errorKey as Errors] || ErrorsToMessage[Errors.UNKNOWN];
}
