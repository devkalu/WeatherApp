import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

import DailyWeather from './DailyWeather';

const uniqueId = () => {
  return '_' + Math.random().toString(36).substr(2, 9);
};

const filterOutToday = (arr) => {
  const res = [];
  for (i = 1; i < arr.length; i++) {
    res.push(arr[i]);
  }
  return res;
};

const WeeklyWeather = ({ data }) => {
  const filteredWeather = filterOutToday(data);
  return (
    <View style={styles.container}>
      <FlatList
        data={filteredWeather}
        keyExtractor={() => uniqueId()}
        renderItem={({ item }) => {
          return (
            <DailyWeather
              day={item.applicable_date}
              temperature={item.the_temp}
              weather={item.weather_state_name}
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    flex: 1,
  },
});
export default WeeklyWeather;
