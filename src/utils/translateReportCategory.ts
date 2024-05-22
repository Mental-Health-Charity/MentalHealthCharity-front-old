const translateReportCategory = (category: string) => {
  switch (category) {
    case 'CHAT_ABUSE':
      return 'Nadużycie czatu';
    case 'BUG':
      return 'Błąd';
    case 'CHANGE_VOLUNTEER':
      return 'Zmiana wolontariusza';
    default:
      return 'Nieznana kategoria';
  }
};

export default translateReportCategory;
