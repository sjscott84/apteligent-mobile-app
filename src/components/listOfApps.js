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
          <Text style={[styles.font, styles.name, {color: 'rgb(80,158,186)'}]} onPress={this._onPress.bind(this)}>{this.props.name}</Text>
        </View>
          <Text style={[styles.font, styles.headerInfo]}>All Versions</Text>
          <Text style={[styles.font, styles.headerInfo]}>{this.props.type}</Text>
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
        <Text style={[styles.font, styles.crashHeaders]}>{this.props.name}</Text>
        <Text style={[styles.font, styles.last24Hours]}>Last 24h</Text>
        <Text style={styles.data}>{this.props.data}</Text>
      </View>
    )
  }
}

module.exports = {AppList, AppsInfo, AppInfo};