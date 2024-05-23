'use client';
import { useEffect, useState } from 'react';
import styles from './ManageArticles.module.scss';
import { failurePopUp, successPopUp } from '@/utils/defaultNotifications';
import ArticleItem from '../../common/articleItem/ArticleItem.component';
import Table from '../../common/table/Table.component';
import {
  Article,
  getVolunteerCourses,
} from '../../volunteer/volunteerCourses/lib/getVolunteerCourses';
import { Articles } from '../../volunteer/volunteerCourses/lib/getVolunteerCourses';
import { Status, useAdmin } from '@/contexts/adminProvider/Admin.provider';
import ArticlePreview from '../../common/ArticlePreview/ArticlePreview.component';
import translateArticleStatus from '@/utils/translateArticleStatus';
import Loader from '../../common/Loader/Loader.component';
import { useAuth } from '@/contexts/authProvider/Auth.provider';

const ManageArticles = () => {
  const [articles, setArticles] = useState<Articles>();
  const [loading, setLoading] = useState(true);
  const [statusOfArticles, setStatusOfArticles] = useState<Status>(
    Status.PUBLISHED,
  );
  const [selectedArticle, setSelectedArticle] = useState<Article>();
  const { user } = useAuth();
  const { manageArticle } = useAdmin();

  const handleManageArticle = async (status: Status, article: Article) => {
    try {
      await manageArticle(article.id, {
        reject_message: `Zmieniono status przez ${user?.full_name}`,
        status: status,
      });
      successPopUp('Operacja przebiegła pomyślnie.');
      getAllArticles(articles?.page || 1, statusOfArticles);
    } catch (err) {
      failurePopUp('Błąd podczas zarządzania artykułem.');
      console.error(err);
    }
  };

  const getAllArticles = async (page: number, status: Status) => {
    setLoading(true);
    try {
      // read public articles endpoint is broken at this moment.
      const articles = await getVolunteerCourses(page, 15, status);
      setArticles(articles);
      setLoading(true);
    } catch (error) {
      console.error('Error while loading articles, error details ', error);
      failurePopUp('Błąd wczytywania artykułów.');
    }
    setLoading(false);
  };

  const loadArticles = () => {
    if (!loading && articles && articles.items.length > 0) {
      return articles.items.map((article, index) => (
        <ArticleItem
          disableRouting
          handleDelete={() => handleManageArticle(Status.DELETED, article)}
          handleRestore={() => handleManageArticle(Status.DRAFT, article)}
          handlePublish={() => handleManageArticle(Status.PUBLISHED, article)}
          showAdminOptions={article.status !== Status.DELETED}
          onClick={(article) => setSelectedArticle(article)}
          key={index}
          article={article}
        />
      ));
    } else {
      return <p>Brak materiałów w tej kategorii.</p>;
    }
  };

  useEffect(() => {
    getAllArticles(1, statusOfArticles);
  }, [statusOfArticles]);

  return (
    <section className={styles.articlesWrapper}>
      <h1 className={styles.articlesWrapper__heading}>
        Artykuły do zatwierdzenia
      </h1>
      <div className={styles.articlesWrapper__articles}>
        <div className={styles.articlesWrapper__articles__status}>
          {Object.values(Status).map((status) => (
            <button
              disabled={loading}
              className={`${
                styles.articlesWrapper__articles__status__catButton
              } ${
                status === statusOfArticles
                  ? styles.articlesWrapper__articles__status__catButton__selected
                  : ''
              }`}
              onClick={() => setStatusOfArticles(status)}
              key={status}
            >
              {loading && status === statusOfArticles && <Loader width={30} />}
              <span>{translateArticleStatus(status)}</span>
            </button>
          ))}
        </div>
        <Table
          page={articles ? articles.page : 1}
          pages={articles ? articles.pages : 1}
          handleReads={(page) => getAllArticles(page, statusOfArticles)}
        >
          {loadArticles()}
        </Table>
      </div>
      {selectedArticle && (
        <ArticlePreview
          open
          article={selectedArticle}
          handleClose={() => setSelectedArticle(undefined)}
        />
      )}
    </section>
  );
};

export default ManageArticles;
