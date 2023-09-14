import { useEffect, useRef, useState } from 'react';
import api from '../api';

export const useWeather = () => {
  const [city, setCity] = useState<string>(null);

  const [inputValue, setInputValue] = useState<string>(null);

  const [weather, setWeather] = useState<any>(null);

  const fetchData = async () => {
    if (!city || !inputValue) {
      alert('Por favor, digite o nome de uma cidade.');
      return;
    }
    if (city.endsWith(' ')) {
      setCity(city.split('').pop());
    }

    try {
      const res: any = await api.get(
        `?q=${city}&appid=e8abdde174e0352dec2073f2e719fc2b`,
      );

      setWeather(res.data);
    } catch (error) {
      alert('Por favor, digite o nome de uma existente.');
    } finally {
      setInputValue('');
    }
  };

  const handleChange = (text) => {
    setCity(
      text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036F]/g, '')
        .match(/^[a-zA-Z ]+$/)
        ? text
        : '',
    );
  };

  return {
    inputValue,
    setInputValue,
    weather,
    setWeather,
    fetchData,
    handleChange,
  };
};

