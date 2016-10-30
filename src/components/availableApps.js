'use strict'

import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  ScrollView,
  TextInput
} from 'react-native';

import styles from './styleSheet';
import numeral from 'numeral'
import Icon from 'react-native-vector-icons/FontAwesome';

class AvailableApps extends Component {
  constructor(props){
    super(props);
    this.state = {
      apps: props.data,
      text: 'Select or Type App Name',
      searching: false
    }
  };

  render(){
    return(
      <View style={styles.container}>
        <View style={[styles.topLinks, {justifyContent: 'flex-start'}]}>
          <Icon style={{alignSelf: 'center'}} name="search" size={20} color='rgb(98,129,133)' backgroundColor='white' />
          <TextInput style={styles.appInput} onFocus={() => this.setState({text: ''})} onChangeText={(text) => this.setState({text: text, searching: true})} value={this.state.text}/>{/*By default TextInput has no default styling*/}
        </View>
        <ScrollView>{this._getAppsInfo()}</ScrollView>
      </View>
    )
  };

  //This rerenders the appList component
  _onPressBack(){
    this.props.navigator.pop();
  }

  _getAppsInfo(){
    const appView = [];
    const app = this.state.apps;
    for(var i = 0; i < app.length; i ++){
      if(!this.state.searching || this.state.text === ''){
        appView.push(<AvailableAppsInfo navigator={this.props.navigator} key={app[i]['id']} id={app[i]['id']} name={app[i]['name']} type={app[i]['type']} />);
      }else{
        if ( app[i]['name'].indexOf( this.state.text ) > -1 ) {
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
      <View style={styles.availableApps}>
        <Text style={styles.dark15Text} onPress={this._onPress.bind(this)} id={this.props.id} name={this.props.name} type={this.props.type}>{this.props.name}</Text>
      </View>
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