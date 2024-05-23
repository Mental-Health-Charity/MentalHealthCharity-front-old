import Link from 'next/link';
import Image from 'next/image';
import styles from './ArticleItem.module.scss';
import { format } from 'date-fns';
import { Article } from '../../volunteer/volunteerCourses/lib/getVolunteerCourses';
import { Status } from '@/contexts/adminProvider/Admin.provider';
import placeholderImg from '../../../images/static/placeholderArticle.svg';
import placeholderUserImg from '../../../images/static/user.png';

interface ArticleItemProps {
  article: Article;
  showAdminOptions: boolean;
  onClick?: (article: Article) => void;
  disableRouting?: boolean;
  handlePublish?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleDelete?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleRestore?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const ArticleItem = ({
  article,
  showAdminOptions,
  onClick,
  disableRouting = false,
  handleDelete,
  handlePublish,
  handleRestore,
}: ArticleItemProps) => {
  const date = new Date(article.creation_date);
  const formattedDate = format(date, 'dd/MM/yyyy HH:mm');

  return (
    <article className={styles.article}>
      <Link
        className={styles.article__interact}
        href={
          showAdminOptions || disableRouting
            ? ''
            : `./przydatne-materialy/${article.id}`
        }
        onClick={onClick ? () => onClick(article) : undefined}
      >
        <div className={styles.article__banner}>
          <ul className={styles.article__banner__tags}>
            <li className={styles.article__banner__tags__tag}>
              {article.article_category?.name}
            </li>
          </ul>

          <Image
            width={320}
            height={320}
            className={styles.article__banner__img}
            src={
              article.banner_url.includes('imgur')
                ? article.banner_url
                : placeholderImg
            }
            alt={article.title + ' article banner'}
          />
        </div>
        <div className={styles.article__avatar}>
          <Image
            width={160}
            height={160}
            className={styles.article__avatar__img}
            src={placeholderUserImg}
            alt={'przykładowe zdjęcie avatara'}
          />
        </div>
        <div className={styles.article__content}>
          <h2 className={styles.article__content__title}>{article.title}</h2>
          <div className={styles.article__content__info}>
            <p className={styles.article__content__info__user}>
              {article.created_by.full_name}
            </p>
            <p className={styles.article__content__info__date}>
              {formattedDate}
            </p>
          </div>
          {article.status === Status.REJECT && (
            <button
              className={styles.article__content__controls}
              onClick={handleRestore}
            >
              Przywróć do szkiców
            </button>
          )}
          {showAdminOptions && article.status !== Status.REJECT && (
            <>
              {article.status !== Status.PUBLISHED && (
                <button
                  className={styles.article__content__controls}
                  onClick={handlePublish}
                >
                  Publikuj
                </button>
              )}
              <button
                className={styles.article__content__controls}
                onClick={handleDelete}
              >
                Odrzuć
              </button>
            </>
          )}
        </div>
      </Link>
    </article>
  );
};

export default ArticleItem;
