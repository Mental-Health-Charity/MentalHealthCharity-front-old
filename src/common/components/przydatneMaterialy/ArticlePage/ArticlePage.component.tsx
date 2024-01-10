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
import {
  InsertFrontmatter,
  MDXEditorMethods,
  MDXEditorProps,
  frontmatterPlugin,
  toolbarPlugin,
} from '@mdxeditor/editor';

const Editor = dynamic(
  () =>
    import(
      '../../../components/common/MDXEditor/InitializedMDXEditor.component'
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
}

const ArticlePage = ({ id }: ArticlePageProps) => {
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
    readArticle();
  }, []);

  if (!article) return <FullScreenLoading />;

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__bannerWrapper}>
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

      <h1 className={styles.wrapper__title}>{article?.title}</h1>
      {article?.video_url && <ReactPlayer controls url={article?.video_url} />}
      <p className={styles.wrapper__content}>
        
        <ForwardRefEditor
        
          markdown={article?.content}
          plugins={[
            frontmatterPlugin(),
            toolbarPlugin({ toolbarContents: () => <InsertFrontmatter /> }),
          ]}
        />
      </p>
      <Link
        href={`/profil/${article.created_by.id}`}
        className={styles.wrapper__author}
      >
        <Image
          className={styles.wrapper__author__picture}
          width={80}
          height={80}
          alt="Profil użytkownika"
          src={defaultUserImg}
        />
        <p className={styles.wrapper__author__name}>
          {article.created_by.full_name}
        </p>
      </Link>
      {user?.user_role === Roles.admin && (
        <Link
          href={`/admin/CMS/${article?.id}`}
          className={styles.wrapper__editArticle}
        >
          Edytuj artykuł
        </Link>
      )}
    </div>
  );
};

export default ArticlePage;
