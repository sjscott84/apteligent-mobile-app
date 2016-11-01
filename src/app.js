'use strict'

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator,
  AsyncStorage
} from 'react-native';
import Signin from './components/signin';
import AppList from './components/appList';
import AppDetails from './components/appDetails';
import AvailableApps from './components/availableApps';
import CrashInfo from './components/crashInfo';
import CrashDetail from './components/crashDetail';
import Stacktrace from './components/stacktrace';
import Breadcrumbs from './components/breadcrumbs';
import BreadcrumbDetails from './components/breadcrumbDetails';
import InteractivePieChart from './components/interactivePieChart';
import CrashSettings from './components/crashSettings';
import UserDetail from './components/userDetail';

const ROUTES = {
  signin: Signin,
  appList: AppList,
  appDetails: AppDetails,
  availableApps: AvailableApps,
  crashInfo: CrashInfo,
  crashDetail: CrashDetail,
  stacktrace: Stacktrace,
  breadcrumbs: Breadcrumbs,
  breadcrumbDetails: BreadcrumbDetails,
  interactivePieChart: InteractivePieChart,
  crashSettings: CrashSettings,
  userDetail: UserDetail
}

export default class ApteligentMobileApp extends Component {
  render() {
    return (
      <Navigator style={styles.container} initialRoute={{name:'signin'}} renderScene={this._renderScene} configureScene={() => {return Navigator.SceneConfigs.FloatFromRight}}/>
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
