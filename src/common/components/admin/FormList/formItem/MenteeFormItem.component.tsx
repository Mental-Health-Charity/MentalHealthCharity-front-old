import { Form, MenteeFormArgs } from '@/utils/types';
import styles from './MenteeFormItem.module.scss';
import { formStatusDescription } from './lib/utils';
import { useAdmin } from '@/contexts/adminProvider/Admin.provider';
import { failurePopUp, successPopUp } from '@/utils/defaultNotifications';
import { useState } from 'react';
import LoadingIcon from '../../../../images/static/loading.svg';

import { FormStatus } from '@/utils/types';
import Image from 'next/image';

interface FormItemProps {
  form: Form<MenteeFormArgs>;
  handleReload: () => Promise<void>;
}

const MenteeFormItem = ({ form, handleReload }: FormItemProps) => {
  const [status, setStatus] = useState(form.current_step);
  const { updateForm, editUser, rejectForm } = useAdmin();
  const [isRejectLoading, setIsRejectLoading] = useState(false);
  const [isAcceptLoading, setIsAcceptLoading] = useState(false);

  const getFormStatus = () => {
    switch (form.current_step) {
      case 1:
        return formStatusDescription.first;
      case 2:
        return formStatusDescription.secound;
    }
  };

  const rejectFormById = async () => {
    setIsRejectLoading(true);
    try {
      await rejectForm(form.id);
      successPopUp('Pomyślnie odrzucono.');
    } catch (error) {
      failurePopUp(
        'Błąd podczas odrzucania formularza. Odśwież aplikację i spróbuj jeszcze raz.',
      );
      console.error(error);
    }
    setIsRejectLoading(false);
  };

  const updateFormById = async () => {
    setIsAcceptLoading(true);
    try {
      const data = await updateForm(form.id);
      setStatus(data.current_step);
      successPopUp('Pomyślnie nadano poziom akceptacji na ');
    } catch (error) {
      console.error(error);
    }
    setIsAcceptLoading(false);
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
          <p>Numer telefonu:</p>
          <p>{form.fields.phone || 'Nie podano'}</p>
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
          <p>Rodzaj problemu:</p>
          <ul>
            {form.fields.themes.map((theme) => (
              <li key={theme.name}>{theme.name}</li>
            ))}
          </ul>
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
            <span>Zamknij jako rozwiązane</span>
            {isAcceptLoading && (
              <Image alt="loading icon" src={LoadingIcon} width={32} />
            )}
          </button>
        )}
        {form.form_status === FormStatus.WAITED && (
          <button
            onClick={() => rejectFormById()}
            className={styles.formItem__controls__reject}
          >
            <span>Odrzuć</span>
            {isRejectLoading && (
              <Image alt="loading icon" src={LoadingIcon} width={32} />
            )}
          </button>
        )}
      </div>
    </li>
  );
};

export default MenteeFormItem;
