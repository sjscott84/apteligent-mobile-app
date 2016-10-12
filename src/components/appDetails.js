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
import moment from 'moment';
import numeral from 'numeral';

class AppDetails extends Component {
  constructor(props){
    super(props);
    this.state = {
      apps: props,
      mau: 'mau',
      crashRate: [],
      crashRateStart: 'Start',
      crashRateEnd: 'End',
      httpErrorRate: [0.2, 0.3, 0.7, 0.6, 1.2, 0.75, 0.85, 1.1, 0.432, 0.3, 0.46, 1.4]
    }
  };

  componentWillMount(){
    crashRateGraph(this.props.id, (data) =>{
      this.setState({
        crashRate: data['graph'],
        crashRateStart: moment(data['start']).format('h:mm A MM/DD/YYYY'),
        crashRateEnd: moment(data['end']).format('h:mm A MM/DD/YYYY')
      });
    })
    getMAU(this.props.id, (data) => {
      //console.log(data);
      this.setState({
        mau: data
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
            <Summary what={'MAU'} timeFrame={'Last 24h'} figure={numeral(this.state.mau).format('0.0a')} change={0.5} />
            <Summary what={'App load'} timeFrame={'Last 24h'} figure={this.props.appLoads} change={-0.34} />
          </View>
          <CrashGraphs navigator={this.props.navigator} id={this.props.id} name={this.props.name} graphName={"CRASH RATE"} rate={this.props.crashPercent} count={this.props.crashCount} data={this.state.crashRate} change={0.72} start={this.state.crashRateStart} end={this.state.crashRateEnd} />
          <CrashGraphs name={this.props.name} graphName={"HTTP ERROR RATE"} rate={"1.5"} data={this.state.httpErrorRate} change={-0.7} start='Start' end='End' />
        </ScrollView>
      </View>
    )
  };

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
  //This renders the CrashInfo component, providing more details about all the crashes
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
          <Text style={styles.light14Text}>Last 30 days</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.boldText}>{this.props.rate+'%'}</Text>
            <Triangle change={this.props.change}/>
            <Text style={[styles.light11Text, {marginTop: 4.5}]}>{this.props.change}%</Text>
          </View>
        </View>
        <View style={styles.border}>
          <BarChart data={this.props.data} start={this.props.start} end={this.props.end} />
        </View>
      </View>
    )
  }
}

module.exports = AppDetails;
