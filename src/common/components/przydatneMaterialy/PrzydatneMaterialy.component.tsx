'use client';
import { useEffect } from 'react';
import Article from './Article/Article.component';
import styles from './PrzydatneMaterialy.module.scss';

const PrzydatneMaterialy = () => {
  const getAllBlogPosts = async () => {
    const spaceId = 'rtn0gjkma2wp';
    const accessToken = 'BeEW54hkSBEVU8oX84bggbMZUlmXUhF8w8AktvD8_yo';
    const url = `https://cdn.contentful.com/spaces/${spaceId}/environments/master/entries?access_token=${accessToken}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      const blogPosts = data.items.map(
        (post: {
          sys: { id: any };
          fields: { name: any; body: any; author: any };
        }) => ({
          id: post.sys.id,
          title: post.fields.name,
          body: post.fields.body,
          author: post.fields.author,
        }),
      );
      console.log(blogPosts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBlogPosts();
  }, []);
  return (
    <section className={styles.articlesWrapper}>
      <h1
        onClick={() => console.log(getAllBlogPosts())}
        className={styles.articlesWrapper__heading}
      >
        Wszystkie artykuły
      </h1>
      <div className={styles.articlesWrapper__articles}>
        <Article />
      </div>
    </section>
  );
};

export default PrzydatneMaterialy;
