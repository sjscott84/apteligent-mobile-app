'use strict'

import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  ScrollView,
} from 'react-native';

import styles from './styleSheet';
import getData from './getData';

class StacktraceSummary extends Component {
  constructor(){
    super();
    this.state = {
      stacktrace: [],
      suspectLine: 0
    }
  }

  //Creates a list of stacktraces from the data passed through as props
  componentWillMount(){
    let stackTraceText = [];
    let suspect;
    let backgroundColor;
    for(var i = 0; i < this.props.data.length; i++){
      if(this.props.data[i]['suspect'] != '0'){
        suspect = this.props.data[i]['suspect'];
      }
      if(i % 2 === 0){
        backgroundColor = 'rgb(255,255,255)';
      }else{
        backgroundColor = 'rgb(244,246,247)';
      }
      stackTraceText.push(<StackTraceItem key={[i]} color={this.props.data[i]['suspect']} backgroundColor={backgroundColor} lineNumber={this.props.data[i]['lineNumber']} trace={this.props.data[i]['trace']} />)
    }
    this.setState({
      stacktrace: stackTraceText,
      suspectLine: suspect 
    });
  }

  render(){
    return(
      <View style={{marginTop: 0}}>
        <Text style={styles.bold15Text}>Name</Text>
        <Text style={styles.dark15Text}>{this.props.crashName}</Text>
        <Text style={styles.bold15Text}>Reason</Text>
        <Text style={styles.dark15Text}>{this.props.reason}</Text>
        <Text style={styles.bold15Text}>Suspect Line</Text>
        <Text style={styles.dark15Text}>{this.state.suspectLine}</Text>
        <Text style={styles.bold15Text}>App Version</Text>
        <Text style={styles.dark15Text}>Total</Text>
        <Text style={styles.bold15Text}>Crashed Thread</Text>
        {this.state.stacktrace}
      </View>
    )
  }
}

class StackTraceItem extends Component{
  render(){
    return(
      <View style={[{flexDirection: 'row'}, {justifyContent: 'flex-start'}, {flexWrap:'wrap'}, {backgroundColor: this.props.backgroundColor}, {paddingTop: 2}]}>
        <Text style={(this.props.color != '0') ? [{flex: 1}, styles.dark15Text, {color: 'red'}]:[{flex: 1}, styles.dark15Text]}>{this.props.lineNumber}</Text>
        <Text style={(this.props.color != '0') ? [{flex: 6}, styles.dark15Text, {color: 'red'}]:[{flex: 6}, styles.dark15Text]}>{this.props.trace}</Text>
      </View>
    )
  }
}

module.exports = StacktraceSummary;