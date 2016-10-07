import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
  Text,
  View
} from 'react-native';

import styles from './styleSheet';
import numeral from 'numeral'
var api = require('../library/api.js');
import getData from './getData';
import Icon from 'react-native-vector-icons/FontAwesome';
import AvailableApps from './availableApps';
import {AppsInfo, AppInfo} from './appData';

class AppList extends Component {
  constructor(){
    super();
    this.state ={
      apps: []
    }
  };

  componentWillMount(){
      combineData((data) => {
        console.log(data);
        this.setState({apps: data});
      });
  };

  render (){
    return (
      <View style={styles.container}>
        <View style={styles.topLinks}>
          <Text style={styles.dark18Text} onPress={this._onPressJumpTo.bind(this)}>Jump to...</Text>
          <Icon.Button name="cog" size={20} color='rgb(98,129,133)' backgroundColor='white' onPress={this._onPressSettings.bind(this)} />
        </View>
        {this._getAppsInfo()}
      </View>
    )
  };

  _onPressJumpTo(){
    this.props.navigator.push({
      name: 'availableApps',
      passProps: {
        data: this.state.apps,
        navigator: this.props.navigator
      }});
  }

  _onPressSettings(){
    console.log("Settings");
  }

  _getAppsInfo(){
    const appView = [];
    const app = this.state.apps;
    const nav = this.props.navigator;
    for(var i = 0; i < app.length; i ++){
      appView.push(<AppsInfo navigator={nav} key={app[i]['id']} id={app[i]['id']} name={app[i]['name']} type={app[i]['type']} crashPercent={app[i]['crashPercent'].toFixed(2)} appLoads={numeral(app[i]['appLoads']).format('0.0a')} />);
    }
    return appView;
  }
};

module.exports = AppList;