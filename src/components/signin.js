import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';

var SignInButton = require('.//button');

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
        <Text>Sign In</Text>
        <Text style={styles.label}>Username:</Text>
        <TextInput style={styles.input} onChangeText={(text) => this.setState({username: text})} value={this.state.username}/>{/*By default TextInput has no default styling*/}
        <Text style={styles.label}>Password:</Text>
        <TextInput secureTextEntry={true} style={styles.input} onChangeText={(text) => this.setState({password: text})} value={this.state.password}/>
        <SignInButton text={'Sign In'} onPress={this._onPress.bind(this)} />
      </View>
    )
  };

  _onPress(){
    const username = this.state.username;
    const password =  this.state.password;
    //Client ID must be Base64 encoded, cURL does this automatically but http requests need to be done manually
    //Client ID is found at apteligent app user settings
    const clientId = window.btoa('HpS0dzMRx9oKPwBlE7TJXzvbfHuODsrO');
    //Apteligent APi currently only accepts grant_type 'password'
    const grant_type = 'password';
    //Content type and authorization must be passed in as a header
    const myHeaders = new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": 'Basic '+clientId
    });

    var request = new Request('https://developers.crittercism.com/v2/token', {
      method: 'POST',
      credentials: "same-origin",
      mode: 'cors',
      headers: myHeaders,
      body: 'grant_type=password&username='+username+'&password='+password
    })

    fetch(request)
      .then((res) => {
        console.log(res.text());
      })
  };
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    padding: 4,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    width: 200,
    alignSelf: 'center'
  },
  label: {
    fontSize: 18
  }
})

module.exports = Signin