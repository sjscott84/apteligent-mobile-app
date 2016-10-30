'use strict'

import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  ScrollView,
  TouchableHighlight
} from 'react-native';
import Svg,{
    Rect
} from 'react-native-svg';

import styles from './styleSheet';
import getData from './getData';
import Button from './button';
import Icon from 'react-native-vector-icons/FontAwesome';


class CrashSummary extends Component {
  constructor(){
    super();
    this.state = {
      fill: 'rgb(255,255,255)'
    }
  }
  render(){
    return(
      <View style={styles.container}>
        <View style={styles.topLinks}>
          <Icon.Button name="chevron-left" size={20} color='rgb(23,153,173)' backgroundColor='white' onPress={this._onPressBack.bind(this)} />
          <Text style={styles.dark18Text}>{this.props.name}</Text>
          <Icon.Button name="cog" size={20} color='rgb(98,129,133)' backgroundColor='white' />
        </View>
        <View style={styles.app}>
          <Text style={styles.dark15Text}>SETTINGS</Text>
          <Text style={styles.dark15Text}>Please select a time range</Text>
          <View style={[{flexDirection: 'row'}, {alignItems: 'center'}]}>
            <Svg style={{marginLeft: 6}} height={'15'} width={'15'}>
              <Rect x={'0'} y={'0'} width={'15'} height={'15'} stroke={'rgb(52,73,76)'} strokeWidth={'1'} fill={this.state.fill} />
            </Svg>
            <Text style={styles.dark15Text}>Last day</Text>
          </View>
          <View style={[{flexDirection: 'row'}, {alignItems: 'center'}]}>
            <Svg style={{marginLeft: 6}} height={'15'} width={'15'}>
              <Rect x={'0'} y={'0'} width={'15'} height={'15'} stroke={'rgb(52,73,76)'} strokeWidth={'1'} fill={this.state.fill} />
            </Svg>
            <Text style={styles.dark15Text}>Last 7 days</Text>
          </View>
          <View style={[{flexDirection: 'row'}, {alignItems: 'center'}]}>
            <Svg style={{marginLeft: 6}} height={'15'} width={'15'}>
              <Rect x={'0'} y={'0'} width={'15'} height={'15'} stroke={'rgb(52,73,76)'} strokeWidth={'1'} fill={this.state.fill} />
            </Svg>
            <Text style={styles.dark15Text}>Last 30 days</Text>
          </View>
        </View>
      </View>
    )
  };

    //Go back to previous screen
  _onPressBack(){
    this.props.navigator.pop();
  };
};





module.exports = CrashSummary;