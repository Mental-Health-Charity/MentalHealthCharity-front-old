'use client';
import { use, useState } from 'react';
import styles from './CMS.module.scss';
import Image from 'next/image';
import ImageNotFoundIcon from '../../../images/static/imagenotfoundicon.svg';
import {
  failurePopUp,
  infoPopUp,
  successPopUp,
} from '@/utils/defaultNotifications';
import { useAdmin } from '@/contexts/adminProvider/Admin.provider';
import { useAuth } from '@/contexts/authProvider/Auth.provider';
import ArticleItem from '../../common/articleItem/ArticleItem.component';

const CMS = () => {
  const [title, setTitle] = useState<string>();
  const [content, setContent] = useState<string>();
  const [bannerUrl, setBannerUrl] = useState<string | null>();
  const [permsToRead, setPermsToRead] = useState<string>('ANYONE');
  const [isError, setIsError] = useState<boolean>(true);

  const { createArticle } = useAdmin();
  const { user } = useAuth();

  const sendArticleToDB = () => {
    if (
      !isError &&
      bannerUrl !== '' &&
      bannerUrl &&
      title &&
      content &&
      bannerUrl.includes('i.imgur.com')
    ) {
      try {
        createArticle(title, content, bannerUrl, permsToRead);
      } catch (error) {
        console.log('ERROR while creating new article, error details: ', error);
        failurePopUp(
          'Wystąpił błąd podczas tworzenia nowego artykułu, sprawdź konsolę po więcej informacji.',
        );
      } finally {
        console.log('STWORZONO');
      }
    }
  };

  const validateBanner = () => {
    if (isError || bannerUrl === '') {
      return ImageNotFoundIcon;
    } else {
      infoPopUp(
        'Zdjęcie przekazane, jeśli zostało wczytane na podglądzie obok, to jest gotowe do publikacji. Upewnij się, że pochodzi z domeny i.imgur.com!',
      );
      return bannerUrl;
    }
  };

  return (
    <div className={styles.cmsWrapper}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendArticleToDB();
          console.log('WYSLANO');
        }}
        className={styles.cmsWrapper__editor}
      >
        <legend className={styles.cmsWrapper__editor__legend}>
          Kreator artykułów
        </legend>
        <p className={styles.cmsWrapper__editor__row}>
          <label
            className={styles.cmsWrapper__editor__row__label}
            htmlFor="articleAuthor"
          >
            Autor:
          </label>
          <input
            required
            className={styles.cmsWrapper__editor__row__input}
            id="articleAuthor"
            type="text"
            value={
              user
                ? '@' + user.user_role + ' ' + user.full_name
                : 'NIEZNALEZIONO UŻYTKOWNIKA, SKONTAKTUJ SIĘ Z ODPOWIEDNIM DZIAŁEM!'
            }
            contentEditable="false"
            disabled
          />
        </p>
        <p className={styles.cmsWrapper__editor__row}>
          <label
            className={styles.cmsWrapper__editor__row__label}
            htmlFor="articleTitle"
          >
            Tytuł:
          </label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            className={styles.cmsWrapper__editor__row__input}
            id="articleTitle"
            type="text"
            placeholder="Mój artykuł"
          />
        </p>
        <p className={styles.cmsWrapper__editor__row}>
          <label
            className={styles.cmsWrapper__editor__row__label}
            htmlFor="articleContent"
          >
            Treść:
          </label>
          <textarea
            onChange={(e) => {
              setContent(e.target.value);
            }}
            className={styles.cmsWrapper__editor__row__textarea}
            id="articleContent"
            placeholder="Mój artykuł przedstawia..."
          />
        </p>
        <p className={styles.cmsWrapper__editor__row}>
          <label
            className={styles.cmsWrapper__editor__row__label}
            htmlFor="articleBannerUrl"
          >
            Źródło baneru:
          </label>
          {isError ? (
            <Image
              src={ImageNotFoundIcon}
              alt="Image Not Found"
              width={128}
              height={128}
            />
          ) : (
            <img
              src={validateBanner()}
              alt="Podgląd banera artykułu"
              width={128}
              height={128}
              onError={() => {
                setIsError(true);
                failurePopUp(
                  'Nie znaleziono obrazu, upewnij się, że obrazek który wstawiasz jest linkiem bezpośrednim i pochodzi z domeny imgur.',
                );
              }}
            />
          )}
          <input
            onChange={(e) => {
              setIsError(false);
              setBannerUrl(e.target.value);
            }}
            className={styles.cmsWrapper__editor__row__input}
            id="articleBannerUrl"
            type="url"
            placeholder="https://i.imgur.com/7nLm7si.mp4"
          />
        </p>
        <p className={styles.cmsWrapper__editor__row}>
          <label
            className={styles.cmsWrapper__editor__row__label}
            htmlFor="permsToRead"
          >
            Dostępne dla:
          </label>
          <select
            id="permsToRead"
            onChange={(e) => {
              setPermsToRead(e.target.value);
              infoPopUp('Odczyt artykułu dostępny dla ' + permsToRead);
            }}
          >
            <option value={'ANYONE'}>Każdy</option>
            <option value={'VOLUNTEER'}>Wolontariusz i admin</option>
            <option value={'ADMIN'}>tylko admin</option>
          </select>
        </p>
        <p className={styles.cmsWrapper__editor__row}>
          {/* <input
            type="submit"
            value="Pobierz w PDF"
            className={styles.cmsWrapper__editor__row__download}
          /> */}
          <input
            type="submit"
            value="Opublikuj"
            className={styles.cmsWrapper__editor__row__publish}
          />
        </p>
      </form>
    </div>
  );
};

export default CMS;
