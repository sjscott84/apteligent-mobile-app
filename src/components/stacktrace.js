//Currently not being used!!

'use strict'

import React, { Component } from 'react';
import {
  AppRegistry,
  Image,
  Text,
  View,
  ScrollView,
  Dimensions,
} from 'react-native';
import Svg,{
    Circle,
    Line
} from 'react-native-svg';

import styles from './styleSheet';
import Icon from 'react-native-vector-icons/FontAwesome';
import getData from './getData';

class Stacktrace extends Component {
  constructor(){
    super();
    this.state = {
      stacktrace: []
    }
  }

  componentWillMount(){
    getStacktrace(this.props.id, this.props.hash, (data) => {
      let stackTraceText = [];
      let backgroundColor;
      for(var i = 0; i < data.length; i++){
        if(i % 2 === 0){
          backgroundColor = 'rgb(255,255,255)';
        }else{
          backgroundColor = 'rgb(244,246,247)';
        }
        stackTraceText.push(<Text key={[i]} style={[styles.dark15Text, {backgroundColor: backgroundColor}]}>{data[i]['lineNumber']}     {data[i]['trace']}</Text>)
      }
      this.setState({stacktrace: stackTraceText});
    })
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
            <Text style={styles.bold15Text}>Name</Text>
            <Text style={styles.dark15Text}>{this.props.crashName}</Text>
            <Text style={styles.bold15Text}>Reason</Text>
            <Text style={styles.dark15Text}>{this.props.reason}</Text>
            <Text style={styles.bold15Text}>App Version</Text>
            <Text style={styles.dark15Text}>Total</Text>
            <Text style={styles.bold15Text}>Crashed Thread</Text>
            {this.state.stacktrace}
          </View>
        </ScrollView>
      </View>
    )
  }

  _onPressBack(){
    this.props.navigator.pop();
  };
}

module.exports = Stacktrace;