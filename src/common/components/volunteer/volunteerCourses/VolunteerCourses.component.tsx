'use client';

import styles from './VolunteerCourses.module.scss';
import ArticleItem from '../../common/articleItem/ArticleItem.component';
import { useEffect, useState } from 'react';
import {
  Article,
  Articles,
  getVolunteerCourses,
} from './lib/getVolunteerCourses';
import { failurePopUp, successPopUp } from '@/utils/defaultNotifications';
import LoadingIcon from '../../../images/static/loading.svg';
import Image from 'next/image';
import Table from '../../common/table/Table.component';

const VolunteerCourses = () => {
  const [courses, setCourses] = useState<Articles>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getAllCourses(1);
  }, []);

  const getAllCourses = async (page: number) => {
    try {
      const courses = await getVolunteerCourses(page, 15);
      setCourses(courses);
      setLoading(true);
    } catch (error) {
      console.log('Error while loading articles, error details ', error);
      failurePopUp('Błąd wczytywania artykułów.');
    }
    setLoading(false);
  };

  const loadCourses = () => {
    if (!loading && courses && courses?.items) {
      successPopUp('Załadowano artykuły :)');
      return courses.items.map((article: Article, index) => (
        <ArticleItem
          key={index}
          author={article.created_by.full_name}
          publishedAt={article.creation_date}
          title={article.title}
          content={article.content}
          src={article.banner_url}
        />
      ));
    } else if (!loading && courses && !courses.items) {
      return (
        <p>
          Nie znaleziono materiałów dostępnych do wyświetlenia... Spróbuj
          ponownie później.
        </p>
      );
    } else {
      return (
        <Image src={LoadingIcon} alt="Ikona ładowania" width={60} height={60} />
      );
    }
  };

  return (
    <section className={styles.wrapper}>
      <h1>Materiały do szkoleń</h1>
      <div>
        <Table
          page={courses ? courses.page : 1}
          pages={courses ? courses.pages : 1}
          handleReads={getAllCourses}
        >
          {loadCourses()}
        </Table>
      </div>
    </section>
  );
};

export default VolunteerCourses;
