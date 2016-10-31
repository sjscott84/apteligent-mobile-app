'use strict'

import React, { Component } from 'react';
import {
  AppRegistry,
  Image,
  Text,
  View,
  ScrollView
} from 'react-native';

import styles from './styleSheet';
import Icon from 'react-native-vector-icons/FontAwesome';
import getData from './getData';
import moment from 'moment';

class UserDetail extends Component {
  constructor(){
    super();
    this.state = {

    }
  }

  componentWillMount(){
    getUserDetails(this.props.id, this.props.hash, this.props.username, (data) =>{
      this.setState({
        appVersion: data['appVersion'],
        system: data['system'],
        locale: data['locale'],
        device: data['device'],
        carrier: data['carrier'],
        lastLogIn: data['lastLogIn'],
        lastCrash: data['lastCrash']
      })
    })
  }

  render(){
    return(
      <View style={styles.container}>
        <View style={styles.topLinks}>
          <Icon.Button name="chevron-left" size={20} color='rgb(23,153,173)' backgroundColor='white' onPress={this._onPressBack.bind(this)} />
          <Text style={styles.dark18Text}>{this.props.name}</Text>
          <Icon.Button name="cog" size={20} color='rgb(98,129,133)' backgroundColor='white' />
        </View>
        <View style={styles.app}>
          <Text style={styles.dark15Text}>APP USER</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.dark15Text}>Username</Text>
            <Text style={styles.bold15Text}>{this.props.username}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.dark15Text}>Last Log In</Text>
            <Text style={styles.bold15Text}>{moment.utc(this.state.lastLogIn).format('MM/DD/YYYY hh:mm:ss UTC')}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.dark15Text}>Last Crash</Text>
            <Text style={styles.bold15Text}>{moment.utc(this.state.lastCrash).format('MM/DD/YYYY hh:mm:ss UTC')}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.dark15Text}>Device</Text>
            <Text style={styles.bold15Text}>{this.state.device}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.dark15Text}>App Version</Text>
            <Text style={styles.bold15Text}>{this.state.appVersion}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.dark15Text}>OS</Text>
            <Text style={styles.bold15Text}>{this.state.system}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.dark15Text}>Locale</Text>
            <Text style={styles.bold15Text}>{this.state.locale}</Text>
          </View>
        </View>
      </View>
    )
  };

  _onPressBack(){
    this.props.navigator.pop();
  };
}

module.exports = UserDetail;