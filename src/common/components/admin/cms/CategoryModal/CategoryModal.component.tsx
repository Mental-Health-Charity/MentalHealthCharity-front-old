import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styles from './CategoryModal.module.scss';
import {
  Article,
  ArticleCategoryList,
  useAdmin,
} from '@/contexts/adminProvider/Admin.provider';
import { FormikErrors } from 'formik';
import Restricted from '@/common/components/common/Restricted/Restricted.component';
import Roles from '@/utils/roles';

interface CategoryModalProps {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => Promise<void | FormikErrors<Article>>;
}

const CategoryModal = ({ setModalOpen, setFieldValue }: CategoryModalProps) => {
  const { getArticleCategory, createArticleCategory } = useAdmin();
  const [categories, setCategories] = useState<ArticleCategoryList>();
  const [newCategoryName, setNewCategoryName] = useState<string>();

  const getCategories = async () => {
    try {
      const articlesCat = await getArticleCategory(1, 100);
      setCategories(articlesCat);
    } catch (error) {
      console.error('Error while getting articles categories', error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const createCategory = async (value: string) => {
    try {
      await createArticleCategory(value);
      await getCategories();
    } catch (error) {
      console.error('Error while creating category!', error);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2 className={styles.modalTitle}>Wybierz kategorię</h2>
        <div className={styles.categoryList}>
          {categories?.items.map((category) => (
            <div key={category.id} className={styles.categoryItem}>
              <button
                className={styles.categoryButton}
                onClick={() => {
                  setFieldValue('article_category_id', category.id);
                  setModalOpen(false);
                }}
              >
                {category.name}
              </button>
              <Restricted
                roles={[Roles.admin, Roles.coordinator, Roles.redactor]}
              >
                <button className={styles.editButton}>Edytuj</button>
              </Restricted>
            </div>
          ))}
        </div>
        <Restricted roles={[Roles.admin, Roles.coordinator, Roles.redactor]}>
          <div className={styles.addCategory}>
            <input
              type="text"
              placeholder="Nowa kategoria"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
            />
            <button
              disabled={!newCategoryName}
              className={styles.addButton}
              onClick={() => newCategoryName && createCategory(newCategoryName)}
            >
              Dodaj nową kategorię
            </button>
          </div>
        </Restricted>
        <button
          className={styles.closeButton}
          onClick={() => setModalOpen(false)}
        >
          Zamknij
        </button>
      </div>
    </div>
  );
};

export default CategoryModal;
