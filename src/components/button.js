import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight
} from 'react-native';

import styles from './styleSheet';

class Button extends Component {
  render(){
    return(
      <TouchableHighlight style={styles.button} underlayColor={'gray'} onPress={this.props.onPress}>
        <Text style={styles.buttonText}>{this.props.text}</Text>
      </TouchableHighlight>
    )
  }
}

module.exports = Button;