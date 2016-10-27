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
      breadcrumb: props,
      color: 'rgb(255,255,255)',
      number: '',
      text: ''
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
            <Text style={styles.dark15Text}>BREADCRUMBS</Text>
            <View style={[{flexDirection: 'row'}, {borderColor: 'rgb(253,231,206)'}, {borderWidth: 1}, {margin: 6}]}>
              <Icon name="exclamation" size={18} color='rgb(245,133,56)' backgroundColor='white' style={[{marginLeft: 6}, {marginTop: 2}]} />
              <Text style={[styles.dark15Text, {flex: 1}, {flexWrap: 'wrap'}]}>Changing date range does not filter breadcrumbs.</Text>
            </View>
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
    let crashDetails = [];
    let summary = [{crashes: 0}, {handledException: 0}, {user: 0}, {network: 0}, {system: 0}, {unknown: 0}]
    let crumbs = this.props.breadcrumbs
    let color;
    let text;
    let background;
    for(var i = 0; i < crumbs.length; i++){
      if(i % 2 === 0){
        background = 'rgb(255,255,255)';
      }else{
        background = 'rgb(244,246,247)';
      }
      switch(crumbs[i]['type']){
        case 'crash':
          summary[0]['crashes']++;
          color = 'rgb(208,2,27)';
          text = crumbs[i]['payload']['name']+': '+ crumbs[i]['payload']['reason'];
          break;
        case 'handledException':
          summary[1]['handledException']++;
          color = 'rgb(252,200,148)';
          text = crumbs[i]['payload']['name']+': '+ crumbs[i]['payload']['reason'];
          break;
        case 'user':
          summary[2]['user']++;
          color = 'rgb(205,220,57)';
          text = crumbs[i]['payload']['text'];
          break;
        case 'network':
          summary[3]['network']++;
          color = 'rgb(10,61,72)';
          text = <View height={130} width={Dimensions.get('window').width-60}>
                  <Text style={styles.smallLink}>{crumbs[i]['payload']['url']}</Text>
                  <Text style={styles.dark13Text}>{crumbs[i]['deviceOccurredTs']}</Text>
                  <Text style={styles.dark13Text}>Method: {crumbs[i]['payload']['httpMethod']}</Text>
                  <View style={[{flexDirection: 'row'}, {flex: 1}]}>
                    <Text style={[styles.dark13Text, {flex: 0.5}]}>Latency: {crumbs[i]['payload']['latencyMs']}ms</Text>
                    <Text style={[styles.dark13Text, {flex: 0.5}]}>HTTP Status: {crumbs[i]['payload']['httpStatusCode']}</Text>
                  </View>
                  <View style={[{flexDirection: 'row'}, {flex: 1}]}>
                    <Text style={[styles.dark13Text, {flex: 0.5}]}>Bytes In: {crumbs[i]['payload']['bytesReceived']}</Text>
                    <Text style={[styles.dark13Text, {flex: 0.5}]}>Bytes Out: {crumbs[i]['payload']['bytesSent']}</Text>
                  </View>
                 </View>
          break;
        case 'networkChange':
          summary[4]['system']++;
          color = 'rgb(121,142,35)';
          text = 'Connection Up';
          break;
        case 'sessionStart':
          summary[4]['system']++;
          color = 'rgb(121,142,35)';
          text = 'sessionStart';
          break;
        case 'viewLoad':
          summary[4]['system']++;
          color = 'rgb(121,142,35)';
          text = crumbs[i]['payload']['viewName']+': '+ crumbs[i]['payload']['event'];
          break;
        case 'applicationEvent':
          summary[2]['user']++
          color = 'rgb(205,220,57)';
          text = 'applicationEvent';
          break;
        default:
          summary[5]['unknown']++ ;
          color = 'rgb(223,217,229)';
          text = 'Unknown event';
      }
      squareArray.push(
        <Svg key={i} height={35} width={35}>
          <Rect x={1} y={1} width={31} height={31} fill={color} onPress={() => {console.log(crumbs[i])}} />
        </Svg>
      )
      crashDetails.push(
        <Details key={i} color={color} number={i+1} text={text} background={background} />
      )
    }
    return (<Crumbs 
      squareArray={squareArray} 
      crashes={summary[0]['crashes']} 
      handledException={summary[1]['handledException']}
      user={summary[2]['user']}
      network={summary[3]['network']}
      system={summary[4]['system']}
      crashDetails={crashDetails} />)
  }

  _onPressBack(){
    this.props.navigator.pop();
  };
}

class Crumbs extends Component {
  render(){
    return(
      <View style={[{marginLeft: 6}, {marginBottom: 10}]}>
        <View style={[{flexDirection: 'row'}, {flexWrap: 'wrap'}]}>
          {this.props.squareArray}
        </View>
        <View style={[{flexDirection: 'row'}, {justifyContent: 'flex-start'}]}>
          <Summary color={'rgb(208,2,27)'} what={'Crashes'} number={this.props.crashes} />
          <Summary color={'rgb(205,220,57)'} what={'User Defined'} number={this.props.user} />
         </View> 
        <View style={[{flexDirection: 'row'}, {flexWrap: 'wrap'}]}>
          <Summary color={'rgb(10,61,72)'} what={'Network Events'} number={this.props.network} />
          <Summary color={'rgb(121,142,35)'} what={'System Events'} number={this.props.system} />
        </View>
          <Summary color={'rgb(252,200,148)'} what={'Handeled Exceptions'} number={this.props.handledException} />
        <View style={{marginTop: 10}}>
          {this.props.crashDetails}
        </View>
      </View>
    )
  };
}

class Summary extends Component {
  render(){
    return(
      <View style={{flexDirection: 'row'}}>
        <Svg height={17} width={17}>
          <Rect x={1} y={1} width={16} height={16} fill={this.props.color} />
        </Svg>
        <Text style={[styles.dark13Text, {flex: 1}]}>{this.props.what} ({this.props.number})</Text>
      </View>
    )
  }
}

class Details extends Component {
  render(){
    return(
      <View style={[{flexDirection: 'row'}, {borderLeftColor: this.props.color}, {borderLeftWidth: 4}, {marginRight: 6}, {backgroundColor: this.props.background}]}>
          <Text style={styles.dark15Text}>{this.props.number}</Text>
          <Text style={[styles.dark15Text, {flex: 1}, {flexWrap: 'wrap'}]}>{this.props.text}</Text>
      </View>
    )
  };

  _backGroundColor(){
    if(this.props.index % 2 === 0){
      return 'rgb(255,255,255';
    }else{
      return 'rgb(244,246,247)';
    }
  }
}

module.exports = BreadcrumbDetails;