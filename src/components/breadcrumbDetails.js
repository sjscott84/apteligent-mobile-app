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
    Rect
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
        <ScrollView>
          <View style={styles.app}>
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
          </View>
          <View style={styles.app}>
            <Text style={styles.dark15Text}>CRASH STACK</Text>
            {this._getSquares()}
          </View>
        </ScrollView>
      </View>
    )
  }

  _getSquares(){
    let squareArray = [];
    let summary = [{crashes: 0}, {handledException: 0}, {user: 0}, {network: 0}, {system: 0}]
    let crumbs = this.props.breadcrumbs
    let color;
    for(var i = 0; i < crumbs.length; i++){
      switch(crumbs[i]['type']){
        case 'crash':
          summary[0]['crashes']++
          color = 'rgb(208,2,27)';
          break;
        case 'handledException':
          summary[1]['handledException']++
          color = 'rgb(252,200,148)';
          break;
        case 'user':
          summary[2]['user']++
          color = 'rgb(205,220,57)';
          break;
        case 'network':
          summary[3]['network']++
          color = 'rgb(10,61,72)';
          break;
        default:
          summary[4]['system']++ 
          color = 'rgb(121,142,35)';
      }
      squareArray.push(
        <Svg key={i} height={35} width={35}>
          <Rect x={1} y={1} width={31} height={31} fill={color} />
        </Svg>
      )
    }
    return (<Crumbs 
      squareArray={squareArray} 
      crashes={summary[0]['crashes']} 
      handledException={summary[1]['handledException']}
      user={summary[2]['user']}
      network={summary[3]['network']}
      system={summary[4]['system']} />)
  }

  _onPressBack(){
    this.props.navigator.pop();
  };
}

class Crumbs extends Component {
  render(){
    return(
      <View>
        <View style={[{flexDirection: 'row'}, {flexWrap: 'wrap'}, {marginLeft: 6}]}>
          {this.props.squareArray}
        </View>
          <Summary color={'rgb(208,2,27)'} what={'Crashes'} number={this.props.crashes} />
          <Summary color={'rgb(252,200,148)'} what={'Handeled Exceptions'} number={this.props.handledException} />
          <Summary color={'rgb(205,220,57)'} what={'User Defined'} number={this.props.user} />
          <Summary color={'rgb(10,61,72)'} what={'Network Events'} number={this.props.network} />
          <Summary color={'rgb(121,142,35)'} what={'System Events'} number={this.props.system} />
      </View>
    )
  };
}

class Summary extends Component {
  render(){
    return(
      <View style={[{flexDirection: 'row'}, {marginLeft: 6}]}>
        <Svg height={17} width={17}>
          <Rect x={1} y={1} width={16} height={16} fill={this.props.color} />
        </Svg>
        <Text style={styles.dark13Text}>{this.props.what} ({this.props.number})</Text>
      </View>
    )
  }
}

module.exports = BreadcrumbDetails;