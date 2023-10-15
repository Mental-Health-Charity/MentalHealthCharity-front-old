import { Dispatch, SetStateAction } from 'react';
import styles from './ChangePictureModal.module.scss';
import { PublicProfile } from '@/contexts/authProvider/Auth.provider';

interface ChangePictureModalProps {
  setEditedProfile: Dispatch<SetStateAction<PublicProfile | undefined>>;
  editedProfile: PublicProfile | undefined;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  handleEditProfile: () => Promise<void>;
}

const ChangePictureModal = ({
  editedProfile,
  setEditedProfile,
  setIsModalOpen,
  handleEditProfile,
}: ChangePictureModalProps) => {
  return (
    <div className={`${styles.modal}`}>
      <div className={styles.modalContent}>
        <button
          className={styles.closeButton}
          onClick={() => setIsModalOpen(false)}
        >
          &#10005;
        </button>
        <h2>Edytuj zdjęcie profilowe</h2>
        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="Wklej URL zdjęcia profilowego"
            value={editedProfile?.avatar_url}
            onChange={(e) =>
              editedProfile &&
              setEditedProfile({
                ...editedProfile,
                avatar_url: e.target.value,
              })
            }
          />
          {editedProfile?.avatar_url && (
            <div className={styles.preview}>
              <img
                src={editedProfile.avatar_url}
                alt="Podgląd zdjęcia profilowego"
              />
            </div>
          )}
        </div>
        <button
          onClick={() => handleEditProfile()}
          className={styles.modalContent__save}
        >
          Zapisz
        </button>
      </div>
    </div>
  );
};

export default ChangePictureModal;
