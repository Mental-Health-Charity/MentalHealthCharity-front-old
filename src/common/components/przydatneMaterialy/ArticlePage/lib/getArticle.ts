import { Article } from '../../lib/getArticles';

export const getArticle = async (id: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/article/${id}/detail`,
    {
      method: 'get',
    },
  );

  const data: Article = await res.json();
  return data;
};
