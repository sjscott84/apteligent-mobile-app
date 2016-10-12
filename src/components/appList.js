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
import numeral from 'numeral'
import getData from './getData';
import Icon from 'react-native-vector-icons/FontAwesome';
import AvailableApps from './availableApps';

//The Applist component displays each available app along with some basic data
class AppList extends Component {
  constructor(){
    super();
    this.state ={
      apps: []
    }
  };

  //This makes a call to the api and returns all apps, and some inital data
  componentWillMount(){
    //combineData() is from getData.js
      combineData((data) => {
        this.setState({apps: data});
      });
  };

  render (){
    return (
      <View style={styles.container}>
        <View style={styles.topLinks}>
          <Text style={styles.dark18Text} onPress={this._onPressJumpTo.bind(this)}>Jump to...</Text>
          <Icon.Button name="cog" size={20} color='rgb(98,129,133)' backgroundColor='white' onPress={this._onPressSettings.bind(this)} />
        </View>
        <ScrollView>
          {this._getAppsInfo()}
        </ScrollView>
      </View>
    )
  };

  //This opens the avaliableApps component which is a simple clickable list of apps for easy searching (rather then having to scroll through all details)
  _onPressJumpTo(){
    this.props.navigator.push({
      name: 'availableApps',
      passProps: {
        data: this.state.apps,
        navigator: this.props.navigator
      }});
  }
  //TODO: Create actual settings
  _onPressSettings(){
    console.log("Settings");
  }

  _getAppsInfo(){
    const appView = [];
    const app = this.state.apps;
    const nav = this.props.navigator;
    for(var i = 0; i < app.length; i ++){
      appView.push(<AppsInfo navigator={nav} key={app[i]['id']} id={app[i]['id']} name={app[i]['name']} type={app[i]['type']} crashPercent={app[i]['crashPercent'].toFixed(2)} appLoads={numeral(app[i]['appLoads']).format('0.0a')} crashCount={app[i]['crashCount']} />);
    }
    return appView;
  }
};

class AppsInfo extends Component {
  //When the name of the app is pressed the appDetails component renders, which displays more info regarding the specific app
  _onPress(){
    this.props.navigator.push({
      name: 'appDetails',
      passProps: {
        id: this.props.id,
        name: this.props.name,
        type: this.props.type,
        crashPercent: this.props.crashPercent,
        appLoads: this.props.appLoads,
        crashCount: this.props.crashCount
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

module.exports = AppList;