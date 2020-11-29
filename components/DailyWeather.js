import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { weatherIconGen, dateConverter } from '../utils/helpingFunctions';

const DailyWeather = ({ day, temperature, weather }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>{dateConverter(day)}</Text>
      <MaterialCommunityIcons
        name={weatherIconGen(weather)}
        size={24}
        color="white"
      />

      <Text style={styles.textStyle}>{Math.round(temperature)}°</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    marginHorizontal: 40,
    height: 50,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
  },
  textStyle: {
    color: 'white',
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
    fontSize: 18,
    fontWeight: '500',
  },
});
export default DailyWeather;
