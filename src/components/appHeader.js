'use strict'

import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

import styles from './styleSheet';
import Icon from 'react-native-vector-icons/FontAwesome';

//The Applist component displays each available app along with some basic data
class AppHeader extends Component {

  render (){
    return (
      <View style={styles.topLinks}>
        <Icon.Button name="chevron-left" size={20} color='rgb(23,153,173)' backgroundColor='white' onPress={this._onPressBack.bind(this)} />
        <Text style={styles.dark18Text}>{this.props.name}</Text>
        <Icon style={{marginRight: 20}} name="search" size={20} color='rgb(98,129,133)' backgroundColor='white' onPress={this._onPressApps.bind(this)} />
      </View>
    )
  };

  //Go back to last route on stack
  _onPressBack(){
    this.props.navigator.pop();
  };

  //Open available apps route
  _onPressApps(){
    this.props.navigator.push({
      name: 'availableApps'
    })
  }
};

module.exports = AppHeader;