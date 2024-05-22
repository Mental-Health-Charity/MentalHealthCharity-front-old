import Roles from './roles';

const translateRole = (role: Roles | undefined) => {
  switch (role) {
    case Roles.admin:
      return 'Administrator';
    case Roles.coordinator:
      return 'Koordynator';
    case Roles.redactor:
      return 'Redaktor';
    case Roles.supervisor:
      return 'Supervisor';
    case Roles.volunteer:
      return 'Wolontariusz';
    case Roles.user:
      return 'Użytkownik';
    default:
      return 'Nieznana rola';
  }
};

export default translateRole;
