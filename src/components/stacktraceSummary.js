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
      stacktrace: []
    }
  }

  //Creates a list of stacktraces from the data passed through as props
  componentWillMount(){
    let stackTraceText = [];
    let backgroundColor;
    for(var i = 0; i < this.props.data.length; i++){
      if(i % 2 === 0){
        backgroundColor = 'rgb(255,255,255)';
      }else{
        backgroundColor = 'rgb(244,246,247)';
      }
      stackTraceText.push(<StackTraceItem key={[i]} backgroundColor={backgroundColor} lineNumber={this.props.data[i]['lineNumber']} trace={this.props.data[i]['trace']} />)
    }
    this.setState({stacktrace: stackTraceText});
  }

  render(){
    return(
      <View style={{marginTop: 0}}>
        <Text style={styles.bold15Text}>Name</Text>
        <Text style={styles.dark15Text}>{this.props.crashName}</Text>
        <Text style={styles.bold15Text}>Reason</Text>
        <Text style={styles.dark15Text}>{this.props.reason}</Text>
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
      <View style={[{flexDirection: 'row'}, {justifyContent: 'flex-start'}, {flexWrap:'wrap'}, {backgroundColor: this.props.backgroundColor}]}>
        <Text style={[{flex: 1}, styles.dark15Text]}>{this.props.lineNumber}</Text>
        <Text style={[{flex: 6}, styles.dark15Text]}>{this.props.trace}</Text>
      </View>
    )
  }
}

module.exports = StacktraceSummary;