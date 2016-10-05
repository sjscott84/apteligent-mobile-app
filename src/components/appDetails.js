import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  Image
} from 'react-native';

import styles from './styleSheet';
import BarChart from './barChart';
import Triangle from './triangle';

var api = require('../library/api.js');

class AppDetails extends Component {
  constructor(){
    super();
    this.state = {
      crashRate: [5, 6.7, 4.3, 8, 11, 5, 3, 2.6, 8, 10, 14, 4.3],
      httpErrorRate: [0.2, 0.3, 0.7, 0.6, 1.2, 0.75, 0.85, 1.1, 0.432, 0.3, 0.46, 1.4]
    }
  }
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
          <Summary what={'MAU'} timeFrame={'Last 24h'} figure={'103K'} change={0.5} />
          <Summary what={'App load'} timeFrame={'Last 24h'} figure={'103K'} change={-0.34} />
        </View>
        <CrashGraphs graphName={"CRASH RATE"} rate={"0.23%"} data={this.state.crashRate} change={0.72} />
        <CrashGraphs graphName={"HTTP ERROR RATE"} rate={"1.5%"} data={this.state.httpErrorRate} change={-0.7}/>
      </View>
    )
  };
};

class Summary extends Component {
  render(){
    return(
      <View style={[styles.appDetailSummaryItem, styles.border]}>
        <Text style={styles.dark15Text}>{this.props.what}</Text>
        <Text style={styles.light14Text}>{this.props.timeFrame}</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.boldText}>{this.props.figure}</Text>
          <Triangle change={this.props.change}/>
          <Text style={[styles.light11Text, {marginTop: 4.5}]}>{this.props.change}%</Text>
        </View>
      </View>
    )
  }
};

class CrashGraphs extends Component {
  render(){
    return(
      <View style={[styles.app, {height: 234}]}>
        <View style={styles.border}>
          <Text style={styles.smallLink}>{this.props.graphName}</Text>
          <Text style={styles.light14Text}>Last 24h</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.boldText}>{this.props.rate}</Text>
            <Triangle change={this.props.change}/>
            <Text style={[styles.light11Text, {marginTop: 4.5}]}>{this.props.change}%</Text>
          </View>
        </View>
        <View style={styles.border}>
          <BarChart data={this.props.data} />
        </View>
      </View>
    )
  }
}

module.exports = AppDetails;
