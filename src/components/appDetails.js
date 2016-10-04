import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  Image
} from 'react-native';

import styles from './styleSheet';

var api = require('../library/api.js');

class AppDetails extends Component {
  render(){
    return(
      <View style={styles.container}>
        <View style={styles.topLinks}>
        </View>
        <View style={[styles.app, {height: 90}]}>
          <View style={styles.head}>
            <Image style={styles.logo} source={require('../images/logoTest.png')}/>
            <View style={styles.nameAndType}>
              <Text style={styles.largeText}>{this.props.name}</Text>
              <Text style={styles.light14Text}>{this.props.type}</Text>
            </View>
          </View>
          <Text style={styles.dark14Text}>Versions: All</Text>
        </View>
        <View style={[styles.app, styles.crashInfo]}>
          <Summary what={'MAU'} timeFrame={''} figure={'103K'} />
          <Summary what={'App load'} timeFrame={'Last 24h'} figure={'103K'} />
        </View>
        <CrashGraphs graphName={"CRASH RATE"} />
        <CrashGraphs graphName={"HTTP ERROR RATE"} />
      </View>
    )
  };
};

class Summary extends Component {
  render(){
    return(
      <View style={styles.appDetialSummaryItem}>
        <Text style={styles.dark15Text}>{this.props.what}</Text>
        <Text style={styles.light14Text}>{this.props.timeFrame}</Text>
        <Text style={styles.boldText}>{this.props.figure}</Text>
      </View>
    )
  }
};

class CrashGraphs extends Component {
  render(){
    return(
      <View style={[styles.app, {height: 234}]}>
      <Text style={styles.smallLink}>{this.props.graphName}</Text>
      </View>
    )
  }
}

module.exports = AppDetails;
