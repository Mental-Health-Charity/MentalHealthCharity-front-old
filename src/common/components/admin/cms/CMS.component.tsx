'use client';
import { use, useEffect, useState } from 'react';
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

import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import dynamic from 'next/dynamic';
import { getArticle } from '../../przydatneMaterialy/ArticlePage/lib/getArticle';
import { useRouter } from 'next/navigation';

interface CMSProps {
  id?: number;
}

const CMS = ({ id }: CMSProps) => {
  const { createArticle } = useAdmin();
  const { user } = useAuth();
  const [isModalOpen, setModalOpen] = useState(false);
  const [bannerUrl, setBannerUrl] = useState('');
  const [editedArticle, setEditedArticle] = useState<Article>();
  const [error, setIsError] = useState(false);
  const { push } = useRouter();

  const MDEditor = dynamic(() => import('@uiw/react-md-editor'), {
    ssr: false,
  });

  const sendArticleToDB = (article: Article) => {
    try {
      createArticle(article);
      push('przydatne-materialy');
    } catch (error) {
      console.log('ERROR while creating new article, error details: ', error);
      failurePopUp(
        'Wystąpił błąd podczas tworzenia nowego artykułu, sprawdź konsolę po więcej informacji.',
      );
    }
  };

  const getEditedArticle = async () => {
    if (id) {
      try {
        const data = await getArticle(id);
        setEditedArticle(data);
      } catch (err) {
        failurePopUp('Wystąpił błąd podczas edycji artykułu!');
      }
    }
    console.log(editedArticle);
  };

  useEffect(() => {
    getEditedArticle();
  }, []);

  if (id && !editedArticle) {
    return (
      <div className={styles.cmsWrapper}>
        <p>Loading...</p>
      </div>
    );
  }

  const initialEditedValues: Article = {
    title: editedArticle ? editedArticle.title : '',
    content: editedArticle ? editedArticle.content : '',
    banner_url: editedArticle ? editedArticle.banner_url : '',
    video_url: editedArticle ? editedArticle.video_url : '',
    article_category_id:
      editedArticle && editedArticle.article_category
        ? editedArticle.article_category.id
        : undefined,
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
    try {
      createArticle(values, id);
      push('przydatne-materialy');
    } catch (error) {
      console.log('ERROR while creating new article, error details: ', error);
      failurePopUp(
        'Wystąpił błąd podczas tworzenia nowego artykułu, sprawdź konsolę po więcej informacji.',
      );
    } finally {
      console.log('STWORZONO');
      push('przydatne-materialy');
    }
  };

  const handleBannerUrlError = () => {
    setIsError(true);
    failurePopUp(
      'Nie znaleziono obrazu, upewnij się, że obrazek który wstawiasz jest linkiem bezpośrednim i pochodzi z domeny imgur.',
    );
  };

  const handleBannerUrlChange = (value: string) => {
    setIsError(false);
    setBannerUrl(value);
  };

  if (id) {
    infoPopUp(`Edytujesz artykuł o id ${id}`);
  }

  return (
    <div className={styles.cmsWrapper}>
      <Formik
        initialValues={id ? initialEditedValues : initialValues}
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
              {id ? 'Edytor artykułów' : 'Kreator artykułów'}
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
            <p className={styles.cmsWrapper__editor__settingsRow}>
              <span className={styles.cmsWrapper__editor__settingsRow__item}>
                <label
                  className={
                    styles.cmsWrapper__editor__settingsRow__item__label
                  }
                  htmlFor="permsToRead"
                >
                  Wybierz kategorię:
                </label>

                <button
                  className={
                    styles.cmsWrapper__editor__settingsRow__item__input
                  }
                  onClick={() => setModalOpen(true)}
                >
                  Wybierz...
                </button>
                {values.article_category_id && (
                  <p>Wybrano: {values.article_category_id}</p>
                )}
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
              </span>
              <span className={styles.cmsWrapper__editor__settingsRow__item}>
                <label
                  className={
                    styles.cmsWrapper__editor__settingsRow__item__label
                  }
                  htmlFor="permsToRead"
                >
                  Dostępne dla:
                </label>
                <Field
                  disabled={id}
                  as="select"
                  id="permsToRead"
                  name="required_role"
                  className={
                    styles.cmsWrapper__editor__settingsRow__item__input
                  }
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
              </span>
            </p>
            <p className={styles.cmsWrapper__editor__row}>
              <label
                className={styles.cmsWrapper__editor__row__label}
                htmlFor="articleBannerUrl"
              >
                Źródło baneru:
              </label>

              <Field
                onChange={handleChange}
                className={styles.cmsWrapper__editor__row__input}
                id="articleTitle"
                type="text"
                placeholder="https://i.imgur.com/yourimage.jpg"
                name="banner_url"
              />
              {errors.banner_url && touched.banner_url ? (
                <Image
                  src={ImageNotFoundIcon}
                  alt="Image Not Found"
                  width={128}
                  height={128}
                  className={styles.cmsWrapper__editor__row__banner}
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={values.banner_url === '' ? undefined : values.banner_url}
                  alt="Podgląd banera artykułu"
                  width={128}
                  height={128}
                  className={styles.cmsWrapper__editor__row__banner}
                  // onError={() => handleBannerUrlError(setFieldError)}
                />
              )}
              <ErrorMessage
                name="banner_url"
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

              <MDEditor
                value={values.content}
                id="content"
                onChange={(value) => {
                  setFieldValue('content', value);
                }}
                className={styles.cmsWrapper__editor__row__editor}
              />

              <ErrorMessage
                name="content"
                component="div"
                className="error-message"
              />
            </p>

            <p className={styles.cmsWrapper__editor__row__publishWrapper}>
              <button
                onClick={() => onSubmit(values)}
                type="submit"
                value="Opublikuj"
                className={
                  styles.cmsWrapper__editor__row__publishWrapper__publish
                }
              >
                {id ? 'Opublikuj edycje' : 'Opublikuj'}
              </button>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CMS;
