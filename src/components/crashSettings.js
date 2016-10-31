'use strict'

import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  TextInput
} from 'react-native';
import Svg,{
    Rect
} from 'react-native-svg';

import styles from './styleSheet';
import getData from './getData';
import Button from './button';
import Icon from 'react-native-vector-icons/FontAwesome';


class CrashSummary extends Component {
  constructor(){
    super();
    this.state = {
      fill: 'rgb(255,255,255)',
      appVersions: [],
      text: 'Select or Type App Version',
      searching: false
    }
  };

  componentWillMount(){
    appVersions(this.props.id, (data) => {
      let allVersions = data;
      console.log(allVersions);
      this.setState({appVersions: allVersions})
    })
  };

  render(){
    return(
      <View style={styles.container}>
        <View style={styles.topLinks}>
          <Icon.Button name="chevron-left" size={20} color='rgb(23,153,173)' backgroundColor='white' onPress={this._onPressBack.bind(this)} />
          <Text style={styles.dark18Text}>{this.props.name}</Text>
          <Icon.Button name="cog" size={20} color='rgb(98,129,133)' backgroundColor='white' />
        </View>
        <ScrollView>
        <View style={styles.app}>
          <Text style={styles.dark15Text}>SETTINGS</Text>
          <Text style={styles.dark15Text}>Please select a time range</Text>
          <View style={[{flexDirection: 'row'}, {alignItems: 'center'}]}>
            <Svg style={{marginLeft: 6}} height={'15'} width={'15'}>
              <Rect x={'0'} y={'0'} width={'15'} height={'15'} stroke={'rgb(52,73,76)'} strokeWidth={'1'} fill={this.state.fill} />
            </Svg>
            <Text style={styles.dark15Text}>Last day</Text>
          </View>
          <View style={[{flexDirection: 'row'}, {alignItems: 'center'}]}>
            <Svg style={{marginLeft: 6}} height={'15'} width={'15'}>
              <Rect x={'0'} y={'0'} width={'15'} height={'15'} stroke={'rgb(52,73,76)'} strokeWidth={'1'} fill={this.state.fill} />
            </Svg>
            <Text style={styles.dark15Text}>Last 7 days</Text>
          </View>
          <View style={[{flexDirection: 'row'}, {alignItems: 'center'}]}>
            <Svg style={{marginLeft: 6}} height={'15'} width={'15'}>
              <Rect x={'0'} y={'0'} width={'15'} height={'15'} stroke={'rgb(52,73,76)'} strokeWidth={'1'} fill={this.state.fill} />
            </Svg>
            <Text style={styles.dark15Text}>Last 30 days</Text>
          </View>
        </View>
        <View style={styles.app}>
          <Text style={styles.dark15Text}>VERSION SETTINGS</Text>
          <Text style={styles.dark15Text}>Please select version</Text>
          <TextInput style={[styles.versionInput, styles.light15Text]} onFocus={() => this.setState({text: ''})} onChangeText={(text) => this.setState({text: text, searching: true})} value={this.state.text}/>{/*By default TextInput has no default styling*/}
          {this._getAppVersions()}
        </View>
        </ScrollView>
      </View>
    )
  };

  _getAppVersions(){
    const appVersions = [];
    for(var i = 0; i < this.state.appVersions.length; i ++){
      if(!this.state.searching || this.state.text === ''){
        appVersions.push(<Versions key={i} version={this.state.appVersions[i]} fill={this.state.fill} />);
      }else{
        if (this.state.appVersions[i].indexOf(this.state.text) > -1){
        appVersions.push(<Versions key={i} version={this.state.appVersions[i]} fill={this.state.fill} />);
        }
      }
    }
    return appVersions;
  };

    //Go back to previous screen
  _onPressBack(){
    this.props.navigator.pop();
  };
};

class Versions extends Component{
  render(){
    return(
      <View style={[{flexDirection: 'row'}, {alignItems: 'center'}]}>
        <Svg style={{marginLeft: 6}} height={'15'} width={'15'}>
          <Rect x={'0'} y={'0'} width={'15'} height={'15'} stroke={'rgb(52,73,76)'} strokeWidth={'1'} fill={this.props.fill} />
        </Svg>
        <Text style={styles.dark15Text}>{this.props.version}</Text>
      </View>
    )
  }
}





module.exports = CrashSummary;