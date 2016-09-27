/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

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

  _renderScene(route, navigator){
    var Component = ROUTES[route.name];
    return <Component route={route} navigator={navigator} />
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

//AppRegistry.registerComponent('ApteligentMobileApp', () => ApteligentMobileApp);
