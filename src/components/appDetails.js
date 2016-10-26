'use strict'

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
import getData from './getData';
import numeral from 'numeral';
import moment from'moment';
import Button from './button';

class AppDetails extends Component {
  constructor(props){
    super(props);
    this.state = {
      apps: props,
      time: 'PT5M',
      displayTime: 'Last 5min',
      mau: 'mau',
      dau: 'dau',
      crashPercent: 0,
      crashCountTotal: 0,
      crashRateArray: [1],
      appLoadArray: [1],
      start: '',
      end: '',
      appLoadTotalLive: 0,
      crashCountTotalLive: 0
    }
  };

  componentWillMount(){
    getMAU(this.props.id, (data) => {
      //console.log(data);
      this.setState({
        mau: data
      })
    })
    getDAU(this.props.id, (data) =>{
      this.setState({
        dau: data
      })
    })
    getCrashSummaries(this.props.id, (percent, count) => {
      this.setState({
        crashPercent: percent,
        crashCountTotal: count
      })
    })
    crashCountGraph(this.props.id, this.state.time, (rate, loads, start, end, appLoadTotal, crashCountTotal) => {
      console.log(rate, loads, start, end, appLoadTotal, crashCountTotal);
      this.setState({
        crashRateArray: rate,
        appLoadArray: loads,
        start: start,
        end: end,
        appLoadTotalLive: appLoadTotal,
        crashCountTotalLive: crashCountTotal
      })
    })
  }
  render(){
    return(
      <View style={styles.container}>
        <View style={styles.topLinks}>
          <Icon.Button name="chevron-left" size={20} color='rgb(23,153,173)' backgroundColor='white' onPress={this._onPressBack.bind(this)} />
          <Text style={styles.dark18Text}>{this.props.name}</Text>
          <Icon.Button name="cog" size={20} color='rgb(98,129,133)' backgroundColor='white' onPress={this._onPressBack.bind(this)} />
        </View>
        <ScrollView>
          <View style={styles.app}>
            <View style={{flexDirection: 'row'}}>
              <Image style={styles.logo} source={require('../images/logoTest.png')}/>
              <View>
                <Text style={styles.largeText}>{this.props.name}</Text>
                <Text style={styles.light14Text}>{this.props.type}</Text>
              </View>
            </View>
            <View style={[{borderColor: 'rgb(229,234,236)'}, {borderWidth: 1}]}>
              <Text style={styles.dark14Text}>Versions: All</Text>
            </View>
            <View style={styles.crashInfo}>
              <Summary what='DAU' timeFrame='Current 24h' figure={numeral(this.state.dau).format('0.0a')} />
              <Summary what='MAU' timeFrame='Current 30 days' figure={numeral(this.state.mau).format('0.0a')} />
            </View>
          </View>
          <View style={styles.app}>
            <View style={styles.crashInfo}>
              <Summary what='Crash rate' timeFrame='Current 24h' figure={numeral(this.state.crashPercent).format('0.00')+'%'} />
              <Summary what='Crash count' timeFrame='Current 24h' figure={numeral(this.state.crashCountTotal).format('0.0a')} />
            </View>
          </View>
          <Button style={{margins: 6}} text={'VIEW CRASH SUMMARY'} onPress={this._onPress.bind(this)} />
          <View style={styles.app}>
            <View style={[{flexDirection: 'row'}, {justifyContent: 'space-between'}, {alignItems: 'center'}, {borderBottomColor: 'rgb(122,143,147)'}, {borderBottomWidth: 1}]}>
              <Text style={styles.bold15Text}>LIVE STATS</Text>
              <Icon.Button name="clock-o" size={15} color='rgb(98,129,133)' backgroundColor='white' onPress={this._onPressChangeGraph.bind(this)} />
            </View>
            <CrashGraphs 
              graphName={'CRASH COUNT'}
              liveCount={this.state.crashCountTotalLive}
              data={this.state.crashRateArray}
              start={this.state.start}
              end={this.state.end} />
            <CrashGraphs 
              graphName={'APP LOAD COUNT'}
              liveCount={this.state.appLoadTotalLive}
              data={this.state.appLoadArray}
              start={this.state.start}
              end={this.state.end} />
          </View>
        </ScrollView>
      </View>
    )
  };

  _onPress(){
    this.props.navigator.push({
      name: 'crashInfo',
      passProps: {
        id: this.props.id,
        name: this.props.name,
        crashPercent: this.state.crashPercent,
        crashCount: this.state.crashCountTotal
      }
    });
  }

  _onPressChangeGraph(){
    console.log('change');
  }

  //This rerenders the appList component (as this component can be accessed from mulitple places it was not appropriate to use the 'pop' navigator method)
  _onPressBack(){
    this.props.navigator.replace({name: 'appList'});
  };
};

class Summary extends Component {
  render(){
    return(
      <View style={[styles.appDetailSummaryItem, styles.border]}>
        <Text style={styles.dark15Text}>{this.props.what}</Text>
        <Text style={styles.light13Text}>{this.props.timeFrame}</Text>
        <Text style={styles.boldText}>{this.props.figure}</Text>
      </View>
    )
  }
};

class CrashGraphs extends Component {
  render(){
    return(
      <View style={[{borderBottomColor: 'rgb(244,246,247)'}, {borderBottomWidth: 1}]}>
        <View>
          <Text style={styles.dark15Text}>{this.props.graphName}</Text>
          <Text style={styles.light14Text}>Last 5min</Text>
          <Text style={styles.boldText}>{numeral(this.props.liveCount).format('0.0a')}</Text>
        </View>
        <View>
          <BarChart data={this.props.data} start={this.props.start} end={this.props.end} numberType='number' />
        </View>
      </View>
    )
  }
}

class AppInfo extends Component {
  render (){
    return (
      <View>
        <Text style={styles.dark13Text}>{this.props.name}</Text>
        <Text style={styles.light11Text}>Last 24h</Text>
        <Text style={styles.boldText}>{this.props.data}</Text>
      </View>
    )
  }
}

module.exports = AppDetails;
