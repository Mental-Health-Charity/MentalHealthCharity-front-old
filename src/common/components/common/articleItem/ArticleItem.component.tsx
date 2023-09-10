import ArticlePlaceholder from '../../../images/static/ArticlePlaceholder.jpg';
import Link from 'next/link';
import Image from 'next/image';
import styles from './ArticleItem.module.scss';
import { format } from 'date-fns';

interface ArticleItemProps {
  author: string;
  publishedAt: string;
  title: string;
  content: string;
  src: string;
}

const ArticleItem = ({
  author,
  publishedAt,
  title,
  content,
  src,
}: ArticleItemProps) => {
  const date = new Date(publishedAt);
  const formattedDate = format(date, 'dd/MM/yyyy HH:mm');

  return (
    <article className={styles.article}>
      <Link className={styles.article__interact} href="./">
        <div className={styles.article__banner}>
          <ul className={styles.article__banner__tags}>
            <li className={styles.article__banner__tags__tag}>Example tag</li>
            <li className={styles.article__banner__tags__tag}>Example tag</li>
          </ul>
          <Image
            width={320}
            height={320}
            className={styles.article__banner__img}
            src={src}
            alt={title + ' img'}
          />
        </div>
        <div className={styles.article__avatar}>
          <Image
            width={160}
            height={160}
            className={styles.article__avatar__img}
            src={'https://i.imgur.com/IPuhyHL.jpeg'}
            alt={''}
          />
        </div>
        <div className={styles.article__content}>
          <h2 className={styles.article__content__title}>{title}</h2>
          <div className={styles.article__content__info}>
            <p className={styles.article__content__info__user}>{author}</p>
            <p className={styles.article__content__info__date}>
              {formattedDate}
            </p>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default ArticleItem;
