import ArticlePlaceholder from '../../../images/static/ArticlePlaceholder.jpg';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Article.module.scss';

const Article = () => {
  return (
    <article className={styles.article}>
      <div className={styles.article__authorWrapper}>
        <span
          className={styles.article__authorWrapper__dot}
          aria-hidden="true"
        ></span>
        <div className={styles.article__authorWrapper__authorContent}>
          <p className={styles.article__authorWrapper__authorContent__author}>
            @Admin
          </p>
          <p className={styles.article__authorWrapper__authorContent__date}>
            02.03.2000
          </p>
        </div>
      </div>
      <h2 className={styles.article__title}>Placeholder title</h2>
      <p className={styles.article__content}>
        Lored ipsum dolor sit amet, consectetur adipisicing elit. Animi placeat
        eaque modi, dolor itaque temporibus quas neque provident hic accusamus!d
      </p>
      <Link className={styles.article__readMore} href={'/slug'}>
        Czytaj wiecej...
      </Link>
      <Image
        className={styles.article__image}
        src={ArticlePlaceholder}
        alt={'ArticlePlaceholder'}
        width={600}
        height={300}
      />
    </article>
  );
};

export default Article;
