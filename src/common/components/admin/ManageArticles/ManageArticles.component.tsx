'use client';
import { useEffect, useState } from 'react';

import styles from './ManageArticles.module.scss';

import { failurePopUp, successPopUp } from '@/utils/defaultNotifications';
import Image from 'next/image';
import LoadingIcon from '../../../images/static/loading.svg';
import ArticleItem from '../../common/articleItem/ArticleItem.component';
import Table from '../../common/table/Table.component';
import { getVolunteerCourses } from '../../volunteer/volunteerCourses/lib/getVolunteerCourses';

import { Articles } from '../../volunteer/volunteerCourses/lib/getVolunteerCourses';
import { Status } from '@/contexts/adminProvider/Admin.provider';

const ManageArticles = () => {
  const [articles, setArticles] = useState<Articles>();
  const [loading, setLoading] = useState(true);
  const [statusOfArticles, setStatusOfArticles] = useState<Status>();

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
      console.log('Error while loading articles, error details ', error);
      failurePopUp('Błąd wczytywania artykułów.');
    }
    setLoading(false);
  };

  const loadArticles = () => {
    if (!loading && articles && articles?.items) {
      return articles.items.map((article, index) => (
        <ArticleItem showAdminOptions={true} key={index} article={article} />
      ));
    } else if (!loading && articles && !articles.items) {
      return (
        <p>
          Endpoint do odczytania postów bez autoryzacji użytkownika jest
          zepsuty. Prosimy o zalogowanie, aby wyświetlić artykuły. Błąd
          występuje tylko w wersji testowej i zostanie naprawiony.
        </p>
      );
    } else {
      return (
        <Image src={LoadingIcon} alt="Ikona ładowania" width={60} height={60} />
      );
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
    </section>
  );
};

export default ManageArticles;
