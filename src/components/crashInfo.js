import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
  Text,
  View,
  ScrollView
} from 'react-native';

import styles from './styleSheet';
import Icon from 'react-native-vector-icons/FontAwesome';


class CrashInfo extends Component {
  render(){
    return(
      <View style={styles.container}>
        <View style={styles.topLinks}>
          <Icon.Button name="chevron-left" size={20} color='rgb(23,153,173)' backgroundColor='white' onPress={this._onPressBack.bind(this)} />
          <Text style={styles.dark18Text}>{this.props.name}</Text>
          <Icon.Button name="cog" size={20} color='rgb(98,129,133)' backgroundColor='white' onPress={this._onPressBack.bind(this)} />
        </View>
      </View>
    )
  };

  _onPressBack(){
    this.props.navigator.pop();
  }
}

module.exports = CrashInfo;