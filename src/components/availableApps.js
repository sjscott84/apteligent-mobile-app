import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
  Text,
  View,
  ScrollView
} from 'react-native';

import styles from './styleSheet';
import numeral from 'numeral'
var api = require('../library/api.js');
import getData from './getData';
import Icon from 'react-native-vector-icons/FontAwesome';

class AvailableApps extends Component {

  constructor(props){
    super(props);
    this.state = {
      apps: props.data
    }
  };

  render(){
    return(
      <View style={styles.container}>
        <View style={[styles.topLinks, {justifyContent: 'flex-start'}]}>
          <Icon.Button name="chevron-left" size={20} color='rgb(23,153,173)' backgroundColor='white' onPress={this._onPressBack.bind(this)} />
          <Text style={styles.dark18Text}>Select App Name</Text>
        </View>
        <ScrollView>{this._getAppsInfo()}</ScrollView>
      </View>
    )
  };

  _onPressBack(){
    this.props.navigator.pop();
  }

  _getAppsInfo(){
    const appView = [];
    const app = this.state.apps;
    //const nav = this.props.navigator;
    for(var i = 0; i < app.length; i ++){
      appView.push(<AvailableAppsInfo navigator={this.props.navigator} key={app[i]['id']} id={app[i]['id']} name={app[i]['name']} type={app[i]['type']} crashPercent={app[i]['crashPercent'].toFixed(2)} appLoads={numeral(app[i]['appLoads']).format('0.0a')} />);
    }
    return appView;
  };
}

class AvailableAppsInfo extends Component {
  render(){
    return(
      <View style={styles.availableApps}>
        <Text style={styles.dark15Text} onPress={this._onPress.bind(this)} id={this.props.id} name={this.props.name} type={this.props.type} crashPercent={this.props.crashPercent} appLoads={this.props.appLoads}>{this.props.name}</Text>
      </View>
    )
  };

  _onPress(){
    this.props.navigator.replace({
      name: 'appDetails',
      passProps: {
        id: this.props.id,
        name: this.props.name,
        type: this.props.type,
        crashPercent: this.props.crashPercent,
        appLoads: this.props.appLoads
      }
    });
  };
}

module.exports = AvailableApps;