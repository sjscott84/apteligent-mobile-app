'use strict'

import React, { Component } from 'react';
import {
  AppRegistry,
  Image,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableHighlight
} from 'react-native';
import Svg,{
    Circle,
    Line
} from 'react-native-svg';

import styles from './styleSheet';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import getData from './getData';

class BreadcrumbDetails extends Component {
  constructor(props){
    super(props);
    this.state = {
      breadcrumb: props
    }
  }

  render(){
    return(
      <View style={styles.container}>
        <View style={styles.topLinks}>
          <Icon.Button name="chevron-left" size={20} color='rgb(23,153,173)' backgroundColor='white' onPress={this._onPressBack.bind(this)} />
          <Text style={styles.dark18Text}>{this.props.name}</Text>
          <Icon.Button name="cog" size={20} color='rgb(98,129,133)' backgroundColor='white' onPress={this._onPressBack.bind(this)} />
        </View>
        <View style={styles.app}>
          <ScrollView>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.dark15Text}>Username</Text>
              <Text style={[styles.smallLink, {marginTop: 0}]}>{this.props.username}</Text>
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
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.dark15Text}>Device</Text>
              <Text style={styles.bold15Text}>{this.props.device}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.dark15Text}>OS Version</Text>
              <Text style={styles.bold15Text}>{this.props.os}</Text>
            </View>
          </ScrollView>
        </View>
      </View>
    )
  }

  _onPressBack(){
    this.props.navigator.pop();
  };
}

module.exports = BreadcrumbDetails;