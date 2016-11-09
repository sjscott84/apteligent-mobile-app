'use strict'

import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  ScrollView
} from 'react-native';

import styles from './styleSheet';
import getData from './getData';
import moment from 'moment';
import AppFooter from './appFooter';
import AppHeader from './appHeader';

class UserDetail extends Component {
  constructor(){
    super();
    this.state = {

    }
  }
  //Get user information from the api
  componentWillMount(){
    getUserDetails(this.props.id, this.props.hash, this.props.username, (data) =>{
      if(data === "Error"){
        this.props.navigator.push({name: 'errorScreen'});
      }else{
        this.setState({
          appVersion: data['appVersion'],
          system: data['system'],
          locale: data['locale'],
          device: data['device'],
          carrier: data['carrier'],
          lastLogIn: data['lastLogIn'],
          lastCrash: data['lastCrash']
        })
      }
    })
  }

  render(){
    return(
      <View style={styles.container}>
        <AppHeader navigator={this.props.navigator} name={this.props.name}/>
        <ScrollView>
          <View style={styles.app}>
            <Text style={styles.dark15Text}>APP USER</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={[{flex: 1}, styles.dark15Text]}>Username</Text>
              <Text style={[{flex: 2}, styles.bold15Text]}>{this.props.username}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={[{flex: 1}, styles.dark15Text]}>Last Log In</Text>
              <Text style={[{flex: 2}, styles.bold15Text]}>{moment.utc(this.state.lastLogIn).format('MM/DD/YYYY hh:mm:ss UTC')}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={[{flex: 1}, styles.dark15Text]}>Last Crash</Text>
              <Text style={[{flex: 2}, styles.bold15Text]}>{moment.utc(this.state.lastCrash).format('MM/DD/YYYY hh:mm:ss UTC')}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={[{flex: 1}, styles.dark15Text]}>Device</Text>
              <Text style={[{flex: 2}, styles.bold15Text]}>{this.state.device}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={[{flex: 1}, styles.dark15Text]}>App Version</Text>
              <Text style={[{flex: 2}, styles.bold15Text]}>{this.state.appVersion}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={[{flex: 1}, styles.dark15Text]}>OS</Text>
              <Text style={[{flex: 2}, styles.bold15Text]}>{this.state.system}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={[{flex: 1}, styles.dark15Text]}>Locale</Text>
              <Text style={[{flex: 2}, styles.bold15Text]}>{this.state.locale}</Text>
            </View>
          </View>
        </ScrollView>
        <AppFooter navigator={this.props.navigator} id={this.props.id} name={this.props.name} type={this.props.type} />
      </View>
    )
  };
}

module.exports = UserDetail;