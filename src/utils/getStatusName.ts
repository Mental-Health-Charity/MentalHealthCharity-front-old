import { Status } from '@/contexts/adminProvider/Admin.provider';

const getStatusName = (status: Status) => {
  switch (status) {
    case Status.PUBLISHED:
      return 'Opublikowany';
    case Status.DRAFT:
      return 'Szkic';
    case Status.REJECT:
      return 'Odrzucony';
    case Status.CORRECTED:
      return 'Edytowany';
    case Status.DELETED:
      return 'Usunięty';
    case Status.SENT:
      return 'Wysłany';
    default:
      return 'Nieznany';
  }
};

export default getStatusName;
