import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

var api = require('../library/api.js');

class AppDetails extends Component {
  render(){
    return(
      <View>
        <Text>This is the appView</Text>
      </View>
    )
  };
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'rgb(229,234,236)'
  }
})

module.exports = AppDetails;
