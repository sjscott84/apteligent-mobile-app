import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  Image
} from 'react-native';

import styles from './styleSheet';

var api = require('../library/api.js');

class AppDetails extends Component {
  render(){
    return(
      <View style={styles.container}>
        <View style={styles.app}>
          <View style={styles.head}>
            <Image style={styles.logo} source={require('../images/logoTest.png')}/>
            <View style={styles.nameAndType}>
              <Text style={[styles.font, styles.name]}>{this.props.name}</Text>
              <Text style={[styles.font, styles.headerInfo]}>{this.props.type}</Text>
            </View>
          </View>
          <Text style={[styles.font, styles.headerInfo]}>Versions: All</Text>
        </View>
        <View style={styles.app}>
        </View>
      </View>
    )
  };
};

module.exports = AppDetails;
