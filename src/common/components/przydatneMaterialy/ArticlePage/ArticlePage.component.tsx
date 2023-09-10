import Image from 'next/image';
import styles from './ArticlePage.module.scss';
import { getArticle } from './lib/getArticle';
import { useEffect, useState } from 'react';
import { Article } from '../lib/getArticles';

interface ArticlePageProps {
  id: number;
}

const ArticlePage = ({ id }: ArticlePageProps) => {
  const [article, setArticle] = useState<Article>();

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

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__bannerWrapper}>
        <Image
          className={styles.wrapper__bannerWrapper__banner}
          width={300}
          height={300}
          alt="Baner artykułu"
          src="https://i.imgur.com/99FZqZv.jpeg"
        />
      </div>

      <h1 className={styles.wrapper__title}>Treść artykułu</h1>

      <p className={styles.wrapper__content}>
        Lorem ipsum dolor amet Lorem ipsum dolor ametLorem ipsum dolor ametLorem
        ipsum dolor ametLorem ipsum dolor ametLorem ipsum dolor ametLorem ipsum
        dolor ametLorem ipsum dolor ametLorem ipsum dolor ametLorem ipsum dolor
        ametLorem ipsum dolor ametLorem ipsum dolor ametLorem ipsum dolor
        ametLorem ipsum dolor ametLorem ipsum dolor ametLorem ipsum dolor
        ametLorem ipsum dolor ametLorem ipsum dolor ametLorem ipsum dolor
        ametLorem ipsum dolor ametLorem ipsum dolor ametLorem ipsum dolor
        ametLorem ipsum dolor amet Lorem ipsum dolor amet Lorem ipsum dolor
        ametLorem ipsum dolor ametLorem ipsum dolor ametLorem ipsum dolor
        ametLorem ipsum dolor ametLorem ipsum dolor ametLorem ipsum dolor
        ametLorem ipsum dolor ametLorem ipsum dolor ametLorem ipsum dolor
        ametLorem ipsum dolor ametLorem ipsum dolor ametLorem ipsum dolor
        ametLorem ipsum dolor ametLorem ipsum dolor ametLorem ipsum dolor
        ametLorem ipsum dolor ametLorem ipsum dolor ametLorem ipsum dolor
        ametLorem ipsum dolor ametLorem ipsum dolor ametLorem ipsum dolor amet
        Lorem ipsum dolor amet Lorem ipsum dolor ametLorem ipsum dolor ametLorem
        ipsum dolor ametLorem ipsum dolor ametLorem ipsum dolor ametLorem ipsum
        dolor ametLorem ipsum dolor ametLorem ipsum dolor ametLorem ipsum dolor
        ametLorem ipsum dolor ametLorem ipsum dolor ametLorem ipsum dolor
        ametLorem ipsum dolor ametLorem ipsum dolor ametLorem ipsum dolor
        ametLorem ipsum dolor ametLorem ipsum dolor ametLorem ipsum dolor
        ametLorem ipsum dolor ametLorem ipsum dolor ametLorem ipsum dolor
        ametLorem ipsum dolor amet Lorem ipsum dolor amet Lorem ipsum dolor
        ametLorem ipsum dolor ametLorem ipsum dolor ametLorem ipsum dolor
        ametLorem ipsum dolor ametLorem ipsum dolor ametLorem ipsum dolor
        ametLorem ipsum dolor ametLorem ipsum dolor ametLorem ipsum dolor
        ametLorem ipsum dolor ametLorem ipsum dolor ametLorem ipsum dolor
        ametLorem ipsum dolor ametLorem ipsum dolor ametLorem ipsum dolor
        ametLorem ipsum dolor ametLorem ipsum dolor ametLorem ipsum dolor
        ametLorem ipsum dolor ametLorem ipsum dolor ametLorem ipsum dolor amet
        Lorem ipsum dolor amet Lorem ipsum dolor ametLorem ipsum dolor ametLorem
        ipsum dolor ametLorem ipsum dolor ametLorem ipsum dolor ametLorem ipsum
        dolor ametLorem ipsum dolor ametLorem ipsum dolor ametLorem ipsum dolor
        ametLorem ipsum dolor ametLorem ipsum dolor ametLorem ipsum dolor
        ametLorem ipsum dolor ametLorem ipsum dolor ametLorem ipsum dolor
        ametLorem ipsum dolor ametLorem ipsum dolor ametLorem ipsum dolor
        ametLorem ipsum dolor ametLorem ipsum dolor ametLorem ipsum dolor
        ametLorem ipsum dolor amet Lorem ipsum dolor amet Lorem ipsum dolor
        ametLorem ipsum dolor ametLorem ipsum dolor ametLorem ipsum dolor
        ametLorem ipsum dolor ametLorem ipsum dolor ametLorem ipsum dolor
        ametLorem ipsum dolor ametLorem ipsum dolor ametLorem ipsum dolor
        ametLorem ipsum dolor ametLorem ipsum dolor ametLorem ipsum dolor
        ametLorem ipsum dolor ametLorem ipsum dolor ametLorem ipsum dolor
        ametLorem ipsum dolor ametLorem ipsum dolor ametLorem ipsum dolor
        ametLorem ipsum dolor ametLorem ipsum dolor ametLorem ipsum dolor amet
        Lorem ipsum dolor amet Lorem ipsum dolor ametLorem ipsum dolor ametLorem
        ipsum dolor ametLorem ipsum dolor ametLorem ipsum dolor ametLorem ipsum
        dolor ametLorem ipsum dolor ametLorem ipsum dolor ametLorem ipsum dolor
        ametLorem ipsum dolor ametLorem ipsum dolor ametLorem ipsum dolor
        ametLorem ipsum dolor ametLorem ipsum dolor ametLorem ipsum dolor
        ametLorem ipsum dolor ametLorem ipsum dolor ametLorem ipsum dolor
        ametLorem ipsum dolor ametLorem ipsum dolor ametLorem ipsum dolor
        ametLorem ipsum dolor amet
      </p>
      <div className={styles.wrapper__author}>
        <Image
          className={styles.wrapper__author__picture}
          width={80}
          height={80}
          alt="Profil użytkownika"
          src="https://i.imgur.com/99FZqZv.jpeg"
        />
        <p className={styles.wrapper__author__name}>Jan Kowalski</p>
      </div>
    </div>
  );
};

export default ArticlePage;
