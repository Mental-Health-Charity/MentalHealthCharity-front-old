'use client';
import { useEffect, useState } from 'react';
import ArticleItem from '../common/articleItem/ArticleItem.component';
import styles from './PrzydatneMaterialy.module.scss';
import { Article } from '../volunteer/volunteerCourses/lib/getVolunteerCourses';
import { Articles } from '../volunteer/volunteerCourses/lib/getVolunteerCourses';
import { failurePopUp } from '@/utils/defaultNotifications';
import Image from 'next/image';
import LoadingIcon from '../../images/static/loading.svg';
import Table from '../common/table/Table.component';
import { getPublicArticle } from '../volunteer/volunteerCourses/lib/getVolunteerCourses';
import Restricted from '../common/Restricted/Restricted.component';
import Roles from '@/utils/roles';

const PrzydatneMaterialy = () => {
  const [articles, setArticles] = useState<Articles>();
  const [loading, setLoading] = useState(true);

  const getAllArticles = async (page: number) => {
    try {
      const articles = await getPublicArticle(page, 15);
      setArticles(articles);
      setLoading(true);
    } catch (error) {
      console.error('Error while loading articles, error details ', error);
      failurePopUp('Błąd wczytywania artykułów.');
    }
    setLoading(false);
  };

  const loadArticles = () => {
    if (!loading && articles && articles?.items) {
      return articles.items.map((article: Article, index) => (
        <ArticleItem showAdminOptions={false} article={article} key={index} />
      ));
    } else {
      return (
        <Image src={LoadingIcon} alt="Ikona ładowania" width={60} height={60} />
      );
    }
  };

  useEffect(() => {
    getAllArticles(1);
  }, []);

  return (
    <section className={styles.articlesWrapper}>
      <div className={styles.articlesWrapper__heading}>
        <h1 className={styles.articlesWrapper__heading__title}>
          Wszystkie artykuły
        </h1>
        <Restricted
          roles={[
            Roles.admin,
            Roles.coordinator,
            Roles.redactor,
            Roles.supervisor,
            Roles.volunteer,
          ]}
        >
          <a
            className={styles.articlesWrapper__heading__newArticle}
            href="/admin/CMS"
          >
            + Dodaj artykuł
          </a>
        </Restricted>
      </div>

      <div className={styles.articlesWrapper__articles}>
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

export default PrzydatneMaterialy;
