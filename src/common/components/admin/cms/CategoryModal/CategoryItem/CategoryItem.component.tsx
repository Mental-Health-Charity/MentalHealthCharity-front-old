import {
  ArticleCategory,
  useAdmin,
} from '@/contexts/adminProvider/Admin.provider';
import Roles from '@/utils/roles';
import styles from '../CategoryModal.module.scss';
import Restricted from '@/common/components/common/Restricted/Restricted.component';
import { useEffect, useState } from 'react';
import { failurePopUp } from '@/utils/defaultNotifications';

interface CategoryItemProps {
  category: ArticleCategory;
  setFieldValue: (field: string, value: any) => void;
  setModalOpen: (value: boolean) => void;
  handleRefresh: () => void;
}

const CategoryItem = ({
  category,
  setFieldValue,
  setModalOpen,
  handleRefresh,
}: CategoryItemProps) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedCategoryName, setEditedCategoryName] = useState<string>(
    category.name,
  );
  const { editArticleCategory, removeArticleCategory } = useAdmin();

  const handleEditCategory = async () => {
    try {
      editArticleCategory(editedCategoryName, category.id);
    } catch (err) {
      console.error(err);
      failurePopUp('Wystąpił błąd podczas edycji kategorii');
    }
    handleRefresh();
  };

  const handleRemoveCategory = async () => {
    try {
      removeArticleCategory(category.id);
    } catch (err) {
      console.error(err);
      failurePopUp('Wystąpił błąd podczas edycji kategorii');
    }
    handleRefresh();
  };

  useEffect(() => {
    setEditedCategoryName(category.name);
  }, [isEditMode]);

  return (
    <div key={category.id} className={styles.categoryItem}>
      {isEditMode ? (
        <input
          className={styles.categoryItem__editInput}
          value={editedCategoryName}
          onChange={(e) => setEditedCategoryName(e.target.value)}
        />
      ) : (
        <button
          className={styles.categoryButton}
          onClick={() => {
            setFieldValue('article_category_id', category.id);
            setModalOpen(false);
          }}
        >
          {category.name}
        </button>
      )}
      <Restricted roles={[Roles.admin, Roles.coordinator, Roles.redactor]}>
        {isEditMode ? (
          <div>
            <button
              onClick={handleEditCategory}
              className={styles.editButton}
              type="button"
            >
              Zapisz
            </button>
            <button
              onClick={() => setIsEditMode(false)}
              className={styles.editButton}
              type="button"
            >
              Anuluj
            </button>
          </div>
        ) : (
          <div>
            <button
              onClick={() => setIsEditMode(true)}
              className={styles.editButton}
              type="button"
            >
              Edytuj
            </button>
            <button
              onClick={() => handleRemoveCategory()}
              className={styles.deleteButton}
              type="button"
            >
              Usuń
            </button>
          </div>
        )}
      </Restricted>
    </div>
  );
};

export default CategoryItem;
