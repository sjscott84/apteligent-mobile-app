'use strict'

import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  Linking
} from 'react-native';

import Button from './/button';
import styles from './styleSheet';

//Sign in page, first screen to render when app is opened
//Once correct login details are entered app will render the Applist component
class ForgotPassword extends Component{

  render(){
    return (
        <View style={styles.loginContainer}>
          <Text style={[styles.header, {alignSelf: 'center'}]}>Forgot Password?</Text>
          <Text style={styles.dark15Text}>You will need to log into your Apteligent account to change your password</Text>
          <Button text={'Change Password'} onPress={() => Linking.openURL('https://www.apteligent.com/')} />
          <Button text={'Cancel'} onPress={() => this.props.navigator.push({name: 'signin'})} />

        </View>
    )
  };
};

module.exports = ForgotPassword