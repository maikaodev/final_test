import { useEffect, useState } from 'react';
import api from '../api';

export const useFilms = () => {
  const [movies, setMovies] = useState<any>([]);

  const fetchData = async () => {
    try {
      const res: any = await api.get(
        '/movie/top_rated?api_key=6d056328aeaa371e5144d4d0d1ab17a8&query=star&language=pt-BR',
      );

      setMovies(res.data.results);
    } catch (error) {
      console.log('ERROR: ', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    movies,
  };
};

