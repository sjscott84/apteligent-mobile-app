'use strict'

import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

import styles from './styleSheet';
import Icon from 'react-native-vector-icons/FontAwesome';

//The Applist component displays each available app along with some basic data
class AppFooter extends Component {

  render (){
    return (
      <View style={[styles.footer, {flexDirection: 'row'}, {justifyContent: 'space-around'}]}>
        <TouchableHighlight onPress={this._onPressNewRoute.bind(this, 'crashInfo', {id: this.props.id, name: this.props.name, type: this.props.type, time: '1', version: 'all'})}>
          <View style={[{flexDirection: 'column'}, {alignItems: 'center'}]}>
            <Icon style={{marginLeft: 15}} name="exclamation-triangle" size={15} color='rgb(122,143,147)' backgroundColor='white' />
            <Text style={styles.light13Text} >Crash Summary</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._onPressNewRoute.bind(this, 'appDetails', {id: this.props.id, name: this.props.name, type: this.props.type})}>
          <View style={[{flexDirection: 'column'}, {alignItems: 'center'}]}>
            <Icon style={{marginLeft: 15}} name="pie-chart" size={15} color='rgb(122,143,147)' backgroundColor='white' />
            <Text style={styles.light13Text}>App Overview</Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  };

  _onPressNewRoute(newRoute, props){
    let currentRoute = this.props.navigator.state.routeStack[this.props.navigator.state.routeStack.length - 1];
    if(currentRoute.name !== newRoute){
      this.props.navigator.push({
        name: newRoute,
        passProps: props
      })
    }
  }
};

module.exports = AppFooter;