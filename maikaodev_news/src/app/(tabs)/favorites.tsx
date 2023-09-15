import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Share,
  FlatList,
} from 'react-native';
import api from '../../api';
import { useEffect, useState } from 'react';
import { ReleaseProps } from '../../@types/hooks';
import { useRelease } from '../../hooks/useRelease';
import { News } from '../../components/news';
import { useFavorites } from '../../store';

export default function Favorites() {
  const { animationOnLoad, router } = useRelease();
  const { favoritesReleases, addToFavorites } = useFavorites();

  useEffect(() => {
    animationOnLoad();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <Text style={styles.title}>MaikãodevNews</Text>
      {favoritesReleases.length >= 1 && (
        <View>
          <FlatList
            style={styles.list}
            data={favoritesReleases}
            renderItem={({ item }) => (
              <News
                titulo={item.titulo}
                introducao={item.introducao}
                produto_id={item.produto_id}
              />
            )}
            keyExtractor={(item) => String(item.titulo)}
          />
        </View>
      )}

      {favoritesReleases.length === 0 && (
        <View style={styles.content}>
          <Text>Você ainda não tem favoritos...</Text>
          <Link href="/" asChild>
            <TouchableOpacity
              style={styles.btn}
              activeOpacity={0.5}
              onPress={() => router.back()}
            >
              <Text style={styles.txtBtn}>Voltar</Text>
            </TouchableOpacity>
          </Link>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
  },
  title: {
    fontSize: 40,

    marginVertical: 24,
  },
  btn: {
    backgroundColor: '#222',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 16,
  },
  txtBtn: {
    color: '#fff',
  },
  list: {
    marginVertical: 16,
  },
});

