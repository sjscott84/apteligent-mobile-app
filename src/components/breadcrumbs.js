'use strict'

import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  ListView
} from 'react-native';

import styles from './styleSheet';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import getData from './getData';

class Breadcrumbs extends Component {
  constructor(){
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([])
    }
  }
  //Get breadcrumbs from the api
  componentWillMount(){
    getBreadcrumbs((data) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(data)
      })
    })
  }

  render(){
    return(
      <View style={{marginTop: 0}}>
        <View style={[{flexDirection: 'row'}, {borderColor: 'rgb(253,231,206)'}, {borderWidth: 1}, {margin: 10}]}>
          <Icon name="exclamation" size={18} color='rgb(245,133,56)' backgroundColor='white' style={[{marginLeft: 6}, {marginTop: 2}]} />
          <Text style={[styles.dark15Text, {flex: 1}, {flexWrap: 'wrap'}]}>Changing date range does not filter breadcrumbs.</Text>
        </View>
        <ListView dataSource={this.state.dataSource} renderRow={(data) => <BreadcrumbItem 
          name={this.props.name}
          navigator={this.props.navigator}
          id={this.props.id}
          hash={this.props.hash}
          username={data['username']} 
          appVersion={data['appVersion']} 
          dateAndTime={moment.utc(data['dateAndTime']).format('MM/DD/YYYY hh:mm:ss UTC')} 
          noOfBreadcrumbs={data['noOfBreadcrumbs']}
          device={data['device']}
          os={data['os']}
          breadcrumbs={data['breadcrumbs']} />} />
      </View>
    )
  }
}

class BreadcrumbItem extends Component {
  render(){
    return(
      <View style={[{marginTop: 0}, {marginBottom: 6}, {borderBottomWidth: 1}, {borderBottomColor: 'rgb(244,246,247)'}]}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.dark15Text}>Username</Text>
          <Text style={[styles.smallLink, {marginTop: 0}]} onPress={this._onPressUser.bind(this)}>{this.props.username}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.dark15Text}>App Version</Text>
          <Text style={styles.bold15Text}>{this.props.appVersion}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.dark15Text}>Breadcrumbs</Text>
          <Text style={styles.bold15Text}>{this.props.noOfBreadcrumbs}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.dark15Text}>Date & Time</Text>
          <Text style={styles.bold15Text}>{this.props.dateAndTime}</Text>
        </View>
        <TouchableHighlight style={styles.breadcrumbButton} underlayColor={'gray'} onPress={this._onPressViewDetails.bind(this)}>
          <Text style={styles.breadcrumbButtonText}>VIEW DETAILS</Text>
        </TouchableHighlight>
      </View>
    )
  };

  //View more details about the breadcrumb
  _onPressViewDetails(){
    this.props.navigator.push({
      name: 'breadcrumbDetails',
      passProps: {
        id: this.props.id,
        name: this.props.name,
        username: this.props.username,
        appVersion: this.props.appVersion,
        noOfBreadcrumbs: this.props.noOfBreadcrumbs,
        dateAndTime: this.props.dateAndTime,
        device: this.props.device,
        os: this.props.os,
        breadcrumbs: this.props.breadcrumbs
      }
    })
  };

  //View some basic data about the user
  _onPressUser(){
    this.props.navigator.push({
      name: 'userDetail',
      passProps: {
        id: this.props.id,
        name: this.props.name,
        username: this.props.username,
        hash: this.props.hash
      }
    })
  };
}

module.exports = Breadcrumbs;