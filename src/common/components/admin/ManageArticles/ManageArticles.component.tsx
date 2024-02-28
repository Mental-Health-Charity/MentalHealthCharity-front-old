'use client';
import { useEffect, useState } from 'react';
import styles from './ManageArticles.module.scss';
import { failurePopUp } from '@/utils/defaultNotifications';
import ArticleItem from '../../common/articleItem/ArticleItem.component';
import Table from '../../common/table/Table.component';
import {
  Article,
  getVolunteerCourses,
} from '../../volunteer/volunteerCourses/lib/getVolunteerCourses';
import { Articles } from '../../volunteer/volunteerCourses/lib/getVolunteerCourses';
import { Status } from '@/contexts/adminProvider/Admin.provider';
import ArticlePreview from '../../common/ArticlePreview/ArticlePreview.component';

const ManageArticles = () => {
  const [articles, setArticles] = useState<Articles>();
  const [loading, setLoading] = useState(true);
  const [statusOfArticles, setStatusOfArticles] = useState<Status>();
  const [selectedArticle, setSelectedArticle] = useState<Article>();

  const getAllArticles = async (page: number) => {
    try {
      // read public articles endpoint is broken at this moment.
      const articles = await getVolunteerCourses(
        page,
        15,
        statusOfArticles ? statusOfArticles : 'PUBLISHED',
      );
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
          showAdminOptions={
            article.status !== Status.DELETED &&
            article.status !== Status.REJECT
          }
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
    getAllArticles(1);
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
              {status}
            </button>
          ))}
        </div>
        <Table
          page={articles ? articles.page : 1}
          pages={articles ? articles.pages : 1}
          handleReads={getAllArticles}
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
