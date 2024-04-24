'use client';

import Image from 'next/image';
import styles from './UserProfile.module.scss';
import { PublicProfileData, getMyArticles, getProfile } from './lib/api';
import { useEffect, useState } from 'react';
import LoadingIcon from '../../images/static/loading.svg';
import userDefaultIcon from '../../images/static/user.png';
import { PublicProfile, useAuth } from '@/contexts/authProvider/Auth.provider';
import ChangePictureModal from './modal/ChangePictureModal.component';
import { failurePopUp, successPopUp } from '@/utils/defaultNotifications';
import Table from '../common/table/Table.component';
import { Article, Articles } from '../przydatneMaterialy/lib/getArticles';
import { Status } from '@/contexts/adminProvider/Admin.provider';
import ArticleItem from '../common/articleItem/ArticleItem.component';
import getStatusName from '@/utils/getStatusName';
import ArticlePreview from '../common/ArticlePreview/ArticlePreview.component';

interface UserProfileProps {
  id: number;
}

const UserProfile = ({ id }: UserProfileProps) => {
  const [profile, setProfile] = useState<PublicProfileData>();
  const [error, setError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, editPublicProfile } = useAuth();
  const [profileLoading, setProfileLoading] = useState(true);

  const [previewArticle, setPreviewArticle] = useState<Article | null>(null);
  const [articles, setArticles] = useState<Articles>();
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<Status>(
    Status.PUBLISHED,
  );
  const [isUserProfileOwner, setIsUserProfileOwner] = useState(false);
  const [editedProfile, setEditedProfile] = useState<PublicProfile>();

  const getPublicProfile = async () => {
    try {
      setProfileLoading(true);
      const profile = await getProfile(id);
      setProfile(profile);
      setEditedProfile({
        avatar_url: profile.avatar_url,
        description: profile.description,
      });
      setIsUserProfileOwner(profile?.user.id === user?.id);
    } catch (err) {
      console.error('error while downloading public profile', err);
      setError(true);
    }
    setProfileLoading(false);
  };

  const getArticles = async (page: number) => {
    try {
      setLoading(true);
      const articles = await getMyArticles({
        page,
        size: 10,
        status: selectedStatus,
        userId: id.toString(),
      });
      setArticles(articles);
    } catch (error) {
      console.error('Error while loading articles, error details ', error);
      failurePopUp('Błąd wczytywania artykułów.');
    }
    setLoading(false);
  };

  const handleEditProfile = async () => {
    if (profile && editedProfile && user) {
      try {
        await editPublicProfile(user.id, editedProfile);
        successPopUp('Pomyślnie zapisano zmiany');
        getPublicProfile();
      } catch (err) {
        failurePopUp('Wystąpił problem z serwerem');
        console.error(err);
      }
    }
  };

  useEffect(() => {
    getPublicProfile();
  }, []);

  useEffect(() => {
    getArticles(1);
  }, [selectedStatus]);

  if (profileLoading)
    return (
      <div className={styles.profile}>
        <Image src={LoadingIcon} alt="Ikona ładowania" width={60} height={60} />
      </div>
    );

  if (error || profile === undefined) {
    return (
      <div className={styles.profile}>
        <p>Wystąpił błąd! Profil nie istnieje.</p>
      </div>
    );
  }

  const loadArticles = () => {
    if (!loading && articles && articles?.items) {
      return articles.items.map((article: Article, index) => (
        <ArticleItem
          onClick={(article) => setPreviewArticle(article)}
          showAdminOptions={false}
          article={article}
          disableRouting={true}
          key={index}
        />
      ));
    } else {
      return (
        <Image src={LoadingIcon} alt="Ikona ładowania" width={60} height={60} />
      );
    }
  };

  return (
    <div className={styles.profile}>
      <div className={styles.profile__content}>
        <h1 className={styles.profile__heading}>Profil publiczny</h1>
        <div className={styles.profile__imageWrapper}>
          <Image
            src={
              profile && profile.avatar_url
                ? profile.avatar_url
                : userDefaultIcon
            }
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
      <div className={styles.profile__articles}>
        <div>
          <h2 className={styles.profile__articles__heading}>Moje publikacje</h2>
          <select
            className={styles.profile__articles__select}
            defaultValue={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as Status)}
          >
            {Object.entries(Status).map(([key, value]) => (
              <option key={key} value={value}>
                {getStatusName(value)}
              </option>
            ))}
          </select>
        </div>
        <Table
          handleReads={getArticles}
          page={articles ? articles.page : 1}
          pages={articles ? articles.pages : 1}
        >
          {loadArticles()}
        </Table>
      </div>
      {previewArticle && (
        <ArticlePreview
          article={previewArticle}
          open={previewArticle !== null}
          handleClose={() => setPreviewArticle(null)}
        />
      )}
    </div>
  );
};

export default UserProfile;
