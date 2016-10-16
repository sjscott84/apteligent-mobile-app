'use strict'

import React, { Component } from 'react';
import {
  AppRegistry,
  Image,
  Text,
  View,
  ScrollView,
  Dimensions,
} from 'react-native';
import Svg,{
    Circle
} from 'react-native-svg';

import styles from './styleSheet';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import getData from './getData';
import BarChart from './barChart';
import PieChart from './pieChart'

class CrashDetail extends Component {
  constructor(){
    super();
      this.state = {
        version: []
      }
  }

  componentWillMount(){
    getCrashByAppVersion(this.props.id, this.props.hash, (data) => {
      this._summariseData(data);
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
            <Text style={styles.dark15Text}>CRASH DETAILS</Text>
            <Text style={styles.bold15Text}>{this.props.crashName}</Text>
            <Text style={styles.dark15Text}>{this.props.reason}</Text>
            <Text style={styles.dark15Text}>Status: {this.props.status}</Text>
            <Text style={styles.dark15Text}>Occurred: {this.props.occurances} times</Text>
            <Text style={styles.dark15Text}>Affected: {this.props.users} users</Text>
            <Text style={styles.dark15Text}>Last Occured: {moment(this.props.lastOccured).format('DD MMM YYYY h:mm:ss a')}</Text>
            <Text style={styles.dark15Text}>First Occured: {moment(this.props.firstOccured).format('DD MMM YYYY h:mm:ss a')}</Text>
            <Text style={styles.dark15Text}>OCCURANCES</Text>
            <BarChart data={this.props.dailyOccurances} start={this.props.firstOccured} end={this.props.lastOccured} numberType='number' /> 
          </View>
          <View style={styles.app}>
            <View style={[{flexDirection: 'row'}, {justifyContent: 'space-around'}]}>
              <Text style={styles.dark15Text} onPress={this._onPressApp.bind(this)}>App Versions</Text>
              <Text style={styles.dark15Text} onPress={this._onPressOS.bind(this)}>OS Versions</Text>
              <Text style={styles.dark15Text} onPress={this._onPressDevice.bind(this)}>Devices</Text>
            </View>
            <View style={[{flexDirection: 'row'}, {marginTop: 40}, {marginLeft: 53}]}>
              <PieChart data={this.state.version} />
              <View style={{marginLeft: 10}}>
                <TopCrashInfo color={'rgb(18,111,126)'} data={this.state.version} index={0} />
                <TopCrashInfo color={'rgb(10,61,72)'} data={this.state.version} index={1} />
              </View>
            </View>
            <CrashList data={this.state.version} />
          </View>
        </ScrollView>
      </View>
    )
  };

  _summariseData(data){
    const dataTotal = Math.ceil(data.reduce((n, d) => d.value + n, 0));
    if(data.length > 10){
      let arrayLength = data.length;
      let summary = data.splice(9, arrayLength);
      let summaryTotal = Math.ceil(summary.reduce((n, d) => d.value + n, 0));
      data.push({label: 'All Others', value: summaryTotal});
      this.setState({version: data});
    }else{
      this.setState({version: data});
    }
  };

  _onPressApp(){
    getCrashByAppVersion(this.props.id, this.props.hash, (data) => {
      this._summariseData(data);
    })
  };

  _onPressOS(){
    getCrashByOsVersion(this.props.id, this.props.hash, (data) => {
      this._summariseData(data);
    })
  };

  _onPressDevice(){
    getCrashByDevice(this.props.id, this.props.hash, (data) => {
      this._summariseData(data);
    })
  };

  _onPressBack(){
    this.props.navigator.pop();
  };
};

class CrashList extends Component {
  _getDetails(){
    let allDetails = [];
    let total = Math.ceil(this.props.data.reduce((n, d) => d.value + n, 0));
    for(var i = 0; i < this.props.data.length; i++){
      let data = this.props.data[i];
      let percent = data['value'] / total;
      allDetails.push(<CrashItem key={[i]} name={data['label']} value={data['value']} percent={percent} />);
    }
    return allDetails
  }

  render(){
    return(
      <View style={{marginTop: 31}}>
      <View style={[{flex: 1}, {flexDirection: 'row'}, {justifyContent: 'flex-start'}]}>
        <Text style={[{flex: 0.4}, styles.bold14Text]}>Version</Text>
        <Text style={[{flex: 0.4}, styles.bold14Text]}>Crashes</Text>
        <Text style={[{flex: 0.2}, styles.bold14Text]}>Percentage</Text>
      </View>
        {this._getDetails()}
      </View>
    )
  }
}

class CrashItem extends Component {
  render(){
    return(
      <View style={[{flex: 1}, {flexDirection: 'row'}, {justifyContent: 'flex-start'}]}>
        <Text style={[{flex: 0.4}, styles.light14Text]}>{this.props.name}</Text>
        <Text style={[{flex: 0.4}, styles.light14Text]}>{this.props.value}</Text>
        <Text style={[{flex: 0.2}, styles.light14Text]}>{numeral(this.props.percent).format('0.00%')}</Text>
      </View>
    )
  }
}

class TopCrashInfo extends Component {
  render(){
    return(
      <View>
        <View style={{flexDirection: 'row'}}>
          <Svg height={20} width={13}>
            <Circle cx={6.5} cy={11} r={6.5} fill={this.props.color} />
          </Svg>
          {this._getText()}
        </View>
      </View>
    )
  };

  _getText(){
    let data = this.props.data;
    let index = this.props.index;
    let total = Math.ceil(this.props.data.reduce((n, d) => d.value + n, 0));
    if(data[index] !== undefined){
      let percent = numeral(data[index]['value'] / total ).format('0.00%');
      return (
        <View>
          <Text style={styles.bold15Text}>{percent}</Text>
          <Text style={styles.bold15Text}>{data[index]['label']}</Text>
          <Text style={styles.light14Text}>{data[index]['value']+' crashes'}</Text>
        </View>
      )
    }
    return <Text>{'Value'}</Text>
  }
}

module.exports = CrashDetail;