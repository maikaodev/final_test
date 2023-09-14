import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
} from 'react-native';
import { useFilms } from '../hooks/useFilms';
import { ScrollView } from 'react-native-gesture-handler';
import { Item } from '../components/Card';

export default function App() {
  const { movies } = useFilms();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />
      <Text style={styles.title}>MaikãodevTV</Text>

      <FlatList
        style={styles.content}
        data={movies}
        renderItem={({ item }) => (
          <Item
            title={item.title}
            url={item.poster_path}
            description={item.overview}
          />
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 40,

    marginVertical: 24,
  },
  content: {
    flex: 1,
    width: '100%',
    backgroundColor: '#eeeeee',
  },
});

