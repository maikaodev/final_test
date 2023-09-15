import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Share,
} from 'react-native';
import api from '../api';
import { useEffect, useState } from 'react';
import { ReleaseProps } from '../@types/hooks';

export default function Product() {
  const [release, setRelease] = useState<ReleaseProps[]>([]);
  const [offset, setOffset] = useState(new Animated.Value(100));

  const router = useRouter();

  const { id } = useLocalSearchParams();

  const handleOnLoad = () => {
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

  useEffect(() => {
    fectchRelease();
    handleOnLoad();
  }, []);

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

      {release.length >= 1 && (
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

          <TouchableOpacity style={styles.btn} onPress={shareNews}>
            <Text style={styles.txtBtn}>Compartilhar notícia</Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      {release.length === 0 && (
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
          <Text style={styles.warn}>
            Desculpe, mas não contém informações sobre a notícia...
          </Text>
        </Animated.View>
      )}
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
});

