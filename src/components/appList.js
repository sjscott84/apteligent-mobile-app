'use strict'

import React, { Component } from 'react';
import {
  AppRegistry,
  Image,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableHighlight,
  ListView
} from 'react-native';

import styles from './styleSheet';
import getData from './getData';
import Icon from 'react-native-vector-icons/FontAwesome';

//The Applist component displays each available app along with some basic data
class AppList extends Component {
  constructor(){
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state ={
      dataSource: ds.cloneWithRows([]),
      animating: true,
      isLoading: true
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
            dataSource: this.state.dataSource.cloneWithRows(data),
            isLoading: false
          });
        }
      });
  };

  render (){
    var spinner = this.state.isLoading ? (<ActivityIndicator animating={this.state.animating} style={[{height: 80}]} size='large'/>) :
     (<ListView dataSource={this.state.dataSource} renderRow={(data) => <AppsInfo navigator={this.props.navigator} id={data['id']} name={data['name']} type={data['type']} />} />);
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={this._onPressJumpTo.bind(this)}>
          <View style={styles.topLinks}>
            <Text style={styles.dark18Text}>Jump to...</Text>
            <Icon style={{marginRight: 10}} name="chevron-down" size={20} color='rgb(23,153,173)' backgroundColor='white' />
          </View>
        </TouchableHighlight>
        {spinner}
      </View>
    )
  };

  //This opens the avaliableApps component which is a simple clickable list and autocomplete search of apps for easy searching (rather then having to scroll through all details)
  _onPressJumpTo(){
    this.props.navigator.push({
      name: 'availableApps',
      passProps: {
        data: this.state.apps,
        navigator: this.props.navigator
      }});
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