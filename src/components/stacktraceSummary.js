'use strict'

import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  ScrollView,
  ListView
} from 'react-native';

import styles from './styleSheet';
import getData from './getData';

class StacktraceSummary extends Component {
  constructor(){
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([])
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
      this.props.data[i]['backgroundColor'] = backgroundColor;
      stackTraceText.push(this.props.data[i]);
    }
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(stackTraceText)
    });
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
        <ListView dataSource={this.state.dataSource} renderRow={(data) => <StackTraceItem backgroundColor={data['backgroundColor']} color={data['suspect']} lineNumber={data['lineNumber']} trace={data['trace']} />} />
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