'use strict'

import React, { Component } from 'react';
import {
  AppRegistry,
  Image,
  Text,
  View,
  ScrollView
} from 'react-native';

import styles from './styleSheet';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import getData from './getData';
import BarChart from './barChart';

class CrashDetail extends Component {
  render(){
    return(
      <View style={styles.container}>
        <View style={styles.topLinks}>
          <Icon.Button name="chevron-left" size={20} color='rgb(23,153,173)' backgroundColor='white' onPress={this._onPressBack.bind(this)} />
          <Text style={styles.dark18Text}>{this.props.name}</Text>
          <Icon.Button name="cog" size={20} color='rgb(98,129,133)' backgroundColor='white' onPress={this._onPressBack.bind(this)} />
        </View>
        <View style={styles.app}>
          <Text style={styles.dark15Text}>CRASH DETAILS</Text>
          <Text style={styles.bold15Text}>{this.props.crashName}</Text>
          <Text style={styles.dark15Text}>{this.props.reason}</Text>
          <Text style={styles.dark15Text}>Status: {this.props.status}</Text>
          <Text style={styles.dark15Text}>Occurred: {this.props.occurances}</Text>
          <Text style={styles.dark15Text}>Affected: {this.props.users}</Text>
          <Text style={styles.dark15Text}>Last Occured: {moment(this.props.lastOccured).format('DD MMM YYYY h:mm:ss a')}</Text>
          <Text style={styles.dark15Text}>First Occured: {moment(this.props.firstOccured).format('DD MMM YYYY h:mm:ss a')}</Text>
          <Text style={styles.dark15Text}>OCCURANCES</Text>
          <BarChart data={this.props.dailyOccurances} start={this.props.firstOccured} end={this.props.lastOccured} numberType='number' /> 
        </View>
      </View>
    )
  }

  _onPressBack(){
    this.props.navigator.pop();
  }
};

module.exports = CrashDetail;