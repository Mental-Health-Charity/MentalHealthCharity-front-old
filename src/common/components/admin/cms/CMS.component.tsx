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

import { useAuth } from '@/contexts/authProvider/Auth.provider';
import ArticleItem from '../../common/articleItem/ArticleItem.component';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import CategoryModal from './CategoryModal/CategoryModal.component';

import { Article, useAdmin } from '@/contexts/adminProvider/Admin.provider';

const CMS = () => {
  const { createArticle } = useAdmin();
  const { user } = useAuth();
  const [isModalOpen, setModalOpen] = useState(false);

  const sendArticleToDB = (article: Article) => {
    try {
      createArticle(article);
    } catch (error) {
      console.log('ERROR while creating new article, error details: ', error);
      failurePopUp(
        'Wystąpił błąd podczas tworzenia nowego artykułu, sprawdź konsolę po więcej informacji.',
      );
    } finally {
      console.log('STWORZONO');
    }
  };

  const initialValues: Article = {
    title: '',
    content: '',
    banner_url: '',
    video_url: 'i.imgur.com',
    required_role: 'ANYONE',
    article_category_id: undefined,
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Tytuł jest wymagany'),
    content: Yup.string().required('Treść jest wymagana'),
    bannerUrl: Yup.string()
      .required('Źródło baneru jest wymagane')
      .matches(
        /(i\.imgur\.com)/,
        'Źródło baneru musi pochodzić z domeny i.imgur.com',
      ),

    permsToRead: Yup.string().required('Dostępność jest wymagana'),
    article_category_id: Yup.number().required('Kategoria wymagana.'),
  });

  const onSubmit = (values: Article) => {
    console.log('st');
    try {
      createArticle(values);
    } catch (error) {
      console.log('ERROR while creating new article, error details: ', error);
      failurePopUp(
        'Wystąpił błąd podczas tworzenia nowego artykułu, sprawdź konsolę po więcej informacji.',
      );
    } finally {
      console.log('STWORZONO');
    }
  };

  const handleBannerUrlError = (setIsError) => {
    setIsError(true);
    failurePopUp(
      'Nie znaleziono obrazu, upewnij się, że obrazek który wstawiasz jest linkiem bezpośrednim i pochodzi z domeny imgur.',
    );
  };

  const handleBannerUrlChange = (setIsError, setBannerUrl, value) => {
    setIsError(false);
    setBannerUrl(value);
  };

  return (
    <div className={styles.cmsWrapper}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({
          handleSubmit,
          values,
          handleChange,
          errors,
          touched,
          setFieldError,
          setFieldValue,
        }) => (
          <Form onSubmit={handleSubmit} className={styles.cmsWrapper__editor}>
            <legend className={styles.cmsWrapper__editor__legend}>
              Kreator artykułów
            </legend>
            <p className={styles.cmsWrapper__editor__row}>
              <label
                className={styles.cmsWrapper__editor__row__label}
                htmlFor="articleTitle"
              >
                Tytuł:
              </label>
              <Field
                onChange={handleChange}
                className={styles.cmsWrapper__editor__row__input}
                id="articleTitle"
                type="text"
                placeholder="Mój artykuł"
                name="title"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="error-message"
              />
            </p>
            <p className={styles.cmsWrapper__editor__row}>
              <label
                className={styles.cmsWrapper__editor__row__label}
                htmlFor="articleContent"
              >
                Treść:
              </label>
              <Field
                as="textarea"
                onChange={handleChange}
                className={styles.cmsWrapper__editor__row__textarea}
                id="articleContent"
                placeholder="Mój artykuł przedstawia..."
                name="content"
              />
              {/* <MDEditor
                value={values.content}
                id="content"
                onChange={(e, value) => {
                  setFieldValue('articleContent', value);
                }}
              /> */}
              <ErrorMessage
                name="content"
                component="div"
                className="error-message"
              />
            </p>
            <p className={styles.cmsWrapper__editor__row}>
              <label
                className={styles.cmsWrapper__editor__row__label}
                htmlFor="articleBannerUrl"
              >
                Źródło baneru:
              </label>
              {errors.banner_url && touched.banner_url ? (
                <Image
                  src={ImageNotFoundIcon}
                  alt="Image Not Found"
                  width={128}
                  height={128}
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={values.banner_url === '' ? undefined : values.banner_url}
                  alt="Podgląd banera artykułu"
                  width={128}
                  height={128}
                  onError={() => handleBannerUrlError(setFieldError)}
                />
              )}
              <Field
                onChange={handleChange}
                className={styles.cmsWrapper__editor__row__input}
                id="articleTitle"
                type="text"
                placeholder="https://i.imgur.com/yourimage.jpg"
                name="banner_url"
              />
              <ErrorMessage
                name="banner_url"
                component="div"
                className="error-message"
              />
            </p>

            <p className={styles.cmsWrapper__editor__row}>
              <label
                className={styles.cmsWrapper__editor__row__label}
                htmlFor="permsToRead"
              >
                Wybierz kategorię:
              </label>
              {values.article_category_id && (
                <p>Wybrano: {values.article_category_id}</p>
              )}
              <button onClick={() => setModalOpen(true)}>Wybierz...</button>

              <ErrorMessage
                name="article_category_id"
                component="div"
                className="error-message"
              />
              {isModalOpen && (
                <CategoryModal
                  setFieldValue={setFieldValue}
                  setModalOpen={setModalOpen}
                />
              )}
            </p>

            <p className={styles.cmsWrapper__editor__row}>
              <label
                className={styles.cmsWrapper__editor__row__label}
                htmlFor="permsToRead"
              >
                Dostępne dla:
              </label>
              <Field
                as="select"
                id="permsToRead"
                name="required_role"
                className={styles.cmsWrapper__editor__row__input}
              >
                <option value="ANYONE">Każdy</option>
                <option value="VOLUNTEER">Wolontariusz i admin</option>
                <option value="ADMIN">tylko admin</option>
              </Field>
              <ErrorMessage
                name="required_role"
                component="div"
                className="error-message"
              />
            </p>

            <button
              onClick={() => onSubmit(values)}
              type="submit"
              value="Opublikuj"
              className={styles.cmsWrapper__editor__row__publish}
            >
              Opublikuj
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CMS;
