import { View, Text, StyleSheet, Animated } from 'react-native';

import { NewsProps } from '../@types/hooks';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';

export const News = ({ titulo, introducao, produto_id }: NewsProps) => {
  const [offset, setOffset] = useState(new Animated.Value(100));

  const handleOnLoad = () => {
    Animated.timing(offset, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    handleOnLoad();
  }, []);

  return (
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
      <Text style={styles.title}>{titulo}</Text>
      <Text style={styles.intro} numberOfLines={2}>
        {introducao}
      </Text>
      <Link style={styles.btn} href={`/${produto_id}`}>
        Ver mais
      </Link>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 24,

    gap: 16,
    marginBottom: 16,

    marginHorizontal: 'auto',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  intro: {
    fontSize: 18,
  },
  btn: {
    paddingHorizontal: 20,
    paddingVertical: 12,

    alignSelf: 'flex-end',

    backgroundColor: '#222',

    borderRadius: 6,
    color: '#fff',
  },
});

