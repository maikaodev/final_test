import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { useWeather } from '../../hooks/useWeather';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const WeatherComponent = () => {
  const {
    inputValue,
    setInputValue,
    weather,
    setWeather,
    fetchData,
    handleChange,
  } = useWeather();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TextInput
          style={styles.txtInput}
          placeholder="Digite o nome da cidade"
          onChangeText={(text) => {
            setWeather(null);
            setInputValue(text);
            handleChange(text);
          }}
          value={inputValue}
        />
        <TouchableOpacity onPress={fetchData} style={styles.btn}>
          <Text>Obter clima</Text>
        </TouchableOpacity>
      </View>
      {weather && (
        <View style={styles.weather}>
          <Text>
            Temperatura: {(weather?.main?.temp - 273.15).toFixed(1)}°C
          </Text>
          <Text>
            Sensação térmica: {(weather?.main?.feels_like - 273.15).toFixed(1)}
            °C
          </Text>
          <Text>Umidade: {weather?.main?.humidity}%</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  content: {
    width: '100%',
    height: '60%',

    marginHorizontal: 'auto',

    flexDirection: 'row',

    justifyContent: 'center',

    alignItems: 'center',

    gap: 16,
  },
  weather: {
    margin: 10,
    flex: 1,
    height: '40%',
  },
  txtInput: {
    width: '70%',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderRadius: 16,
  },
  btn: {
    borderWidth: 1,
    borderColor: '#222',
    padding: 20,
    borderRadius: 16,
  },
});

