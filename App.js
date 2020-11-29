import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ImageBackground,
  ActivityIndicator,
  StatusBar,
} from 'react-native';

import { fetchLocationId, fetchWeather } from './utils/api';
import { weatherIconGen } from './utils/helpingFunctions';
import getImageForWeather from './utils/getImageForWeather';

import SearchInput from './components/SearchInput';
import WeeklyWeather from './components/WeeklyWeather';

import { MaterialCommunityIcons } from '@expo/vector-icons';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: false,
      location: '',
      temperature: 0,
      weather: '',
      data: [],
    };
  }
  componentDidMount() {
    this.handleUpdateLocation('lagos');
  }
  handleUpdateLocation = async (city) => {
    if (!city) return;
    this.setState(
      {
        loading: true,
      },
      async () => {
        try {
          const locationId = await fetchLocationId(city);
          const { location, weather, temperature, value } = await fetchWeather(
            locationId
          );
          this.setState({
            loading: false,
            error: false,
            temperature,
            location,
            weather,
            data: [...value],
          });
        } catch (e) {
          this.setState({
            loading: false,
            error: true,
          });
        }
      }
    );
  };

  render() {
    const { location, temperature, weather, loading, error } = this.state;
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <StatusBar barStyle="light-content" />
        <ImageBackground
          source={getImageForWeather(weather)}
          style={styles.imageConatainer}
          imageStyle={styles.image}
        >
          <View style={styles.detailsContainer}>
            <ActivityIndicator animating={loading} color="white" size="large" />
            {!loading && (
              <View>
                {error && (
                  <Text style={[styles.smallText, styles.textStyle]}>
                    Could not load weather, please try a different city
                  </Text>
                )}
                {!error && (
                  <View>
                    <Text style={[styles.largeText, styles.textStyle]}>
                      {location}
                    </Text>
                    <Text style={[styles.smallText, styles.textStyle]}>
                      {weather}
                    </Text>

                    <View style={styles.row}>
                      <View style={[styles.gap, styles.center]}>
                        <MaterialCommunityIcons
                          name={weatherIconGen(weather)}
                          size={45}
                          color="white"
                        />
                      </View>
                      <View style={styles.gap}>
                        <Text style={[styles.largeText, styles.textStyle]}>
                          {Math.round(temperature)}°
                        </Text>
                      </View>
                    </View>
                  </View>
                )}
              </View>
            )}

            <SearchInput
              placeholder="Search any city"
              onSubmit={this.handleUpdateLocation}
            />
            {!error && <WeeklyWeather data={this.state.data} />}
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34495E',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  gap: {
    marginHorizontal: 5,
  },
  center: {
    justifyContent: 'center',
  },
  textStyle: {
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
    color: 'white',
  },
  largeText: {
    fontSize: 44,
  },
  smallText: {
    fontSize: 18,
  },
  imageConatainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  detailsContainer: {
    flex: 1,
    paddingTop: 150,
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 10,
  },
});
