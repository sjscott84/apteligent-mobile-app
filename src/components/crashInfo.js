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
import Triangle from './triangle';
import numeral from 'numeral'


class CrashInfo extends Component {
  render(){
    return(
      <View style={styles.container}>
        <View style={styles.topLinks}>
          <Icon.Button name="chevron-left" size={20} color='rgb(23,153,173)' backgroundColor='white' onPress={this._onPressBack.bind(this)} />
          <Text style={styles.dark18Text}>{this.props.name}</Text>
          <Icon.Button name="cog" size={20} color='rgb(98,129,133)' backgroundColor='white' onPress={this._onPressBack.bind(this)} />
        </View>
        <View style={[styles.app, styles.crashInfo]}>
          <Summary what={'Crash Rate'} timeFrame={'Last 24h'} figure={this.props.crashPercent} change={0.5} />
          <Summary what={'Crash Count'} timeFrame={'Last 24h'} figure={numeral(this.props.crashCount).format('0.0a')} change={-0.34} />
        </View>
        <View style={styles.app}>
          <Text style={styles.dark18Text}>NEW CRASH GROUPS IN ALL VERSIONS</Text>
          <Text style={styles.light14Text}>Last 24 Hours</Text>
          <View style={[{flexDirection: 'row'}, {justifyContent:'flex-start'}]}>
            <Icon.Button name="user" size={20} color='rgb(122,143,147)' backgroundColor='white'>
              <Text style={styles.light14Text}>Users Affected</Text>
            </Icon.Button>
            <Icon.Button name="bar-chart" size={20} color='rgb(122,143,147)' backgroundColor='white'>
              <Text style={styles.light14Text}>Total Occurances</Text>
            </Icon.Button>
          </View>
          <View style={[{flexDirection: 'row'}, {justifyContent:'flex-start'}]}>
            <Icon.Button name="calendar-o" size={20} color='rgb(122,143,147)' backgroundColor='white'>
              <Text style={styles.light14Text}>First Occured</Text>
            </Icon.Button>
            <Icon.Button name="clock-o" size={20} color='rgb(122,143,147)' backgroundColor='white'>
              <Text style={styles.light14Text}>Last Seen</Text>
            </Icon.Button>
          </View>
        </View>
      </View>
    )
  };

  _onPressBack(){
    this.props.navigator.pop();
  }
}

class Summary extends Component {
  render(){
    return(
      <View style={[styles.appDetailSummaryItem, styles.border]}>
        <Text style={styles.dark15Text}>{this.props.what}</Text>
        <Text style={styles.light14Text}>{this.props.timeFrame}</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.boldText}>{this.props.figure+'%'}</Text>
          <Triangle change={this.props.change}/>
          <Text style={[styles.light11Text, {marginTop: 4.5}]}>{this.props.change}%</Text>
        </View>
      </View>
    )
  }
};

module.exports = CrashInfo;