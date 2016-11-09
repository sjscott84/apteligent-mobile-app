'use strict'

import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableHighlight,
  AsyncStorage
} from 'react-native';

import styles from './styleSheet';
import Icon from 'react-native-vector-icons/FontAwesome';

class AvailableApps extends Component {
  constructor(){
    super();
    this.state = {
      apps: [],
      text: 'Select or Type App Name'
    }
  };

  //This makes a call to the api and returns all apps
  componentWillMount(){
    //getAvaliableApps() is from getData.js
      getAvaliableApps((data) => {
        if(data === "Error"){
          this.props.navigator.push({name: 'errorScreen'});
        }else{
          this.setState({
            apps: data
          });
        }
      });
  };

  render(){
    return(
      <View style={styles.container}>
        <View style={[styles.topLinks, {justifyContent: 'flex-start'}, {borderBottomWidth: 1}, {borderBottomColor: 'rgb(12,143,147)'}]}>
          <Icon.Button style={{alignSelf: 'center'}} name="chevron-left" size={20} color='rgb(23,153,173)' backgroundColor='white' onPress={this._onPressBack.bind(this)} />
          <Icon style={{alignSelf: 'center'}} name="search" size={20} color='rgb(98,129,133)' backgroundColor='white' />
          <TextInput style={styles.appInput} onFocus={() => this.setState({text: ''})} onChangeText={(text) => this.setState({text: text, searching: true})} value={this.state.text}/>{/*By default TextInput has no default styling*/}
        </View>
        <ScrollView>{this._getAppsInfo()}</ScrollView>
        <View style={styles.footer}>
          <Icon style={{marginLeft: 15}} name="sign-out" size={15} color='rgb(122,143,147)' backgroundColor='white' onPress={this._onPressLogout.bind(this)} />
          <Text style={styles.light13Text} onPress={this._onPressLogout.bind(this)}>Log Out</Text>
        </View>
      </View>
    )
  };

  _onPressBack(){
    this.props.navigator.pop();
  }

  //Logout of the app
  _onPressLogout(){
    AsyncStorage.removeItem('AccessToken')
      .then(() => {
        this.props.navigator.push({
          name: 'signin'
        })
      })
  }

  //Create the components for each of the apps
  _getAppsInfo(){
    const appView = [];
    const app = this.state.apps;
    for(var i = 0; i < app.length; i ++){
      if(!this.state.searching || this.state.text === ''){
        appView.push(<AvailableAppsInfo navigator={this.props.navigator} key={app[i]['id']} id={app[i]['id']} name={app[i]['name']} type={app[i]['type']} />);
      }else{
        if (app[i]['name'].indexOf(this.state.text) > -1){
          appView.push(<AvailableAppsInfo navigator={this.props.navigator} key={app[i]['id']} id={app[i]['id']} name={app[i]['name']} type={app[i]['type']} />);
        }
      }
    }
    return appView;
  };
}

class AvailableAppsInfo extends Component {
  render(){
    return(
      <TouchableHighlight style={styles.availableApps} underlayColor={'gray'} onPress={this._onPress.bind(this)}>
          <Text style={styles.dark15Text} id={this.props.id} name={this.props.name} type={this.props.type}>{this.props.name}</Text>
      </TouchableHighlight>
    )
  };
  
  //This renders the appDetails component, which shows more details about a specific app
  _onPress(){
    this.props.navigator.replace({
      name: 'appDetails',
      passProps: {
        id: this.props.id,
        name: this.props.name,
        type: this.props.type
      }
    });
  };
}

module.exports = AvailableApps;