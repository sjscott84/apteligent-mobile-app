'use strict'

import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  Text
} from 'react-native';

import styles from './styleSheet';
import Button from './button';
//import getData from './getData';

//Displays an error message when the api cannot be reached
class ErrorScreen extends Component {
  render (){
    return (
      <View style={styles.loginContainer}>
        <Text style={[styles.header, {paddingTop: 20}, {alignSelf: 'center'}, {textAlign: 'center'}]}>There was an error loading this page</Text>
        <Button text={'Retry'} onPress={this._onPress.bind(this)} />
      </View>
    )
  };

  _onPress(page, props){
    let lastComponent = this.props.navigator.state.routeStack[this.props.navigator.state.routeStack.length - 2];
    this.props.navigator.push({name: lastComponent['name'], passProps: lastComponent['passProps']});
    console.log(lastComponent);
  }
};


module.exports = ErrorScreen;