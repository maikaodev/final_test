import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { useNews } from '../hooks/useNews';
import { FlatList } from 'react-native-gesture-handler';
import { News } from '../components/news';

export default function App() {
  const { fetchNews, news } = useNews();

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />
      <Text style={styles.title}>MaikãodevNews</Text>

      <FlatList
        style={styles.list}
        data={news}
        renderItem={({ item }) => (
          <News
            titulo={item.titulo}
            introducao={item.introducao}
            produto_id={item.produto_id}
          />
        )}
        keyExtractor={(item) => String(item.titulo)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
    alignItems: 'center',
    justifyContent: 'flex-start',
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

