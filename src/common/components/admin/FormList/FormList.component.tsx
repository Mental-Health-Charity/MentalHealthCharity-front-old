'use client';
import { useAdmin } from '@/contexts/adminProvider/Admin.provider';
import styles from './FormList.module.scss';
import { Form, FormStatus, MenteeFormArgs, Pagination } from '@/utils/types';
import { useEffect, useState } from 'react';
import Roles from '@/utils/roles';
import MenteeFormItem from './formItem/MenteeFormItem.component';

const FormList = () => {
  const [forms, setForms] = useState<Pagination<Form<MenteeFormArgs>>>();
  const { getForms, updateForm } = useAdmin();
  const [status, setStatus] = useState(FormStatus.WAITED);

  const searchForms = async () => {
    try {
      const data = await getForms(1, 50, 1, status);
      // todo: fix
      setForms(data as unknown as Pagination<Form<MenteeFormArgs>>);
    } catch (error) {
      console.error(error);
    }
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
        {forms?.items
          .filter((elem) => elem.created_by.user_role !== Roles.volunteer)
          .map((form) => (
            <MenteeFormItem
              handleReload={searchForms}
              key={form.id}
              form={form}
            />
          ))}
      </ul>
    </div>
  );
};

export default FormList;
