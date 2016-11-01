'use strict'

import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  TextInput,
  Alert,
  ScrollView,
  AsyncStorage
} from 'react-native';

import getData from './getData';
import base64 from 'base-64';
import SignInButton from './/button'
import styles from './styleSheet';
var api = require('../library/api.js');

//Sign in page, first screen to render when app is opened
//Once correct login details are entered app will render the Applist component
class Signin extends Component{
  constructor(){
    super();
    this.state = {
      username: 's.j.scott84@gmail.com',
      password: 'A228kp3jT!'
    }
  };

  componentWillMount(){
    AsyncStorage.getItem('AccessToken')
      .then((value) =>{
        if(value){
          provideAccessToken(value, () => {
            this.props.navigator.push({
              name: 'appList'
            })
          })
        }
      })
  }

  render(){
    return (
      <ScrollView>
        <View style={styles.loginContainer}>
          <Text style={styles.header}>Login to Apteligent account</Text>
          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} onChangeText={(text) => this.setState({username: text})} value={this.state.username}/>{/*By default TextInput has no default styling*/}
          <Text style={styles.label}>Password</Text>
          <TextInput secureTextEntry={true} style={styles.input} onChangeText={(text) => this.setState({password: text})} value={this.state.password}/>
          <Text style={styles.forgotPassword}>Forgot Pasword?</Text>
          <SignInButton text={'LOGIN'} onPress={this._onPress.bind(this)} />
          <Text style={styles.disclaimer}>Possibly disclaimer - tbd</Text>
        </View>
      </ScrollView>
    )
  };

  _onPress(){
    const nav = this.props.navigator;
    const username = this.state.username;
    const password =  this.state.password;
    //Client ID must be Base64 encoded, cURL does this automatically but http requests need to be done manually
    //Client ID is found at apteligent app user settings
    const clientId = base64.encode('HpS0dzMRx9oKPwBlE7TJXzvbfHuODsrO');
    //Apteligent APi currently only accepts grant_type 'password'
    const grantType = 'password';

    if(!this.state.username  || !this.state.password){
      Alert.alert('Error', 'Please enter a valid username and password');
    }else{
      //Call the API to get the access token and render AppList component
       getAccessToken(password, username, clientId, grantType, (data) => {
        AsyncStorage.setItem('AccessToken', data);
        nav.push({
          name: 'appList'
        });
      });
    }
  };
};

module.exports = Signin