import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';
import api from '../api';
import { useEffect, useState } from 'react';
import { ReleaseProps } from '../@types/hooks';
import { transform } from 'typescript';

export default function Product() {
  const [release, setRelease] = useState<ReleaseProps[]>([]);
  const [offset, setOffset] = useState(new Animated.Value(100));

  const handleOnLoad = () => {
    Animated.timing(offset, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const router = useRouter();

  const { id } = useLocalSearchParams();

  const fectchRelease = async () => {
    const response = await api.get(`?tipo=release&idproduto=${id}&qtd=1`);

    setRelease(response.data.items);
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
          <Text style={styles.intro}>{release[0].introducao}</Text>
          <Text style={styles.date}>
            Data da publicação:{' '}
            {release[0].data_publicacao.replace(' ', ' às ')}
          </Text>
          <Link
            // @ts-ignore
            href={release[0].link}
            style={styles.link}
          >
            Confira mais detalhes aqui
          </Link>
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

    marginVertical: 24,
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
    backgroundColor: '#222',
    color: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  warn: {
    fontSize: 18,
  },
});

