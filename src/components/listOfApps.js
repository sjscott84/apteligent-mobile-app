import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
  Text,
  View
} from 'react-native';

import styles from './styleSheet';
var api = require('../library/api.js');

class AppList extends Component {
  constructor(){
    super();
    this.state ={
      apps: ''
    }
  };

  componentWillMount(){
    getAppsList((data) => {
      this.setState({apps: data});
    })
  };

  render (){
    return (
      <View style={styles.container}>
        <View style={styles.topLinks}>
        </View>
        {this._getAppsInfo()}
      </View>
    )
  };

  _getAppsInfo(){
    const data=this.state.apps;
    const appView = []
    const nav = this.props.navigator;
    Object.keys(data).forEach(function(id){
      data[id]['id'] = id;
      appView.push(<AppsInfo navigator={nav} key={id} id={id} name={data[id]['appName']} type={data[id]['appType']} />);
    })
    return appView;
  }
};

class AppsInfo extends Component {

  _onPress(){
    this.props.navigator.push({
      name: 'appDetails',
      passProps: {
        id: this.props.id,
        name: this.props.name,
        type: this.props.type
      }});
  };

  render (){
    return (
      <View style={[styles.app, {height: 185}]}>
        <View style={styles.head}>
          <Image style={styles.logo} source={require('../images/logoTest.png')}/>
          <Text style={styles.largeLink} onPress={this._onPress.bind(this)}>{this.props.name}</Text>
        </View>
          <Text style={[styles.light14Text, {flexDirection: 'column'}]}>All Versions</Text>
          <Text style={[styles.light14Text, {flexDirection: 'column'}]}>{this.props.type}</Text>
          <View style={styles.crashInfo}>
            <AppInfo name="Crash Rate" data='0.23%'/>
            <AppInfo name="App Load" data='4.3k'/>
            <AppInfo name="HTTP error rate" data='3.2%'/>
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

module.exports = {AppList, AppsInfo, AppInfo};