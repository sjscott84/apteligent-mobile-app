'use strict'

import React, { Component } from 'react';
import {
  AppRegistry,
  Image,
  Text,
  View,
  ScrollView,
  ActivityIndicator
} from 'react-native';

import styles from './styleSheet';
import getData from './getData';
import Icon from 'react-native-vector-icons/FontAwesome';

//The Applist component displays each available app along with some basic data
class AppList extends Component {
  constructor(){
    super();
    this.state ={
      apps: [],
      animating: true,
      isLoading: true
    }
  };

  //This makes a call to the api and returns all apps
  componentWillMount(){
    //getAvaliableApps() is from getData.js
      getAvaliableApps((data) => {
        this.setState({
          apps: data,
          isLoading: false
        });
      });
  };

  render (){
    var spinner = this.state.isLoading ? (<ActivityIndicator animating={this.state.animating} style={[{height: 80}]} size='large'/>) :
     (<ScrollView>{this._getAppsInfo()}</ScrollView>);
    return (
      <View style={styles.container}>
        <View style={styles.topLinks}>
          <Text style={styles.dark18Text} onPress={this._onPressJumpTo.bind(this)}>Jump to...</Text>
          <Icon.Button name="chevron-down" size={20} color='rgb(23,153,173)' backgroundColor='white' onPress={this._onPressJumpTo.bind(this)} />
        </View>
        {spinner}
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
      appView.push(<AppsInfo navigator={nav} key={app[i]['id']} id={app[i]['id']} name={app[i]['name']} type={app[i]['type']} />);
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
        type: this.props.type
      }});
  };

  render (){
    return (
      <View style={[styles.app, {height: 83}, {justifyContent: 'center'}]}>
        <View style={[{flexDirection: 'row'}]}>
          <Image style={[styles.logo, {marginTop: 0}]} source={require('../images/logoTest.png')}/>
          <View>
            <Text style={styles.largeLink} onPress={this._onPress.bind(this)}>{this.props.name}</Text>
            <Text style={[styles.light14Text, {flexDirection: 'column'}]}>{this.props.type}</Text>
          </View>
        </View>
      </View>
    )
  }
}

module.exports = AppList;