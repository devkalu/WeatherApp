import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

export default class SearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  //Type Validation
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
  };
  //default inputs
  static defaultProps = {
    placeholder: '',
  };

  handleChangeText(text) {
    this.setState({ text });
  }
  //fetch data
  handleSubmitEditing = () => {
    const { onSubmit } = this.props;
    const { text } = this.state;
    if (!text) return;
    onSubmit(text);
    this.setState({ text: '' });
  };

  render() {
    const { placeholder } = this.props;
    const { text } = this.state;
    return (
      <View style={styles.container}>
        <TextInput
          value={text}
          autoCorrect={false}
          placeholder={placeholder}
          placeholderTextColor="white"
          style={styles.textInput}
          clearButtonMode="always"
          underlineColorAndroid="transparent"
          onChangeText={this.handleChangeText.bind(this)}
          onSubmitEditing={this.handleSubmitEditing.bind(this)}
        />
      </View>
    );
  }
}

// SearchInput.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
//   placeholder: PropTypes.string,
// };

// SearchInput.defaultProps = {
//   placeholder: '',
// };

const styles = StyleSheet.create({
  container: {
    height: 40,
    marginTop: 20,
    backgroundColor: '#666',
    marginHorizontal: 40,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  textInput: {
    flex: 1,
    color: 'white',
  },
});
