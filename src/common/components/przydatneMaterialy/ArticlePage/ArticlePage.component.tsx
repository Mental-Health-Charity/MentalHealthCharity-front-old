'use client';

import Image from 'next/image';
import styles from './ArticlePage.module.scss';
import { getArticle } from './lib/getArticle';
import { forwardRef, useEffect, useState } from 'react';
import { Article } from '../lib/getArticles';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import dynamic from 'next/dynamic';
import { useAuth } from '@/contexts/authProvider/Auth.provider';
import Roles from '@/utils/roles';
import Link from 'next/link';
import ReactPlayer from 'react-player';
import ArticlePlaceholderImg from '../../../images/static/placeholderArticle.svg';
import FullScreenLoading from '../../common/fullScreenLoading/FullScreenLoading.component';
import defaultUserImg from '../../../images/static/user.png';
import { MDXEditorMethods, MDXEditorProps } from '@mdxeditor/editor';

const Editor = dynamic(
  () =>
    import(
      '../../../components/common/MDXEditor/InitializedMDXReader.component'
    ),
  {
    ssr: false,
  },
);

export const ForwardRefEditor = forwardRef<MDXEditorMethods, MDXEditorProps>(
  (props, ref) => <Editor {...props} editorRef={ref} />,
);

ForwardRefEditor.displayName = 'ForwardRefEditor';

interface ArticlePageProps {
  id: number;
  preview?: Article;
}

const ArticlePage = ({ id, preview }: ArticlePageProps) => {
  const [article, setArticle] = useState<Article>();

  const { user } = useAuth();

  const readArticle = async () => {
    try {
      const articleData = await getArticle(id);
      setArticle(articleData);
    } catch (err) {
      console.error('error while downloading article', err);
    }
  };

  useEffect(() => {
    preview ? setArticle(preview) : readArticle();
  }, [preview]);

  if (!article) return <FullScreenLoading />;

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__bannerWrapper}>
        <div className={styles.wrapper__bannerWrapper__banner}>
          <p className={styles.wrapper__bannerWrapper__banner__date}>
            {article.creation_date}
          </p>
          <h1 className={styles.wrapper__bannerWrapper__banner__title}>
            {article?.title}
          </h1>
          <Link
            className={styles.wrapper__bannerWrapper__banner__user}
            href={preview ? '#' : `/profil/${article.created_by.id}`}
          >
            <Image
              width={50}
              height={50}
              alt="Profil użytkownika"
              src={defaultUserImg}
            />
            <div
              className={styles.wrapper__bannerWrapper__banner__user__container}
            >
              <p
                className={
                  styles.wrapper__bannerWrapper__banner__user__container__name
                }
              >
                {article.created_by.full_name}
              </p>
              <p
                className={
                  styles.wrapper__bannerWrapper__banner__user__container__role
                }
              >
                {article.created_by.user_role}
              </p>
            </div>
          </Link>
        </div>
        <Image
          className={styles.wrapper__bannerWrapper__banner}
          width={300}
          height={300}
          alt="Baner artykułu"
          src={
            article?.banner_url.includes('imgur')
              ? article.banner_url
              : ArticlePlaceholderImg
          }
        />
      </div>

      {article?.video_url && <ReactPlayer controls url={article?.video_url} />}
      <article className={styles.wrapper__content}>
        <ForwardRefEditor
          className={styles.cmsWrapper__editor__row__editor}
          markdown={article?.content}
          readOnly
        />
      </article>
      {user?.user_role === Roles.admin && (
        <Link
          href={preview ? '#' : `/admin/CMS/${article?.id}`}
          className={styles.wrapper__editArticle}
        >
          Edytuj artykuł
        </Link>
      )}
    </div>
  );
};

export default ArticlePage;
