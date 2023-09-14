import { useState } from 'react';
import api from '../api';
import { NewsProps } from '../@types/hooks';

export const useNews = () => {
  const [news, setNews] = useState<NewsProps[]>(null);

  const fetchNews = async () => {
    const respNews = await api.get('/?tipo=noticia&qtd=10');

    setNews(respNews.data.items);
  };

  return {
    fetchNews,
    news,
  };
};

