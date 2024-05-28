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
import CategoryItem from './CategoryItem/CategoryItem.component';
import Loader from '@/common/components/common/Loader/Loader.component';

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
  const [isLoading, setIsLoading] = useState(false);

  const getCategories = async () => {
    setIsLoading(true);
    try {
      const articlesCat = await getArticleCategory(1, 100);
      setCategories(articlesCat);
    } catch (error) {
      console.error('Error while getting articles categories', error);
    }
    setIsLoading(false);
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
          {isLoading ? (
            <Loader />
          ) : (
            categories?.items.map((category) => (
              <CategoryItem
                handleRefresh={getCategories}
                category={category}
                setFieldValue={setFieldValue}
                setModalOpen={setModalOpen}
                key={category.id}
              />
            ))
          )}
        </div>
        <Restricted roles={[Roles.admin, Roles.coordinator, Roles.redactor]}>
          <div className={styles.addCategory}>
            <input
              type="text"
              placeholder="Nowa kategoria"
              maxLength={12}
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
            />

            <button
              disabled={!newCategoryName}
              className={styles.addButton}
              type="button"
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
