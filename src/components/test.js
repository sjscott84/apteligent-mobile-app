import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';

var api = require('./api');

class AppList extends Component {

  componentWillMount(){
    this._fetchAppList();
  }

  render (){
    return (
      <View style={styles.container}>
        <Text>This is a test of Navigator</Text>
      </View>
    )
  }

  _fetchAppList(){
    getAppsList();
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

module.exports = AppList;