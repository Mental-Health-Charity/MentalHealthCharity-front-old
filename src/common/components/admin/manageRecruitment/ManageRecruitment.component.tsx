'use client';
import { useAdmin } from '@/contexts/adminProvider/Admin.provider';
import styles from './ManageRecruitment.module.scss';
import { Form, FormStatus, Pagination, VolunteerForm } from '@/utils/types';
import { useEffect, useState } from 'react';
import Roles from '@/utils/roles';
import VolunteerFormItem from './formItem/VolunteerFormItem.component';
import LoadingIcon from '../../../images/static/loading.svg';
import Image from 'next/image';

const ManageRecruitment = () => {
  const [forms, setForms] = useState<Pagination<Form<VolunteerForm>>>();
  const { getForms } = useAdmin();
  const [status, setStatus] = useState(FormStatus.ACCEPTED);
  const [loading, setLoading] = useState(true);

  const searchForms = async () => {
    setLoading(true);
    try {
      const data = await getForms(1, 50, 2, status);
      setForms(data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    searchForms();
  }, [status]);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.wrapper__heading}>Formularze Rekrutacji</h1>
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
            Zaakceptowane
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
        {loading ? (
          <Image
            src={LoadingIcon}
            width={60}
            height={60}
            alt="ikona ładowania"
          />
        ) : (
          forms?.items
            .filter((elem) => elem.created_by.user_role !== Roles.volunteer)
            .map((form) => (
              <VolunteerFormItem
                handleReload={searchForms}
                key={form.id}
                form={form}
              />
            ))
        )}
      </ul>
    </div>
  );
};

export default ManageRecruitment;
