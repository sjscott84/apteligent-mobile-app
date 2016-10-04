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
import {AppList, AppsInfo, AppInfo} from './components/listOfApps';
import AppDetails from './components/appDetails';

const ROUTES = {
  signin: Signin,
  appList: AppList,
  appsInfo: AppInfo,
  appInfo: AppsInfo,
  appDetails: AppDetails
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
