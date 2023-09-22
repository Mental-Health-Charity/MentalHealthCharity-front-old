'use client';

import Image from 'next/image';
import styles from './UserProfile.module.scss';
import getProfile, { PublicProfileData } from './lib/getProfile';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import LoadingIcon from '../../images/static/loading.svg';
import userDefaultIcon from '../../images/static/user.png';
import { PublicProfile, useAuth } from '@/contexts/authProvider/Auth.provider';
import ChangePictureModal from './modal/ChangePictureModal.component';
import { failurePopUp, successPopUp } from '@/utils/defaultNotifications';

interface UserProfileProps {
  id: number;
}

const UserProfile = ({ id }: UserProfileProps) => {
  const [profile, setProfile] = useState<PublicProfileData>();
  const [error, setError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, editPublicProfile } = useAuth();
  const isUserProfileOwner = profile?.id === user?.id;
  const [editedProfile, setEditedProfile] = useState<PublicProfile>();

  const getPublicProfile = async () => {
    try {
      const profile = await getProfile(id);
      setProfile(profile);
      setEditedProfile({
        avatar_url: profile.avatar_url,
        description: profile.description,
      });
    } catch (err) {
      console.error('error while downloading public profile', err);
      setError(true);
    }
  };

  const handleEditProfile = async () => {
    if (profile && editedProfile && user) {
      try {
        const data = await editPublicProfile(user.id, editedProfile);
        if (data.full_name) {
          successPopUp('Pomyślnie zapisano zmiany');
          getPublicProfile();
        } else {
          failurePopUp('Coś poszło nie tak!');
        }
      } catch (err) {
        failurePopUp('Wystąpił problem z serwerem');
        console.error(err);
      }
    }
  };

  useEffect(() => {
    getPublicProfile();
  }, []);

  if (!profile)
    return (
      <div className={styles.profile}>
        <Image src={LoadingIcon} alt="Ikona ładowania" width={60} height={60} />
      </div>
    );

  if (error || !profile.user) {
    return (
      <div className={styles.profile}>
        <p>Wystąpił błąd! Profil nie istnieje.</p>
      </div>
    );
  }

  return (
    <div className={styles.profile}>
      <div className={styles.profile__content}>
        <h1 className={styles.profile__heading}>Profil publiczny</h1>
        <div className={styles.profile__imageWrapper}>
          <Image
            src={profile.avatar_url ? profile.avatar_url : userDefaultIcon}
            alt="Zdjęcie profilowe"
            width={80}
            height={80}
            className={`${styles.profile__imageWrapper__image} ${
              isUserProfileOwner
                ? styles.profile__imageWrapper__imageChange
                : ''
            }`}
            onClick={() => setIsModalOpen(true)}
          />
          <h2 className={styles.profile__username}>{profile.user.full_name}</h2>
          <p className={styles.profile__role}>{profile.user.user_role}</p>
          {isModalOpen && isUserProfileOwner && (
            <ChangePictureModal
              handleEditProfile={handleEditProfile}
              editedProfile={editedProfile}
              setEditedProfile={setEditedProfile}
              setIsModalOpen={setIsModalOpen}
            />
          )}
        </div>

        <div className={styles.profile__info}>
          <p className={styles.profile__aboutHeading}>O mnie</p>
          <textarea
            className={styles.profile__description}
            value={
              editedProfile?.description
                ? editedProfile.description
                : 'Ten użytkownik nie opublikował opisu'
            }
            disabled={!isUserProfileOwner}
            onChange={(e) =>
              editedProfile &&
              setEditedProfile({
                ...editedProfile,
                description: e.target.value,
              })
            }
          />
          {profile.description !== editedProfile?.description && (
            <button
              onClick={() => handleEditProfile()}
              className={styles.profile__info__save}
            >
              Zapisz zmiany
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
