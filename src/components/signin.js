'use strict'

import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  TextInput,
  Alert,
  ScrollView,
  AsyncStorage,
  findNodeHandle
} from 'react-native';

import getData from './getData';
import base64 from 'base-64';
import SignInButton from './/button';
import styles from './styleSheet';
var api = require('../library/api.js');

//Sign in page, first screen to render when app is opened
//Once correct login details are entered app will render the Applist component
class Signin extends Component{
  constructor(){
    super();
    this.state = {
      username: '',
      password: '',
      clientId: ''
    }
  };

  //Checks to see if there is already an access token in local storage so user does not have to log in each time
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
      <ScrollView ref='scrollView'>
        <View style={styles.loginContainer}>
          <Text style={styles.header}>Login to Apteligent account</Text>
          <Text style={styles.label}>Email</Text>
          <TextInput ref='username' onFocus={this._inputFocused.bind(this, 'username')} style={styles.input} onChangeText={(text) => this.setState({username: text})} value={this.state.username}/>{/*By default TextInput has no default styling*/}
          <Text style={styles.label}>Password</Text>
          <TextInput ref='password' onFocus={this._inputFocused.bind(this, 'password')}secureTextEntry={true} style={styles.input} onChangeText={(text) => this.setState({password: text})} value={this.state.password}/>
          <Text style={styles.label}>Client ID</Text>
          <TextInput ref='clientId' onFocus={this._inputFocused.bind(this, 'clientId')}secureTextEntry={true} style={styles.input} onChangeText={(text) => this.setState({clientId: text})} value={this.state.clientId}/>
          <SignInButton text={'LOGIN'} onPress={this._onPress.bind(this)} />
        </View>
      </ScrollView>
    )
  };

  _forgotPassword(){
    this.props.navigator.push({
      name: 'forgotPassword'
    })
  }

  _inputFocused(refName) {
    setTimeout(() => {
      let scrollResponder = this.refs.scrollView.getScrollResponder();
      scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
        findNodeHandle(this.refs[refName]),
        110, //additionalOffset
        true
      );
    }, 100);
  }

  _onPress(){
    const nav = this.props.navigator;
    const username = this.state.username;
    const password =  this.state.password;
    //Client ID must be Base64 encoded, cURL does this automatically but http requests need to be done manually
    //Client ID is found at apteligent app user settings
    const clientId = base64.encode(this.state.clientId);
    //Apteligent APi currently only accepts grant_type 'password'
    const grantType = 'password';

    if(!this.state.username  || !this.state.password){
      Alert.alert('Incorrect Details', 'Please enter a valid email and password', 
        [{text: 'OK'},
        {text: 'Forgot Password', onPress: () => this.props.navigator.push({name: 'forgotPassword'})}]
        );
    }else{
      //Call the API to get the access token and render AppList component
       getAccessToken(password, username, clientId, grantType, (error, data) => {
        if(error){
          console.log(error);
          Alert.alert('Incorrect Details', 'Incorrect email or password entered', 
            [{text: 'OK'},
            {text: 'Forgot Password', onPress: () => this.props.navigator.push({name: 'forgotPassword'})}]
          );
        }else{
          AsyncStorage.setItem('AccessToken', data);
          nav.push({
            name: 'appList'
          });
        }
      });
    }
  };
};

module.exports = Signin