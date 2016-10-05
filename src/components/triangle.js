
import React, { Component } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import Svg,{
    Polygon
} from 'react-native-svg';

import styles from './styleSheet';

class Triangle extends Component {
  render() {
    if(this.props.change > 0){
      return (
        <View style={styles.svgTriangle}>
          <Svg height='6.4' width='14'>
            <Polygon points='7,0 14,6.4 0,6.4' fill='grey' />
          </Svg>
        </View>
      );
    }else{
      return (
        <View style={styles.svgTriangle}>
          <Svg height='6.4' width='14'>
            <Polygon points='0,0 14,0 6.4,7' fill='grey' />
          </Svg>
        </View>
      );
    }
  }
}
module.exports = Triangle;

