import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert
} from 'react-native';

var SignInButton = require('.//button');
var api = require('./api');
import base64 from 'base-64';


class Signin extends Component{

  constructor(){
    super();
    this.state = {
      username: '',
      password: ''
    }
  };

  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Login to Apteligent</Text>
        <Text style={styles.label}>Data location</Text>
        <TextInput style={styles.input} />{/*By default TextInput has no default styling*/}
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} onChangeText={(text) => this.setState({username: text})} value={this.state.username}/>{/*By default TextInput has no default styling*/}
        <Text style={styles.label}>Password</Text>
        <TextInput secureTextEntry={true} style={styles.input} onChangeText={(text) => this.setState({password: text})} value={this.state.password}/>
        <Text style={styles.forgotPassword}>Forgot Pasword?</Text>
        <SignInButton text={'LOGIN'} onPress={this._onPress.bind(this)} />
        <Text style={styles.disclaimer}>Possibly disclaimer - tbd</Text>
      </View>
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
       getAccessToken(password, username, clientId, grantType, function(){
        nav.push({
          name: 'test'
        });
      });
    }
  };
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    paddingTop: 150,
    paddingBottom: 60,
    fontSize: 24,
    lineHeight: 33,
    alignSelf: 'flex-start',
    color:'rgb(52, 73, 76)',
    fontFamily: 'AppleSDGothicNeo-Medium'
  },
  input: {
    height: 40,
    marginTop: 3,
    marginBottom: 20,
    borderColor: 'rgb(139, 157, 160)',
    borderWidth: 1,
    borderRadius: 2,
    alignSelf: 'stretch'
  },
  label: {
    fontSize: 15,
    lineHeight: 20,
    color: 'rgb(52, 73, 76)',
    alignSelf: 'flex-start',
    fontFamily: 'AppleSDGothicNeo-SemiBold'
  },
  forgotPassword: {
    fontFamily: 'AppleSDGothicNeo-SemiBold',
    fontSize: 13,
    lineHeight: 18,
    alignSelf: 'flex-end',
    color: 'rgb(54, 143, 175)'
  },
  disclaimer: {
    marginTop: 30,
    lineHeight: 18,
    fontSize: 13,
    fontFamily: 'AppleSDGothicNeo-Medium',
    color: 'rgb(52,73,76)',
    alignSelf: 'flex-start'
  }
})

module.exports = Signin