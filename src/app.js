'use strict'

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';

var Signin = require('./components/signin');
var Test = require('./components/test');
var STORAGE_KEY = 'id_token';

const ROUTES = {
  signin: Signin,
  test: Test
}

export default class ApteligentMobileApp extends Component {

  render() {
    return (
      <Navigator style={styles.container} initialRoute={{name: 'signin'}} renderScene={this._renderScene} configureScene={() => {return Navigator.SceneConfigs.FloatFromLeft}}/>
    );
  };

  _test(){
    console.log('Bahahaha');
  }

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
