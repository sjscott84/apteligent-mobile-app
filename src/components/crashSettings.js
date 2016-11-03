'use strict'

import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  TextInput,
  ActivityIndicator,
  AsyncStorage
} from 'react-native';
import Svg,{
    Rect
} from 'react-native-svg';

import styles from './styleSheet';
import getData from './getData';
import Icon from 'react-native-vector-icons/FontAwesome';


class CrashSummary extends Component {
  constructor(){
    super();
    this.state = {
      fill: 'rgb(255,255,255)',
      appVersions: [],
      text: 'Select or Type App Version',
      searching: false,
      selectedTime: '1',
      selectedVersion: 'all',
      animating: true,
      isLoading: true
    }
  };

  //Retrieves all the versions for an app from the api
  componentWillMount(){
    appVersions(this.props.id, (data) => {
      let allVersions = data;
      allVersions.unshift('all');
      this.setState({
        appVersions: allVersions,
        isLoading: false
      })
    })
  };

  render(){
    var spinner = this.state.isLoading ? (<ActivityIndicator animating={this.state.animating} style={[{height: 80}]} size='large'/>) :
    (<View>
      <View style={styles.app}>
        <Text style={styles.dark15Text}>DATE SETTINGS</Text>
        <Text style={styles.dark15Text}>Please select a time range</Text>
        <Versions onPress={this._onPressSelect.bind(this, '1')} version={'Last Day'} fill={(this.state.selectedTime === '1') ? 'rgb(54,143,175)' : 'rgb(255,255,255)'} />
        <Versions onPress={this._onPressSelect.bind(this, '7')} version={'Last 7 Days'} fill={(this.state.selectedTime === '7') ? 'rgb(54,143,175)' : 'rgb(255,255,255)'} />
        <Versions onPress={this._onPressSelect.bind(this, '30')} version={'Last 30 Days'} fill={(this.state.selectedTime === '30') ? 'rgb(54,143,175)' : 'rgb(255,255,255)'} />
      </View>
      <View style={styles.app}>
        <Text style={styles.dark15Text}>VERSION SETTINGS</Text>
        <Text style={styles.dark15Text}>Please select version</Text>
        <TextInput style={[styles.versionInput, styles.light15Text]} onFocus={() => this.setState({text: ''})} onChangeText={(text) => this.setState({text: text, searching: true})} value={this.state.text}/>{/*By default TextInput has no default styling*/}
        {this._getAppVersions()}
      </View>
    </View>)
    return(
      <View style={styles.container}>
        <View style={[styles.topLinks, {justifyContent: 'flex-start'}]}>
          <Icon.Button name="chevron-left" size={20} color='rgb(23,153,173)' backgroundColor='white' onPress={this._onPressBack.bind(this)} />
          <Text style={styles.dark15Text}>Apply Settings</Text>
        </View>
        <ScrollView>
          {spinner}
        </ScrollView>
      </View>
    )
  };

  //Creates the component for each version, including when the versions are being filtered
  _getAppVersions(){
    const appVersions = [];
    for(var i = 0; i < this.state.appVersions.length; i ++){
      if(!this.state.searching || this.state.text === ''){
        appVersions.push(<Versions key={i} onPress={this._onPressSelectVersion.bind(this, this.state.appVersions[i])} version={this.state.appVersions[i]} fill={(this.state.selectedVersion === this.state.appVersions[i]) ? 'rgb(54,143,175)' : 'rgb(255,255,255)'} />);
      }else{
        if (this.state.appVersions[i].indexOf(this.state.text) > -1){
        appVersions.push(<Versions key={i} onPress={this._onPressSelectVersion.bind(this, this.state.appVersions[i])} version={this.state.appVersions[i]} fill={(this.state.selectedVersion === this.state.appVersions[i]) ? 'rgb(54,143,175)' : 'rgb(255,255,255)'} />);
        }
      }
    }
    return appVersions;
  };

  //Sets the state of the slected time period
  _onPressSelect(selected){
    this.setState({selectedTime: selected});
  }

  //Sets the state of the selected version
  _onPressSelectVersion(selected){
    this.setState({selectedVersion: selected});
  }

    //Go back to previous screen
  _onPressBack(){
    AsyncStorage.setItem('crashTime', this.state.selectedTime);
    AsyncStorage.setItem('crashVersion', this.state.selectedVersion);
    this.props.navigator.replace({
      name: 'crashInfo',
      passProps: {
        id: this.props.id,
        name: this.props.name,
        //time: this.state.selectedTime,
        //version: this.state.selectedVersion
      }
    });
  };
};

class Versions extends Component{
  render(){
    return(
    <TouchableHighlight underlayColor={'gray'} onPress={this.props.onPress} style={{marginLeft: 6}}>
        <View style={[{flexDirection: 'row'}, {alignItems: 'center'}]}>
          <Svg style={{marginLeft: 6}} height={'20'} width={'20'}>
            <Rect x={'0'} y={'0'} width={'20'} height={'20'} stroke={'rgb(52,73,76)'} strokeWidth={'1'} fill={this.props.fill} />
          </Svg>
          <Text style={[styles.dark15Text, {lineHeight: 30}]}>{this.props.version}</Text>
        </View>
      </TouchableHighlight>
    )
  }
}





module.exports = CrashSummary;