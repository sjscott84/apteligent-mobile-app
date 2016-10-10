import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView
} from 'react-native';

import styles from './styleSheet';
import BarChart from './barChart';
import Triangle from './triangle';
import Icon from 'react-native-vector-icons/FontAwesome';
//const backButton = (<Icon.Button name="rocket" size={30} color="#900" />)

var api = require('../library/api.js');

class AppDetails extends Component {
  constructor(props){
    super(props);
    this.state = {
      apps: props,
      crashRate: [5, 6.7, 4.3, 8, 11, 5, 3, 2.6, 8, 10, 14, 4.3],
      httpErrorRate: [0.2, 0.3, 0.7, 0.6, 1.2, 0.75, 0.85, 1.1, 0.432, 0.3, 0.46, 1.4]
    }
  }
  render(){
    return(
      <ScrollView style={styles.container}>
        <View style={styles.topLinks}>
        <Icon.Button name="chevron-left" size={20} color='rgb(23,153,173)' backgroundColor='white' onPress={this._onPressBack.bind(this)} />
        <Text style={styles.dark18Text}>{this.props.name}</Text>
        <Icon.Button name="cog" size={20} color='rgb(98,129,133)' backgroundColor='white' onPress={this._onPressBack.bind(this)} />
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
          <Summary what={'App load'} timeFrame={'Last 24h'} figure={this.props.appLoads} change={-0.34} />
        </View>
        <CrashGraphs navigator={this.props.navigator} id={this.props.id} name={this.props.name} graphName={"CRASH RATE"} rate={this.props.crashPercent} count={this.props.crashCount} data={this.state.crashRate} change={0.72} />
        <CrashGraphs name={this.props.name} graphName={"HTTP ERROR RATE"} rate={"1.5"} data={this.state.httpErrorRate} change={-0.7}/>
      </ScrollView>
    )
  };

  _onPressBack(){
    this.props.navigator.replace({name: 'appList'});
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

  _onPressNext(){
    this.props.navigator.push({
      name: 'crashInfo',
      passProps: {
        id: this.props.id,
        name: this.props.name,
        crashPercent: this.props.rate,
        crashCount: this.props.count
      }
    });
  };

  render(){
    return(
      <View style={[styles.app, {height: 234}]}>
        <View style={styles.border}>
          <Text onPress={this._onPressNext.bind(this)} style={styles.smallLink}>{this.props.graphName}</Text>
          <Text style={styles.light14Text}>Last 24h</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.boldText}>{this.props.rate+'%'}</Text>
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
