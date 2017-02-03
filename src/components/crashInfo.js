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
  AsyncStorage,
  ListView
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
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
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
      combineCrashData(this.props.id, this.state.time, this.state.version, 'usersAffected', (error, data) => {
        if(error){
          this.props.navigator.push({name: 'errorScreen'});
        }else{
          setTimeout(() => {
            this.setState({
              dataSource: this.state.dataSource.cloneWithRows(data),
              isLoading: false
            })
          }, 500);
        }
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
              <Text style={[styles.light13Text, {marginLeft: 0}, this.state.userPressed ? {color: 'rgb(255,255,255)'} : {color: 'rgb(122,143,147)'}]}>Users Affected</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._sortData.bind(this, 'timesOccurred')}>
            <View style={[styles.iconButton, {width: (Dimensions.get('window').width - 50)/2}, this.state.occurancesPressed ? {backgroundColor: 'rgb(122,143,147)'} : {backgroundColor: 'rgb(255,255,255)'}]}>
              <Text style={[styles.light13Text, {marginLeft: 0}, this.state.occurancesPressed ? {color: 'rgb(255,255,255)'} : {color: 'rgb(122,143,147)'}]}>Total Occurances</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={[{flexDirection:'row'}, {marginBottom: 7}]}>
          <TouchableOpacity onPress={this._sortData.bind(this, 'firstOccurred')}>
            <View style={[styles.iconButton, {width: (Dimensions.get('window').width - 50)/2}, this.state.firstSeenPressed ? {backgroundColor: 'rgb(122,143,147)'} : {backgroundColor: 'rgb(255,255,255)'}]}>
              <Text style={[styles.light13Text, {marginLeft: 0}, this.state.firstSeenPressed ? {color: 'rgb(255,255,255)'} : {color: 'rgb(122,143,147)'}]}>First Occurred</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._sortData.bind(this, 'lastOccurred')}>
            <View style={[styles.iconButton, {width: (Dimensions.get('window').width - 50)/2}, this.state.lastSeenPressed ? {backgroundColor: 'rgb(122,143,147)'} : {backgroundColor: 'rgb(255,255,255)'}]}>
              <Text style={[styles.light13Text, {marginLeft: 0}, this.state.lastSeenPressed ? {color: 'rgb(255,255,255)'} : {color: 'rgb(122,143,147)'}]}>Last Seen</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <ListView enableEmptySections={true} dataSource={this.state.dataSource} renderRow={(data) => <Crashes navigator={this.props.navigator} 
        name={this.props.name}
        id={this.props.id}
        hash={data['hash']}
        crashName={data['crashName']}
        reason={data['crashReason']}
        users={data['affectedUsers']}
        occurances={data['totalOccurances']}
        firstOccured={data['firstOccured']}
        lastOccured={data['lastOccured']}
        status={data['status']}
        dailyOccurances={data['dailyOccurances']}
        version={this.state.version} />} />
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
          isLoading: true,
          userPressed: true,
          occurancesPressed: false,
          firstSeenPressed: false,
          lastSeenPressed: false
        });
        break;
      case 'timesOccurred':
        this.setState({
          isLoading: true,
          userPressed: false,
          occurancesPressed: true,
          firstSeenPressed: false,
          lastSeenPressed: false
        });
        break;
      case 'firstOccurred':
        this.setState({
          isLoading: true,
          userPressed: false,
          occurancesPressed: false,
          firstSeenPressed: true,
          lastSeenPressed: false
        });
        break;
      case 'lastOccurred':
        this.setState({
          isLoading: true,
          userPressed: false,
          occurancesPressed: false,
          firstSeenPressed: false,
          lastSeenPressed: true
        });
      break;
    }
    combineCrashData(this.props.id, this.state.time, this.state.version, sort, (error, data) => {
      if(error){
        this.props.navigator.push({name: 'errorScreen'});
      }else{
        setTimeout(() => {
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(data),
            isLoading: false
          })
        }, 200);
      }
    });
  }

  //Opens up the crash settings page where user can choose timeframe and version
  _onPressSettings(){
    this.props.navigator.replace({
      name: 'crashSettings',
      passProps: {
        name: this.props.name,
        id: this.props.id,
        time: this.state.time,
        version: this.state.version
      }
    });
  }
};

class Crashes extends Component {
  render(){
    return(
      <View>
      <Text style={[styles.crashNameText, {marginTop: 7}, {marginBottom: 7}]}>{this.props.crashName}</Text>
        <TouchableHighlight underlayColor={'gray'} onPress={this._onPress.bind(this)}> 
          <View style={[styles.app, {borderTopWidth: 1}, {borderTopColor: 'rgb(229,234,236)'}, {marginTop: 0}, {marginBottom: 0}, {paddingRight: 10}]}>
            <Text style={[styles.dark15Text, {marginTop: 7}, {marginBottom: 7}]}>{this.props.reason}</Text>
            <View style={[{borderTopWidth: 1}, {borderTopColor: 'rgb(229,234,236)'}, {marginRight: -10}]}>
              <View style={[{flexDirection: 'row'}, {justifyContent: 'space-between'}, {marginTop: 7}, {marginRight: 10}]}>
                <Text style={styles.light15Text}>Users Affected</Text>
                <Text style={styles.dark15Text}>{this.props.users}</Text>
              </View>
              <View style={[{flexDirection: 'row'}, {justifyContent: 'space-between'}, {marginRight: 10}]}>
                <Text style={styles.light15Text}># Occurances</Text>
                <Text style={styles.dark15Text}>{this.props.occurances}</Text>
              </View>
              <View style={[{flexDirection: 'row'}, {justifyContent: 'space-between'}, {marginRight: 10}]}>
                <Text style={styles.light15Text}>First Occured</Text>
                <Text style={styles.dark15Text}>{moment.utc(this.props.firstOccured).fromNow()}</Text>
              </View>
              <View style={[{flexDirection: 'row'}, {justifyContent: 'space-between'}, {marginRight: 10}]}>
                <Text style={styles.light15Text}>Last Occured</Text>
                <Text style={styles.dark15Text}>{moment.utc(this.props.lastOccured).format('DD MMM YY h:mm:ss')}</Text>
              </View>
            </View>
          </View>
        </TouchableHighlight>
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
        dailyOccurances: this.props.dailyOccurances,
        version: this.props.version
      }});
  }
}

module.exports = CrashInfo;