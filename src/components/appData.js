import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
  Text,
  View
} from 'react-native';

import styles from './styleSheet';
import Icon from 'react-native-vector-icons/FontAwesome';

class AppsInfo extends Component {

  _onPress(){
    this.props.navigator.push({
      name: 'appDetails',
      passProps: {
        id: this.props.id,
        name: this.props.name,
        type: this.props.type,
        crashPercent: this.props.crashPercent,
        appLoads: this.props.appLoads
      }});
  };

  render (){
    return (
      <View style={[styles.app, {height: 185}]}>
        <View style={styles.head}>
          <Image style={styles.logo} source={require('../images/logoTest.png')}/>
          <Text style={styles.largeLink} onPress={this._onPress.bind(this)}>{this.props.name}</Text>
        </View>
          <Text style={[styles.light14Text, {flexDirection: 'column'}]}>All Versions</Text>
          <Text style={[styles.light14Text, {flexDirection: 'column'}]}>{this.props.type}</Text>
          <View style={styles.crashInfo}>
            <AppInfo name="Crash Rate" data={this.props.crashPercent+'%'}/>
            <AppInfo name="App Load" data={this.props.appLoads}/>
            <AppInfo name="HTTP error rate" data='3.2%'/>
          </View>
      </View>
    )
  }
}

class AppInfo extends Component {
  render (){
    return (
      <View>
        <Text style={styles.dark13Text}>{this.props.name}</Text>
        <Text style={styles.light11Text}>Last 24h</Text>
        <Text style={styles.boldText}>{this.props.data}</Text>
      </View>
    )
  }
}

module.exports = {AppsInfo, AppInfo};