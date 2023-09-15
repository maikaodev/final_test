import { useContext, useState } from 'react';
import { Animated, Share } from 'react-native';
import { ReleaseProps } from '../@types/hooks';
import { useLocalSearchParams, useRouter } from 'expo-router';
import api from '../api';

import { useFavorites } from '../store';

export const useRelease = () => {
  const [release, setRelease] = useState<ReleaseProps[]>([]);
  const [offset, setOffset] = useState(new Animated.Value(100));
  const { favoritesReleases, addToFavorites } = useFavorites();

  const router = useRouter();

  const { id } = useLocalSearchParams();

  const animationOnLoad = () => {
    Animated.timing(offset, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const fectchRelease = async () => {
    const response = await api.get(`?tipo=release&idproduto=${id}&qtd=1`);

    setRelease(response.data.items);
  };

  const shareNews = async () => {
    try {
      await Share.share({
        message: `Compartilhe esta notícia: ${release[0].link}`,
        url: release[0].link,
      });
    } catch (e) {
      alert(`Ocorreu um erro inesperado: ${e}`);
    }
  };

  const addFavorites = (release: ReleaseProps) => {
    const newFavorites: any = [...favoritesReleases, { release }];
    addFavorites(newFavorites);
  };

  return {
    id,
    release,
    setRelease,
    offset,
    animationOnLoad,
    router,
    fectchRelease,
    shareNews,
    addToFavorites,
  };
};

