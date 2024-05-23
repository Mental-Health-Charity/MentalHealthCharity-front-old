import { Status } from '@/contexts/adminProvider/Admin.provider';

const translateArticleStatus = (status: Status) => {
  switch (status) {
    case Status.CORRECTED:
      return 'Edytowany';
    case Status.DELETED:
      return 'Usunięty';
    case Status.DRAFT:
      return 'Szkic';
    case Status.PUBLISHED:
      return 'Opublikowane';
    case Status.REJECT:
      return 'Odrzucone';
    case Status.SENT:
      return 'Oczekujące';
    default:
      return 'Nieznana kategoria';
  }
};

export default translateArticleStatus;
