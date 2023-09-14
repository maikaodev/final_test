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
import { WeatherComponent } from '../components/WeatherDetails';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />
      <Text style={styles.title}>MaikãodevTV</Text>
      <WeatherComponent />
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

