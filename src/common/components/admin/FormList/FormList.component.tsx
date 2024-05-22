'use client';
import { useAdmin } from '@/contexts/adminProvider/Admin.provider';
import styles from './FormList.module.scss';
import { Form, FormStatus, MenteeFormArgs, Pagination } from '@/utils/types';
import { useEffect, useState } from 'react';
import Roles from '@/utils/roles';
import MenteeFormItem from './formItem/MenteeFormItem.component';
import LoadingIcon from '../../../images/static/loading.svg';
import Image from 'next/image';

const FormList = () => {
  const [forms, setForms] = useState<Pagination<Form<MenteeFormArgs>>>();
  const { getForms } = useAdmin();
  const [status, setStatus] = useState(FormStatus.WAITED);
  const [isLoading, setIsLoading] = useState(false);

  const searchForms = async () => {
    setIsLoading(true);
    try {
      const data = await getForms(1, 50, 1, status);
      // todo: fix
      setForms(data as unknown as Pagination<Form<MenteeFormArgs>>);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    searchForms();
  }, [status]);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.wrapper__heading}>
        Formularze o przydzielenie wolontariusza
      </h1>
      <div className={styles.wrapper__filter}>
        <p className={styles.wrapper__filter__heading}>Pokaż:</p>

        <select
          defaultValue={status}
          onChange={(e) => setStatus(e.target.value as FormStatus)}
          className={styles.wrapper__filter__select}
          id="options"
        >
          <option
            className={styles.wrapper__filter__selec__option}
            value={FormStatus.ACCEPTED}
          >
            Zamknięte
          </option>
          <option
            className={styles.wrapper__filter__selec__option}
            value={FormStatus.REJECTED}
          >
            Odrzucone
          </option>
          <option
            className={styles.wrapper__filter__selec__option}
            value={FormStatus.WAITED}
          >
            Oczekujące
          </option>
        </select>
      </div>
      <ul className={styles.wrapper__Formlist}>
        {isLoading ? (
          <Image src={LoadingIcon} alt="Loading icon" width={64} />
        ) : forms && forms.items.length ? (
          forms?.items.map((form) => (
            <MenteeFormItem
              handleReload={searchForms}
              key={form.id}
              form={form}
            />
          ))
        ) : (
          <p>Brak formularzy w tej kategorii</p>
        )}
      </ul>
    </div>
  );
};

export default FormList;
