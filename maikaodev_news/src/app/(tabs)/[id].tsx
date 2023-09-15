import { Link } from 'expo-router';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';
import { useEffect } from 'react';
import { useRelease } from '../../hooks/useRelease';

export default function Product() {
  const {
    id,
    release,
    setRelease,
    fectchRelease,
    animationOnLoad,
    shareNews,
    router,
    offset,
    addToFavorites,
  } = useRelease();

  useEffect(() => {
    fectchRelease();
    animationOnLoad();

    return () => setRelease([]);
  }, []);

  useEffect(() => {
    animationOnLoad();
    fectchRelease();
  }, [id]);

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />

      <Text style={styles.title}>MaikãodevNews</Text>

      <Link href="/" asChild>
        <TouchableOpacity
          style={styles.btn}
          activeOpacity={0.5}
          onPress={() => router.back()}
        >
          <Text style={styles.txtBtn}>Voltar</Text>
        </TouchableOpacity>
      </Link>

      <Animated.View
        style={[
          styles.content,
          {
            transform: [
              {
                translateY: offset,
              },
            ],
          },
        ]}
      >
        {release.length >= 1 && (
          <>
            <Text style={styles.title}>{release[0].titulo}</Text>
            <Text style={styles.intro}>
              {release[0].introducao}
              {'\n'}
              {'\n'}
              Confira mais detalhes{' '}
              <Link
                // @ts-ignore
                href={release[0].link}
                style={styles.link}
              >
                aqui
              </Link>
            </Text>
            <Text style={styles.date}>
              Data da publicação:{' '}
              {release[0].data_publicacao.replace(' ', ' às ')}
            </Text>

            <View style={styles.wrapper}>
              <TouchableOpacity style={styles.btn} onPress={shareNews}>
                <Text style={styles.txtBtn}>Compartilhar notícia</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => addToFavorites(release[0])}
              >
                <Text style={styles.txtBtn}>Favoritar</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {release.length === 0 && (
          <>
            <Text style={styles.warn}>
              Desculpe, mas não contém informações sobre a notícia...
            </Text>
          </>
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
  },
  content: {
    gap: 24,
  },
  title: {
    fontSize: 40,

    marginVertical: 8,
  },
  btn: {
    backgroundColor: '#222',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  txtBtn: {
    color: '#fff',
  },
  intro: {
    fontSize: 18,
  },
  date: {
    fontWeight: '400',
  },
  link: {
    color: 'blue',
  },
  warn: {
    fontSize: 18,
  },
  wrapper: {
    flexDirection: 'row',
    gap: 16,
  },
});

