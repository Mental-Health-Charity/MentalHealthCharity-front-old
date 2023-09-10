import { EditUser, User } from '@/contexts/authProvider/Auth.provider';
import styles from './MergeUserModal.module.scss';
import { Dispatch, SetStateAction } from 'react';
import { useAdmin } from '@/contexts/adminProvider/Admin.provider';
import { failurePopUp, successPopUp } from '@/utils/defaultNotifications';

interface MergeUserModalProps {
  targetUserData: User | undefined;
  targetEditedUserData: EditUser;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
}

const MergeUserModal = ({
  targetEditedUserData,
  targetUserData,
  setIsModalVisible,
}: MergeUserModalProps) => {
  const { editUser } = useAdmin();

  const handleUserMerge = () => {
    if (targetEditedUserData && targetUserData && targetUserData.id) {
      try {
        const editUserData = {
          full_name: targetEditedUserData.full_name,
          user_role: targetEditedUserData.user_role,
          is_active: true,
        };
        editUser(targetUserData.id, editUserData);
        successPopUp('Wysłano zmiany dla użytkownika.');
        setIsModalVisible(false);
      } catch (error) {
        console.log('ERROR while trying to edit user data ', error);
        failurePopUp(
          'Wystąpił nieznany błąd podczas operacji. Sprawdź konsolę po więcej informacji, lub skontaktuj się z odpowiednim działem.',
        );
      }
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modal__content}>
        <h2 className={styles.modal__content__heading}>
          Porównaj zmiany i zatwierdź
        </h2>
        <div className={styles.modal__content__compare}>
          <ul className={styles.modal__content__compare__before}>
            <li>Stan poprzedni:</li>
            <li>Imie: {targetUserData?.full_name}</li>
            <li>Uprawnienia: {targetUserData?.user_role}</li>
          </ul>
          <ul className={styles.modal__content__compare__after}>
            <li>Stan edytowany:</li>
            <li>Imie: {targetEditedUserData?.full_name}</li>
            <li>Uprawnienia: {targetEditedUserData?.user_role}</li>
          </ul>
        </div>
        <button
          onClick={() => handleUserMerge()}
          className={styles.modal__content__send}
        >
          Potwierdź i wyślij zmiany
        </button>
        <button
          onClick={() => setIsModalVisible(false)}
          className={styles.modal__content__cancel}
        >
          Anuluj operacje
        </button>
      </div>
    </div>
  );
};

export default MergeUserModal;
