'use strict'

import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableHighlight
} from 'react-native';
import Svg,{
    Circle,
    Line
} from 'react-native-svg';

import styles from './styleSheet';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import getData from './getData';
import BarChart from './barChart';
import PieChart from './pieChart'
import Button from './button';

class CrashDetail extends Component {
  constructor(){
    super();
      this.state = {
        version: [],
        selectX1: 20,
        selectX2: Dimensions.get('window').width / 3 - 10,
        appVersionText: styles.dark15Text,
        osVersionText: styles.light15Text,
        deviceVersionText: styles.light15Text
      }
  }

  componentWillMount(){
    getCrashInfo(this.props.id, this.props.hash, () => {
      getCrashByAppVersion((data) => {
        this._summariseData(data);
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
            <Text style={[styles.dark15Text, {marginTop: 5}]}>CRASH DETAILS</Text>
            <Text style={styles.bold15Text}>{this.props.crashName}</Text>
            <Text style={styles.dark15Text}>{this.props.reason}</Text>
            <View style={[{flexDirection: 'row'}, {marginTop: 5}]}>
              <Text style={[{flex: 0.4}, styles.dark15Text]}>Status</Text>
              <Text style={[{flex: 0.6}, styles.bold15Text]}>{this.props.status}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={[{flex: 0.4}, styles.dark15Text]}>Occurred</Text>
              <Text style={[{flex: 0.6}, styles.bold15Text]}>{this.props.occurances} times</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={[{flex: 0.4}, styles.dark15Text]}>Affected</Text>
              <Text style={[{flex: 0.6}, styles.bold15Text]}>{this.props.users} users</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={[{flex: 0.4}, styles.dark15Text]}>Last Occured</Text>
              <Text style={[{flex: 0.6}, styles.bold15Text]}>{moment(this.props.lastOccured).format('DD MMM YYYY h:mm:ss a')}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={[{flex: 0.4}, styles.dark15Text]}>First Occured</Text>
              <Text style={[{flex: 0.6}, styles.bold15Text]}>{moment(this.props.firstOccured).format('DD MMM YYYY h:mm:ss a')}</Text>
            </View>
            <Text style={[styles.dark15Text, {marginTop: 10}]}>OCCURANCES</Text>
            <BarChart data={this.props.dailyOccurances} start={moment().subtract(30, 'days')} end={moment().format()} numberType='number' /> 
          </View>
          <View style={styles.app}>
            <Svg height={8} width={Dimensions.get('window').width}>
              <Line x1={this.state.selectX1} y1={3} x2={this.state.selectX2} y2={3} stroke={'rgb(54,143,175)'} strokeWidth={3} />
            </Svg>
            <View style={[{flexDirection: 'row'}, {justifyContent: 'space-around'}]}>
              <Text style={[this.state.appVersionText, {marginLeft: 0}]} onPress={this._onPressApp.bind(this)}>App Versions</Text>
              <Text style={[this.state.osVersionText, {marginLeft: 0}]} onPress={this._onPressOS.bind(this)}>OS Versions</Text>
              <Text style={[this.state.deviceVersionText, {marginLeft: 0}]} onPress={this._onPressDevice.bind(this)}>Devices</Text>
            </View>
            <View style={[{flexDirection: 'row'}, {marginTop: 40}, {marginLeft: 53}]}>
              <TouchableHighlight onPress={this._openInteractiveChart.bind(this)}>
                <View>
                <PieChart data={this.state.version} height={'150'} width={'150'} cx={75} cy={75} interactive={false} />
                </View>
              </TouchableHighlight>
              <View style={{marginLeft: 10}}>
                <TopCrashInfo color={'rgb(18,111,126)'} data={this.state.version} index={0} />
                {this._getTopCrashes()}
              </View>
            </View>
            <CrashList data={this.state.version} />
            <View style={[{flexDirection: 'row'}, {justifyContent: 'space-around'}]}>
              <Button text={'STACKTRACE'} onPress={this._onPressStacktrace.bind(this)} />
              <Button text={'BREADCRUMBS'} onPress={this._onPressBreadcrumbs.bind(this)} />
            </View>
          </View>
        </ScrollView>
      </View>
    )
  };

  _openInteractiveChart(){
    this.props.navigator.push({
      name: 'interactivePieChart',
      passProps: {
        name: this.props.name,
        data: this.state.version
      }
    });
  }

  //Display to two (or if only one, one) top crashes next to the bar chart
  _getTopCrashes(){
    if(this.state.version.length > 1){
      return (<TopCrashInfo color={'rgb(10,61,72)'} data={this.state.version} index={1} />);
    }
  };

  //Reduce data to show top 9 and combine all others into an 'All Others category'
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

  //Display the crashes sorted by app version and update the styles to reflect which crash sort is being used
  _onPressApp(){
    const width = Dimensions.get('window').width;
    this.setState({selectX1: 20, selectX2: width / 3 - 10, appVersionText: styles.dark15Text, osVersionText: styles.light15Text, deviceVersionText: styles.light15Text});
    getCrashByAppVersion((data) => {
      this._summariseData(data);
    })
  };

  //Display the crashes sorted by operating system version and update the styles to reflect which crash sort is being used
  _onPressOS(){
    const width = Dimensions.get('window').width;
    this.setState({selectX1: width / 3 + 20, selectX2: (width / 3 + 20) + (width / 3 - 10), appVersionText: styles.light15Text, osVersionText: styles.dark15Text, deviceVersionText: styles.light15Text })
    getCrashByOsVersion((data) => {
      this._summariseData(data);
    })
  };

  //Display the crashes sorted by device and update the styles to reflect which crash sort is being used
  _onPressDevice(){
    const width = Dimensions.get('window').width;
    this.setState({selectX1: (width / 3) * 2 + 20, selectX2: ((width / 3) * 2 + 20) + (width / 3 - 40), appVersionText: styles.light15Text, osVersionText: styles.light15Text, deviceVersionText: styles.dark15Text })
    getCrashByDevice((data) => {
      this._summariseData(data);
    })
  };

  //Go back to previous screen
  _onPressBack(){
    this.props.navigator.pop();
  };

  //Open the stacktrace screen
  _onPressStacktrace(){
    this.props.navigator.push({
      name: 'stacktrace',
      passProps: {
        name: this.props.name,
        crashName: this.props.crashName,
        reason: this.props.reason
      }
    });
  };

  //Open the breadcrumbs screen
  _onPressBreadcrumbs(){
    this.props.navigator.push({
      name: 'breadcrumbs',
      passProps: {
        name: this.props.name
      }
    });
  }
};

class CrashList extends Component {
  //Display as a list the same data as shown in the pie chart
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
        <Text style={[{flex: 0.35}, styles.bold14Text]}>Version</Text>
        <Text style={[{flex: 0.35}, styles.bold14Text]}>Crashes</Text>
        <Text style={[{flex: 0.3}, styles.bold14Text]}>Percentage</Text>
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
        <Text style={[{flex: 0.35}, styles.light14Text]}>{this.props.name}</Text>
        <Text style={[{flex: 0.35}, styles.light14Text]}>{this.props.value}</Text>
        <Text style={[{flex: 0.3}, styles.light14Text]}>{numeral(this.props.percent).format('0.00%')}</Text>
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