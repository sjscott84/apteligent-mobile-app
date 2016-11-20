'use strict'

import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  ScrollView,
  Dimensions,
} from 'react-native';
import Svg,{
    Rect
} from 'react-native-svg';

import styles from './styleSheet';
import Icon from 'react-native-vector-icons/FontAwesome';
import getData from './getData';
import AppFooter from './appFooter';
import AppHeader from './appHeader';

class BreadcrumbDetails extends Component {
  constructor(props){
    super(props);
    this.state = {
      breadcrumb: props,
      color: 'rgb(255,255,255)',
      number: '',
      text: '',
      placement: [],
      currentView: 0,
      crumbsHeight: 65
    }
  }

  render(){
    return(
      <View style={styles.container}>
        <AppHeader navigator={this.props.navigator} name={this.props.name}/>
        <ScrollView contentOffset={{ x: 0, y: this.state.currentView }}>
          <View style={styles.app} onLayout={this._getCrumbsHeight.bind(this)} >
            <Text style={[styles.dark15Text, {marginTop: 5}]}>BREADCRUMBS</Text>
            <View style={[{flexDirection: 'row'}, {borderColor: 'rgb(253,231,206)'}, {borderWidth: 1}, {margin: 10}]}>
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
            <Text style={[styles.dark15Text, {marginTop: 5}, {marginBottom: 5}]}>CRASH STACK</Text>
            <View style={[{marginLeft: 4}, {marginRight: 4}]}>
              {this._getSquares()}
            </View>
          </View>
        </ScrollView>
        <AppFooter navigator={this.props.navigator} id={this.props.id} name={this.props.name} type={this.props.type} />
      </View>
    )
  }

  //Create the breadcrumb squares
  _getSquares(){
    let squareArray = [];
    let crashDetails = [];
    let summary = [{crashes: 0}, {handledException: 0}, {user: 0}, {network: 0}, {system: 0}, {unknown: 0}]
    let crumbs = this.props.breadcrumbs
    let color;
    let text;
    let background;
    for(var i = 0; i < crumbs.length; i++){
      let placement = i;
      if(i % 2 === 0){
        background = 'rgb(255,255,255)';
      }else{
        background = 'rgb(244,246,247)';
      }
      switch(crumbs[i]['type']){
        case 'crash':
          summary[0]['crashes']++;
          color = 'rgb(208,2,27)';
          text = <Text style={[styles.dark15Text, {flex: 1}, {flexWrap: 'wrap'}]}>{crumbs[i]['payload']['name']+': '+ crumbs[i]['payload']['reason']}</Text>
          break;
        case 'handledException':
          summary[1]['handledException']++;
          color = 'rgb(252,200,148)';
          text = <Text style={[styles.dark15Text, {flex: 1}, {flexWrap: 'wrap'}]}>{crumbs[i]['payload']['name']+': '+ crumbs[i]['payload']['reason']}</Text>
          break;
        case 'user':
          summary[2]['user']++;
          color = 'rgb(205,220,57)';
          text = <Text style={[styles.dark15Text, {flex: 1}, {flexWrap: 'wrap'}]}>{crumbs[i]['payload']['text']}</Text>
          break;
        case 'network':
          summary[3]['network']++;
          color = 'rgb(10,61,72)';
          text = <View>
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
          text = <Text style={[styles.dark15Text, {flex: 1}, {flexWrap: 'wrap'}]}>Connection Up</Text>
          break;
        case 'sessionStart':
          summary[4]['system']++;
          color = 'rgb(121,142,35)';
          text = <Text style={[styles.dark15Text, {flex: 1}, {flexWrap: 'wrap'}]}>sessionStart</Text>
          break;
        case 'viewLoad':
          summary[4]['system']++;
          color = 'rgb(121,142,35)';
          text = <Text style={[styles.dark15Text, {flex: 1}, {flexWrap: 'wrap'}]}>{crumbs[i]['payload']['viewName']+': '+ crumbs[i]['payload']['event']}</Text>
          break;
        case 'applicationEvent':
          summary[2]['user']++
          color = 'rgb(205,220,57)';
          text = <Text style={[styles.dark15Text, {flex: 1}, {flexWrap: 'wrap'}]}>applicationEvent</Text>
          break;
        default:
          summary[5]['unknown']++ ;
          color = 'rgb(223,217,229)';
          text = <Text style={[styles.dark15Text, {flex: 1}, {flexWrap: 'wrap'}]}>Unknown event</Text>
      }
      squareArray.push(
        <Svg key={i} height={35} width={35}>
          <Rect x={1} y={1} width={31} height={31} fill={color} onPress={() => {this.setState({currentView: this.state.crumbsHeight + this.state.placement[placement]})}} />
        </Svg>
      )
      crashDetails.push(
        <Details onLayout={this._getHeight.bind(this)} key={i} color={color} number={i+1} text={text} background={background} />
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

  //Measure the height of the summary component, this enables the contentOffset on click
  _getCrumbsHeight(event){
    let currentHeight = this.state.crumbsHeight;
    let height = event.nativeEvent.layout.height;
    let newHeight = currentHeight + height;
    this.setState({crumbsHeight: newHeight});
  }

  //Measure the y position of each breadcrumb Detail component, this enables the contentOffset on click
  _getHeight(event){
    let array = this.state.placement;
    let y = event.nativeEvent.layout.y;
    array.push(y);
    array.sort((a,b) => {return a - b});
    if(array.length === this.props.breadcrumbs.length){
      this.setState({placement: array});
    }
  }
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
      <View onLayout={this.props.onLayout} style={[{flexDirection: 'row'}, {borderLeftColor: this.props.color}, {borderLeftWidth: 4}, {marginRight: 6}, {backgroundColor: this.props.background}]}>
        <Text style={styles.dark15Text}>{this.props.number}</Text>
        {this.props.text}
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