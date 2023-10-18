import { Form, MenteeFormArgs } from '@/utils/types';
import styles from './MenteeFormItem.module.scss';
import { formStatusDescription } from './lib/utils';
import { useAdmin } from '@/contexts/adminProvider/Admin.provider';
import { failurePopUp, successPopUp } from '@/utils/defaultNotifications';
import { useState } from 'react';

import { FormStatus } from '@/utils/types';

interface FormItemProps {
  form: Form<MenteeFormArgs>;
  handleReload: () => Promise<void>;
}

const MenteeFormItem = ({ form, handleReload }: FormItemProps) => {
  const [status, setStatus] = useState(form.current_step);
  const { updateForm, editUser, rejectForm } = useAdmin();

  const getFormStatus = () => {
    switch (form.current_step) {
      case 1:
        return formStatusDescription.first;
      case 2:
        return formStatusDescription.secound;
    }
  };

  const rejectFormById = async () => {
    try {
      await rejectForm(form.id);
      successPopUp('Pomyślnie odrzucono.');
    } catch (error) {
      failurePopUp(
        'Błąd podczas odrzucania formularza. Odśwież aplikację i spróbuj jeszcze raz.',
      );
      console.error(error);
    }
  };

  const updateFormById = async () => {
    try {
      const data = await updateForm(form.id);
      setStatus(data.current_step);
      successPopUp('Pomyślnie nadano poziom akceptacji na ');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <li className={styles.formItem}>
      <div className={styles.formItem__step}>
        <p>
          {status}/{form.form_type.max_step} <>{getFormStatus()}</>
        </p>
        <p>{form.creation_date}</p>
      </div>
      <div className={styles.formItem__createdBy}>
        <p>{form.created_by.full_name}</p>
        <p>{form.created_by.email}</p>
        <p>{form.created_by.id}</p>
      </div>
      <div className={styles.formItem__fields}>
        <div className={styles.formItem__fields__field}>
          <p>Preferuje kontakt:</p>
          <p>
            {form.fields.contacts.map((contact, index) => (
              <span key={index}>
                {contact.name}
                {index < form.fields.contacts.length - 1 ? ', ' : ''}
              </span>
            ))}
          </p>
        </div>
        <div className={styles.formItem__fields__field}>
          <p>Wiek</p>
          <p>{form.fields.age}</p>
        </div>
        <div className={styles.formItem__fields__field}>
          <p>Skąd się o nas dowiedział</p>
          <p>{form.fields.source}</p>
        </div>
        <div className={styles.formItem__fields__field}>
          <p>Motyw:</p>
          <p>
            {form.fields.themes.map((theme, index) => (
              <span key={theme.name + index}>
                {theme.name}
                {index < form.fields.contacts.length - 1 ? ', ' : ''}
              </span>
            ))}
          </p>
        </div>
        <div className={styles.formItem__fields__field}>
          <p>Opis</p>
          <p>{form.fields.description}</p>
        </div>
      </div>
      <div className={styles.formItem__controls}>
        {status <= 1 && (
          <button
            onClick={() => updateFormById()}
            className={styles.formItem__controls__accept}
          >
            Zamknij jako rozwiązane
          </button>
        )}
        {form.form_status === FormStatus.WAITED && (
          <button
            onClick={() => rejectFormById()}
            className={styles.formItem__controls__reject}
          >
            Odrzuć
          </button>
        )}
      </div>
    </li>
  );
};

export default MenteeFormItem;
