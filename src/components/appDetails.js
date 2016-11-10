'use strict'

import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator
} from 'react-native';

import styles from './styleSheet';
import BarChart from './barChart';
import getData from './getData';
import numeral from 'numeral';
import Button from './button';
import AppFooter from './appFooter';
import AppHeader from './appHeader';

class AppDetails extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      animating: true,
      apps: props,
      time: 'PT5M',
      displayTime: 'Last 5min',
      mau: 'mau',
      dau: 'dau',
      crashPercent: 0,
      crashCountTotal: 0,
      crashRateArray: [1],
      appLoadArray: [1],
      start: '',
      end: '',
      appLoadTotalLive: 0,
      crashCountTotalLive: 0
    }
  };

  //Retrieves all the data needed for this page from the api, using callbacks to ensure all data retrieved
  componentWillMount(){
    let mau, dau, crashPercent, crashCountTotal;;
    getMAU(this.props.id, (data) => {
      if(data === 'Error'){
        mau = false;
      }else{
        mau = data;
      }
      getDAU(this.props.id, (data) => {
        if(data === 'Error'){
          dau = false;
        }else{
          dau = data;
        }
        getCrashSummaries(this.props.id, (data) => {
          if(data === 'Error'){
            crashPercent = false;
            crashCountTotal = false;
          }else{
            crashPercent = data['crashPercent'];
            crashCountTotal = data['crashCount'];
          }
          crashCountGraph(this.props.id, this.state.time, (data) => {
            if(data === "Error"){
              this.props.navigator.push({name: 'errorScreen'})
            }else{
              this.setState({
                crashRateArray: data['crashRateArray'],
                appLoadArray: data['appLoadsArray'],
                start: data['start'],
                end: data['end'],
                appLoadTotalLive: data['appLoadTotal'],
                crashCountTotalLive: data['crashCountTotal'],
                mau: mau,
                dau: dau,
                crashPercent: crashPercent,
                crashCountTotal: crashCountTotal,
                isLoading: false
              })
            }
          })
        })
      })
    })
  };

  render(){
    var spinner = this.state.isLoading ? (<ActivityIndicator animating={this.state.animating} style={[{height: 80}]} size='large'/>) :
     (  <View>
          <View style={styles.app}>
            <View style={[{flexDirection: 'row'}, {borderBottomColor: 'rgb(229,234,236)'}, {borderBottomWidth: 1}, {paddingBottom: 8}]}>
              <Image style={styles.logo} source={require('../images/logoTest.png')}/>
              <View>
                <Text style={styles.largeText}>{this.props.name}</Text>
                <Text style={styles.light14Text}>{this.props.type}</Text>
              </View>
            </View>
            <View style={[{borderBottomColor: 'rgb(229,234,236)'}, {borderBottomWidth: 1}, {paddingTop: 5}, {paddingBottom: 8}]}>
              <Text style={styles.dark14Text}>Versions: All</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Summary style={[{borderRightWidth: 1}, {borderRightColor: 'rgb(244,246,247)'}]} what='DAU' timeFrame='Current 24h' figure={this._returnNumber(this.state.dau)} />
              <Summary what='MAU' timeFrame='Current 30 days' figure={this._returnNumber(this.state.mau)} />
            </View>
          </View>
          <View style={styles.app}>
            <View style={{flexDirection: 'row'}}>
              <Summary style={[{borderRightWidth: 1}, {borderRightColor: 'rgb(244,246,247)'}]} what='Crash rate' timeFrame='Current 24h' figure={this._returnNumber(this.state.crashPercent)} />
              <Summary what='Crash count' timeFrame='Current 24h' figure={this._returnNumber(this.state.crashCountTotal)} />
            </View>
          </View>
          <Button style={{margins: 6}} text={'VIEW CRASH SUMMARY'} onPress={this._onPress.bind(this)} />
          <View style={styles.app}>
            <View style={[{flexDirection: 'row'}, {justifyContent: 'space-between'}, {alignItems: 'center'}, {borderBottomColor: 'rgb(122,143,147)'}, {borderBottomWidth: 1}, {paddingTop: 5}, {paddingBottom: 8}]}>
              <Text style={styles.bold15Text}>LIVE STATS</Text>
            </View>
            <CrashGraphs 
              graphName={'CRASH COUNT'}
              liveCount={this.state.crashCountTotalLive}
              data={this.state.crashRateArray}
              start={this.state.start}
              end={this.state.end} />
            <CrashGraphs 
              graphName={'APP LOAD COUNT'}
              liveCount={this.state.appLoadTotalLive}
              data={this.state.appLoadArray}
              start={this.state.start}
              end={this.state.end} />
          </View>
        </View> );
    return(
      <View style={styles.container}>
        <AppHeader navigator={this.props.navigator} name={this.props.name}/>
        <ScrollView>
          {spinner}
        </ScrollView>
        <AppFooter navigator={this.props.navigator} id={this.props.id} name={this.props.name} type={this.props.type} />
      </View>
    )
  };

  _returnNumber(figure){
    if(!figure){
      return 'Unavailable';
    }else if(figure === this.state.crashPercent){
      return numeral(figure).format('0.00a')+'%';
    }else{
      return numeral(figure).format('0.0a');
    }
  }

  //Opens crashInfo page
  _onPress(){
    this.props.navigator.push({
      name: 'crashInfo',
      passProps: {
        id: this.props.id,
        name: this.props.name,
        type: this.props.type,
        time: '1',
        version: 'all'
      }
    });
  }
};

class Summary extends Component {
  render(){
    return(
      <View style={[styles.appDetailSummaryItem, this.props.style]}>
        <Text style={styles.dark15Text}>{this.props.what}</Text>
        <Text style={styles.light13Text}>{this.props.timeFrame}</Text>
        <Text style={styles.boldText}>{this.props.figure}</Text>
      </View>
    )
  }
};

class CrashGraphs extends Component {
  render(){
    return(
      <View style={[{borderBottomColor: 'rgb(244,246,247)'}, {borderBottomWidth: 1}]}>
        <View style={[{paddingTop: 5}, {paddingBottom: 8}]}>
          <Text style={styles.dark15Text}>{this.props.graphName}</Text>
          <Text style={styles.light14Text}>Last 5min</Text>
          <Text style={styles.boldText}>{numeral(this.props.liveCount).format('0.0a')}</Text>
        </View>
        <View style={{paddingBottom: 14}}>
          <BarChart data={this.props.data} start={this.props.start} end={this.props.end} numberType='number' graphName={this.props.graphName} />
        </View>
      </View>
    )
  }
}

class AppInfo extends Component {
  render (){
    return (
      <View>
        <Text style={styles.dark13Text}>{this.props.name}</Text>
        <Text style={styles.light11Text}>Last 24h</Text>
        <Text style={styles.boldText}>{this.props.data}</Text>
      </View>
    )
  }
}

module.exports = AppDetails;
