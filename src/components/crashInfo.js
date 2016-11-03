'use strict'

import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  ActivityIndicator,
  AsyncStorage
} from 'react-native';

import styles from './styleSheet';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import getData from './getData';
import AppFooter from './appFooter';
import AppHeader from './appHeader';

class CrashInfo extends Component {
  constructor(){
    super();
    this.state = {
      crashesArray: [],
      userPressed: true,
      occurancesPressed: false,
      firstSeenPressed: false,
      lastSeenPressed: false,
      isLoading: true,
      animating: true,
      time: '1',
      version: 'all'
    }
  }
  //This makes a call to the api and retrieves a list of crash groups for a specific app
  componentWillMount(){
    let time;
    let version;
    AsyncStorage.getItem('crashTime')
      .then((value) => {
        time = value;
        return AsyncStorage.getItem('crashVersion')
        })
        .then((value) => {
          version = value;
          if(value && version){
            this.setState({time: time, version: version});
          }
        })
        .then(() => {
        //combineCrashData function is from getData.js
        combineCrashData(this.props.id, this.state.time, this.state.version, 'usersAffected', (data) => {
          this._getCrashInfo(data);
          this.setState({isLoading: false});
        });
      })
  };

  render(){
    var spinner = this.state.isLoading ? (<ActivityIndicator animating={this.state.animating} style={[{height: 80}]} size='large'/>) :
    (<View>
      <View style={[{flexDirection: 'row'}, {justifyContent: 'flex-end'}, {alignItems: 'center'}]}>
        <Text style={[styles.bold13Text, {marginBottom: 1}, {marginTop: 6}, {marginRight: 6}]}>{this._getTime()}</Text>
        <Icon.Button name="cog" size={20} color='rgb(98,129,133)' backgroundColor='rgb(229,234,236)' onPress={this._onPressSettings.bind(this)} />
      </View>
      <View style={styles.app}>
        <Text style={styles.dark18Text}>NEW CRASH GROUPS IN ALL VERSIONS</Text>
        <Text style={styles.light13Text}>Sorted By</Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={this._sortData.bind(this, 'usersAffected')}>
            <View style={[styles.iconButton, {width: (Dimensions.get('window').width - 50)/2}, this.state.userPressed ? {backgroundColor: 'rgb(122,143,147)'} : {backgroundColor: 'rgb(255,255,255)'}]}>
              <Icon name={'user'} size={19} color={this.state.userPressed ? 'rgb(255,255,255)' : 'rgb(122,143,147)'} />
              <Text style={[styles.light13Text, this.state.userPressed ? {color: 'rgb(255,255,255)'} : {color: 'rgb(122,143,147)'}]}>Users Affected</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._sortData.bind(this, 'timesOccurred')}>
            <View style={[styles.iconButton, {width: (Dimensions.get('window').width - 50)/2}, this.state.occurancesPressed ? {backgroundColor: 'rgb(122,143,147)'} : {backgroundColor: 'rgb(255,255,255)'}]}>
              <Icon name={'bar-chart'} size={19} color={this.state.occurancesPressed ? 'rgb(255,255,255)' : 'rgb(122,143,147)'} />
              <Text style={[styles.light13Text, this.state.occurancesPressed ? {color: 'rgb(255,255,255)'} : {color: 'rgb(122,143,147)'}]}>Total Occurances</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection:'row'}}>
          <TouchableOpacity onPress={this._sortData.bind(this, 'firstOccurred')}>
            <View style={[styles.iconButton, {width: (Dimensions.get('window').width - 50)/2}, this.state.firstSeenPressed ? {backgroundColor: 'rgb(122,143,147)'} : {backgroundColor: 'rgb(255,255,255)'}]}>
              <Icon name={'calendar-o'} size={19} color={this.state.firstSeenPressed ? 'rgb(255,255,255)' : 'rgb(122,143,147)'} />
              <Text style={[styles.light13Text, this.state.firstSeenPressed ? {color: 'rgb(255,255,255)'} : {color: 'rgb(122,143,147)'}]}>First Occurred</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._sortData.bind(this, 'lastOccurred')}>
            <View style={[styles.iconButton, {width: (Dimensions.get('window').width - 50)/2}, this.state.lastSeenPressed ? {backgroundColor: 'rgb(122,143,147)'} : {backgroundColor: 'rgb(255,255,255)'}]}>
              <Icon name={'clock-o'} size={19} color={this.state.lastSeenPressed ? 'rgb(255,255,255)' : 'rgb(122,143,147)'} />
              <Text style={[styles.light13Text, this.state.lastSeenPressed ? {color: 'rgb(255,255,255)'} : {color: 'rgb(122,143,147)'}]}>Last Seen</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        {this.state.crashesArray}
      </View>
    </View>)
    return(
      <View style={styles.container}>
        <AppHeader navigator={this.props.navigator} name={this.props.name}/>
        <ScrollView>
          {spinner}
        </ScrollView>
        <AppFooter navigator={this.props.navigator} id={this.props.id} name={this.props.name} type={this.props.type} />
      </View>
    )
  };

  //Display correct time period based on settings
  _getTime(){
    switch(this.state.time){
      case '1':
        return 'Current 24 hours';
        break;
      case '7':
        return 'Last 7 days';
        break;
      case '30':
        return 'Last 30 days'
    }
  }

  //Sort crashes, makes a new call to api for each sort
  _sortData(sort){
    switch (sort){
      case 'usersAffected':
        this.setState({
          userPressed: true,
          occurancesPressed: false,
          firstSeenPressed: false,
          lastSeenPressed: false
        });
        break;
      case 'timesOccurred':
        this.setState({
          userPressed: false,
          occurancesPressed: true,
          firstSeenPressed: false,
          lastSeenPressed: false
        });
        break;
      case 'firstOccurred':
        this.setState({
          userPressed: false,
          occurancesPressed: false,
          firstSeenPressed: true,
          lastSeenPressed: false
        });
        break;
      case 'lastOccurred':
        this.setState({
          userPressed: false,
          occurancesPressed: false,
          firstSeenPressed: false,
          lastSeenPressed: true
        });
      break;
    }
    combineCrashData(this.props.id, this.props.time, this.props.version, sort, (data) => {
      this._getCrashInfo(data);
    });
  }

  //Creates a new component for each crash returned by the api
  _getCrashInfo(data){
    const thisCrashesArray = [];
    const crash = data;
    const nav = this.props.navigator;
    for(var i = 0; i < crash.length; i ++){
      thisCrashesArray.push(<Crashes navigator={nav} 
        key={i}
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
    //return crashesArray;
    this.setState({crashesArray: thisCrashesArray});
  }

  //Opens up the crash settings page where user can choose timeframe and version
  _onPressSettings(){
    this.props.navigator.replace({
      name: 'crashSettings',
      passProps: {
        name: this.props.name,
        id: this.props.id
      }
    });
  }
};

class Symbols extends Component {
  render(){
    return(
      <View>
        <View style={[styles.crashInfoSymbels, {marginBottom: 10}, {marginTop: 10}]}>
          <View style={styles.crashInfoSymbels}>
            <Icon name="user" size={19} color='rgb(122,143,147)' backgroundColor='white' padding={7} />
            <Text style={styles.light13Text}>{this.props.users}</Text>
          </View>
          <View style={styles.crashInfoSymbels}>
            <Icon name="bar-chart" size={19} color='rgb(122,143,147)' backgroundColor='white' padding={7} />
            <Text style={styles.light13Text}>{this.props.occurances}</Text>
          </View>
        </View>
        <View style={[styles.crashInfoSymbels, {marginBottom: 10}]}>
          <View style={styles.crashInfoSymbels}>
            <Icon name="calendar-o" size={19} color='rgb(122,143,147)' backgroundColor='white' padding={7} />
            <Text style={styles.light13Text}>{this.props.firstOccured}</Text>
          </View>
          <View style={styles.crashInfoSymbels}>
            <Icon name="clock-o" size={19} color='rgb(122,143,147)' backgroundColor='white' padding={7} />
            <Text style={styles.light13Text}>{this.props.lastOccured}</Text>
          </View>
        </View>
      </View>
    )
  }
}

class Crashes extends Component {
  render(){
    return(
      <TouchableHighlight underlayColor={'gray'} onPress={this._onPress.bind(this)}> 
        <View style={[styles.app, {borderTopWidth: 1}, {borderTopColor: 'rgb(229,234,236)'}, {marginTop: 0}, {marginBottom: 0}]}>
          <Text style={styles.smallLink}>{this.props.crashName}</Text>
          <Text style={styles.dark15Text}>{this.props.reason}</Text>
          <Symbols users={this.props.users} occurances={this.props.occurances} firstOccured={moment.utc(this.props.firstOccured).fromNow()} lastOccured={moment.utc(this.props.lastOccured).format('DD MMM YY h:mm:ss')} />
        </View>
      </TouchableHighlight>
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