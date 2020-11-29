export const weatherIconGen = (data) => {
  const value = data.toLowerCase();
  switch (value) {
    case 'sleet':
    case 'snow':
      return 'weather-partly-snowy';
    case 'hail':
      return 'weather-hail';
    case 'thunderstorm':
      return 'weather-lightning';
    case 'heavy rain':
      return 'weather-pouring';
    case 'light rain':
      return 'weather-rainy';
    case 'showers':
      return 'weather-partly-rainy';
    case 'heavy cloud':
    case 'light cloud':
      return 'weather-partly-cloudy';
    case 'clear':
      return 'weather-sunny';
    default:
      return 'weather-cloudy-alert';
  }
};

export const dateConverter = (date) => {
  const dateArr = date.split('-').map(Number);
  const day = new Date(dateArr[0], dateArr[1] - 1, dateArr[2]);

  return day.toString().split(' ')[0];
};
