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
import numeral from 'numeral';

//The Applist component displays each available app along with some basic data
class AppList extends Component {
  constructor(){
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state ={
      dataSource: ds.cloneWithRows([]),
      animating: true,
      isLoading: true,
    }
  };

  //This makes a call to the api and returns all apps
  componentWillMount(){
    //getAvaliableApps() is from getData.js
      getAvaliableApps((error, data) => {
        if(error){
          this.props.navigator.push({name: 'errorScreen'});
        }else{
          console.log(data)
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(data),
            isLoading: false
          });
        }
      });
  };

  render (){
    var spinner = this.state.isLoading ? (<ActivityIndicator animating={this.state.animating} style={[{height: 80}]} size='large'/>) :
     (<ListView dataSource={this.state.dataSource} renderRow={(data) => <AppsInfo navigator={this.props.navigator} id={data['id']} name={data['name']} type={data['type']} image={data['icon']} />} />);
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={this._onPressJumpTo.bind(this)}>
          <View style={styles.topLinks}>
            <Text style={styles.dark18Text}>Jump to...</Text>
            <Icon style={{marginRight: 20}} name="search" size={20} color='rgb(98,129,133)' backgroundColor='white' />
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
  constructor(){
    super();
    this.state = {
      crashRate: 0,
      crashCount: 0,
      appLoads: 0
    }
  }
  componentWillMount(){
    getCrashSummaries(this.props.id, (error, data) => {
      if(error){
        this.props.navigator.push({name: 'errorScreen'});
      }else{
        this.setState({
          crashRate: data['crashPercent'],
          crashCount: data['crashCount'],
          appLoads: data['appLoads']
        })
      }
    })
  }

  _onPress(){
    this.props.navigator.push({
      name: 'appDetails',
      passProps: {
        id: this.props.id,
        name: this.props.name,
        type: this.props.type,
        image: this.props.image
      }});
  };

  render (){
    let maxLimit = 28;
    let image = (this.props.image != "None") ? (<Image style={[styles.logo, {marginTop: 4}]} source={{uri: this.props.image}} />) :
    (<Image style={[styles.logo, {marginTop: 4}]} source={require('../images/favicon.png')} />)
    return (
      <View style={[styles.app, {justifyContent: 'center'}]}>
        <View style={[{flexDirection: 'row'}, {marginTop: 10}]}>
          {image}
          <View>
            <Text numberOfLines={1} style={styles.largeLink} onPress={this._onPress.bind(this)}>
              { (this.props.name.length > maxLimit) ? 
              (((this.props.name).substring(0,maxLimit-3)) + '...') : 
              this.props.name }</Text>
            <Text style={[styles.light14Text, {flexDirection: 'column'}]}>{this.props.type}</Text>
          </View>
        </View>
        <View style={[{flexDirection: 'row'}, {justifyContent: 'space-between'}, {marginBottom: 10}, {marginTop: 10}]}>
          <AppInfo name={'Crash Rate'} data={numeral(this.state.crashRate).format('0.00')+'%'} />
          <AppInfo name={'Crash Count'} data={numeral(this.state.crashCount).format('0.0a')} />
          <AppInfo name={'App Loads'} data={numeral(this.state.appLoads).format('0.0a')} />
        </View>
      </View>
    )
  }
}

class AppInfo extends Component {
  render (){
    return (
      <View style={{marginRight: 10}}>
        <Text style={styles.dark15Text}>{this.props.name}</Text>
        <Text style={styles.light13Text}>Current 24h</Text>
        <Text style={styles.bold15Text}>{this.props.data}</Text>
      </View>
    )
  }
}

module.exports = AppList;