'use strict'

import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  ScrollView,
  Dimensions,
} from 'react-native';

import styles from './styleSheet';
import Icon from 'react-native-vector-icons/FontAwesome';
import PieChart from './pieChart'


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class InteractivePieChart extends Component {
  render(){
    return(
      <View style={styles.container}>
        <View style={styles.topLinks}>
          <Icon.Button name="chevron-left" size={20} color='rgb(23,153,173)' backgroundColor='white' onPress={this._onPressBack.bind(this)} />
          <Text style={styles.dark18Text}>{this.props.name}</Text>
          <Icon.Button name="cog" size={20} color='rgb(98,129,133)' backgroundColor='white' onPress={this._onPressBack.bind(this)} />
        </View>
        <View style={styles.app}>
          <PieChart data={this.props.data} height={width-24} width={width-24} cx={(width-24)/2} cy={(width-24)/2} interactive={true} />
        </View>
      </View>
    )
  };

  _getCircleDimensions(){
    let dimension;
    if(height > width){
      dimension = width - 24;
      return dimension.toString();
    }else{
      dimension = height - 24;
      return dimension.toString();
    }
  }

  _getCXDimensions(){
    if(height > width){
      return (width - 24) / 2;
    }else{
      return (height - 24) / 2;
    }
  }

  //Go back to previous screen
  _onPressBack(){
    this.props.navigator.pop();
  };
};

module.exports = InteractivePieChart;