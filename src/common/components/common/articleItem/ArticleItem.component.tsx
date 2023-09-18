import ArticlePlaceholder from '../../../images/static/ArticlePlaceholder.jpg';
import Link from 'next/link';
import Image from 'next/image';
import styles from './ArticleItem.module.scss';
import { format } from 'date-fns';
import { useAuth } from '@/contexts/authProvider/Auth.provider';
import { Article } from '../../przydatneMaterialy/lib/getArticles';
import { Status, useAdmin } from '@/contexts/adminProvider/Admin.provider';
import { failurePopUp, successPopUp } from '@/utils/defaultNotifications';

interface ArticleItemProps {
  article: Article;
  showAdminOptions: boolean;
}

const ArticleItem = ({ article, showAdminOptions }: ArticleItemProps) => {
  const date = new Date(article.creation_date);
  const formattedDate = format(date, 'dd/MM/yyyy HH:mm');
  const { user } = useAuth();
  const { manageArticle } = useAdmin();

  const ManageArticle = async (status: Status) => {
    try {
      await manageArticle(article.id, {
        reject_message: `Zmieniono status przez ${user?.full_name}`,
        status: status,
      });
      successPopUp('Operacja przebiegła pomyślnie.');
    } catch (err) {
      failurePopUp('Błąd podczas zarządzania artykułem.');
      console.error(err);
    }
  };

  return (
    <article className={styles.article}>
      <Link
        className={styles.article__interact}
        href={`./przydatne-materialy/${article.id}`}
      >
        <div className={styles.article__banner}>
          <ul className={styles.article__banner__tags}>
            <li className={styles.article__banner__tags__tag}>
              {article.article_category.name}
            </li>
          </ul>
          <Image
            width={320}
            height={320}
            className={styles.article__banner__img}
            src={article.banner_url}
            alt={article.title + ' img'}
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
          <h2 className={styles.article__content__title}>{article.title}</h2>
          <div className={styles.article__content__info}>
            <p className={styles.article__content__info__user}>
              {article.created_by.full_name}
            </p>
            <p className={styles.article__content__info__date}>
              {formattedDate}
            </p>
          </div>
          {showAdminOptions && (
            <>
              <button
                className={styles.article__content__controls}
                onClick={() => ManageArticle(Status.PUBLISHED)}
              >
                Publikuj
              </button>
              <button
                className={styles.article__content__controls}
                onClick={() => ManageArticle(Status.REJECT)}
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
