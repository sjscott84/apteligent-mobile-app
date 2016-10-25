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
import Triangle from './triangle';
import numeral from 'numeral';
import moment from 'moment';
import getData from './getData';

class CrashInfo extends Component {
  constructor(){
    super();
    this.state = {
      crashes: {}
    }
  }
  //This makes a call to the api and retrieves a list of crash groups for a specific app
  componentWillMount(){
    //combineCrashData function is from getData.js
    combineCrashData(this.props.id, (data) => {
      this.setState({crashes: data});
    });
  };

  render(){
    return(
      <View style={styles.container}>
        <View style={styles.topLinks}>
          <Icon.Button name="chevron-left" size={20} color='rgb(23,153,173)' backgroundColor='white' onPress={this._onPressBack.bind(this)} />
          <Text style={styles.dark18Text}>{this.props.name}</Text>
          <Icon.Button name="cog" size={20} color='rgb(98,129,133)' backgroundColor='white' onPress={this._onPressBack.bind(this)} />
        </View>
        <ScrollView>
          <View style={[styles.app, styles.crashInfo]}>
            <Summary what={'Crash Rate'} timeFrame={'Last 24h'} figure={numeral(this.state.crashPercent).format('0.00')+'%'} change={0.5} />
            <Summary what={'Crash Count'} timeFrame={'Last 24h'} figure={numeral(this.props.crashCount).format('0.0a')} change={-0.34} />
          </View>
          <View style={styles.app}>
            <Text style={styles.dark18Text}>NEW CRASH GROUPS IN ALL VERSIONS</Text>
            <Text style={styles.light14Text}>Last 24 Hours</Text>
            <Symbols users='Users Affected' occurances='Total Occurances' firstOccured='First Occured' lastOccured='Last Seen' />
          </View>
          <View>
            {this._getCrashInfo()}
          </View>
        </ScrollView>
      </View>
    )
  };

  _getCrashInfo(){
    const crashesArray = [];
    const crash = this.state.crashes;
    const nav = this.props.navigator;
    for(var i = 0; i < crash.length; i ++){
      crashesArray.push(<Crashes navigator={nav} 
        key={crashesArray.length}
        name={this.props.name}
        id={this.props.id}
        hash={crash[i]['hash']}
        crashName={crash[i]['crashName']}
        reason={crash[i]['crashReason']}
        users={crash[i]['affectedUsers']}
        occurances={crash[i]['totalOccurances']}
        firstOccured={crash[i]['firstOccured']}
        lastOccured={crash[i]['lastOccured']}
        status={crash[i]['status']}
        dailyOccurances={crash[i]['dailyOccurances']} />);
    }
    return crashesArray;
  }
  //Rerenders the AppDetails component
  _onPressBack(){
    this.props.navigator.pop();
  }
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

class Symbols extends Component {
  render(){
    return(
      <View>
        <View style={styles.crashInfoSymbels}>
          <View style={styles.crashInfoSymbels}>
            <Icon.Button name="user" size={20} color='rgb(122,143,147)' backgroundColor='white'>
              <Text style={styles.light14Text}>{this.props.users}</Text>
            </Icon.Button>
          </View>
          <View style={styles.crashInfoSymbels}>
            <Icon.Button name="bar-chart" size={20} color='rgb(122,143,147)' backgroundColor='white'>
              <Text style={styles.light14Text}>{this.props.occurances}</Text>
            </Icon.Button>
          </View>
        </View>
        <View style={styles.crashInfoSymbels}>
          <View style={styles.crashInfoSymbels}>
            <Icon.Button name="calendar-o" size={20} color='rgb(122,143,147)' backgroundColor='white'>
              <Text style={styles.light14Text}>{this.props.firstOccured}</Text>
            </Icon.Button>
          </View>
          <View style={styles.crashInfoSymbels}>
            <Icon.Button name="clock-o" size={20} color='rgb(122,143,147)' backgroundColor='white'>
              <Text style={styles.light14Text}>{this.props.lastOccured}</Text>
            </Icon.Button>
          </View>
        </View>
      </View>
    )
  }
}

class Crashes extends Component {
  render(){
    return(
      <View style={styles.app}>
        <Text style={styles.smallLink} onPress={this._onPress.bind(this)}>{this.props.crashName}</Text>
        <Text style={styles.dark15Text}>{this.props.reason}</Text>
        <Symbols users={this.props.users} occurances={this.props.occurances} firstOccured={moment(this.props.firstOccured).fromNow()} lastOccured={moment(this.props.lastOccured).format('DD MMM YYYY h:mm')} />
      </View>
    )
  }

  _onPress(){
    this.props.navigator.push({
      name: 'crashDetail',
      passProps: {
        name: this.props.name,
        hash: this.props.hash,
        id: this.props.id,
        crashName: this.props.crashName,
        reason: this.props.reason,
        users: this.props.users,
        occurances: this.props.occurances,
        firstOccured: this.props.firstOccured,
        lastOccured: this.props.lastOccured,
        status: this.props.status,
        dailyOccurances: this.props.dailyOccurances
      }});
  }
}

module.exports = CrashInfo;