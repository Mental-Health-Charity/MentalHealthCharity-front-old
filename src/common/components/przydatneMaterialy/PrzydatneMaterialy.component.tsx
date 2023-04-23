import Image from 'next/image';
import styles from './PrzydatneMaterialy.module.scss';
import Link from 'next/link';
import ArticlePlaceholder from '../../images/static/ArticlePlaceholder.jpg';

const PrzydatneMaterialy = () => {
  return (
    <section className={styles.articlesWrapper}>
      <h1 className={styles.articlesWrapper__heading}>Wszystkie artykuły</h1>
      <div className={styles.articlesWrapper__articles}>
        <article className={styles.articlesWrapper__articles__article}>
          <div className={styles.article__authorWrapper}>
            <span
              className={styles.article__authorWrapper__dot}
              aria-hidden="true"
            ></span>
            <div className={styles.article__authorWrapper__authorContent}>
              <p
                className={styles.article__authorWrapper__authorContent__author}
              >
                @Admin
              </p>
              <p className={styles.article__authorWrapper__authorContent__date}>
                02.03.2000
              </p>
            </div>
          </div>
          <h2 className={styles.article__title}>Placeholder title</h2>
          <p className={styles.article__content}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi
            placeat eaque modi, dolor itaque temporibus quas neque provident hic
            accusamus!
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
        <article className={styles.articlesWrapper__articles__article}>
          <div className={styles.article__authorWrapper}>
            <span
              className={styles.article__authorWrapper__dot}
              aria-hidden="true"
            ></span>
            <div className={styles.article__authorWrapper__authorContent}>
              <p
                className={styles.article__authorWrapper__authorContent__author}
              >
                @Admin
              </p>
              <p className={styles.article__authorWrapper__authorContent__date}>
                02.03.2000
              </p>
            </div>
          </div>
          <h2 className={styles.article__title}>Placeholder title</h2>
          <p className={styles.article__content}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi
            placeat eaque modi, dolor itaque temporibus quas neque provident hic
            accusamus!
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
      </div>
    </section>
  );
};

export default PrzydatneMaterialy;
