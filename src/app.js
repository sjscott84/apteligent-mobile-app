'use strict'

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator
} from 'react-native';

//var Signin = require('./components/signin');
//var ListOfApps = require('./components/listOfApps');
//var AppDetails = require('./components/appDetails');

import Signin from './components/signin';
import AppList from './components/listOfApps';
import {AppsInfo, AppInfo} from './components/appData';
import AppDetails from './components/appDetails';
import AvailableApps from './components/availableApps';
import CrashInfo from './components/crashInfo';

const ROUTES = {
  signin: Signin,
  appList: AppList,
  appsInfo: AppInfo,
  appInfo: AppsInfo,
  appDetails: AppDetails,
  availableApps: AvailableApps,
  crashInfo: CrashInfo
}

export default class ApteligentMobileApp extends Component {
  render() {
    return (
      <Navigator style={styles.container} initialRoute={{name: 'signin'}} renderScene={this._renderScene} configureScene={() => {return Navigator.SceneConfigs.FloatFromLeft}}/>
    );
  };

  _renderScene(route, navigator){
    var Component = ROUTES[route.name];
    return <Component route={route} navigator={navigator} {...route.passProps}/>
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

//AppRegistry.registerComponent('ApteligentMobileApp', () => ApteligentMobileApp);
