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
    //getAppsList((data) => {
      //this.setState({apps: data});
    //})
    //getCrashSummaries();
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

  /*_getAppsInfo(){
    const data=this.state.apps;
    const appView = []
    const nav = this.props.navigator;
    Object.keys(data).forEach(function(id){
      data[id]['id'] = id;
      appView.push(<AppsInfo navigator={nav} key={id} id={id} name={data[id]['appName']} type={data[id]['appType']} />);
    })
    return appView;
  }
};*/

  _onPressJumpTo(){
    console.log("Jump To");
  }

  _onPressSettings(){
    console.log("Settings");
  }

  _getAppsInfo(){
    const appView = []
    const app = this.state.apps;
    const nav = this.props.navigator;
    for(var i = 0; i < app.length; i ++){
      appView.push(<AppsInfo navigator={nav} key={app[i]['id']} id={app[i]['id']} name={app[i]['name']} type={app[i]['type']} crashPercent={app[i]['crashPercent'].toFixed(2)} appLoads={numeral(app[i]['appLoads']).format('0.0a')} />);
    }
    return appView;
  }
};

class AppsInfo extends Component {

  _onPress(){
    this.props.navigator.push({
      name: 'appDetails',
      passProps: {
        id: this.props.id,
        name: this.props.name,
        type: this.props.type,
        crashPercent: this.props.crashPercent,
        appLoads: this.props.appLoads
      }});
  };

  render (){
    return (
      <View style={[styles.app, {height: 185}]}>
        <View style={styles.head}>
          <Image style={styles.logo} source={require('../images/logoTest.png')}/>
          <Text style={styles.largeLink} onPress={this._onPress.bind(this)}>{this.props.name}</Text>
        </View>
          <Text style={[styles.light14Text, {flexDirection: 'column'}]}>All Versions</Text>
          <Text style={[styles.light14Text, {flexDirection: 'column'}]}>{this.props.type}</Text>
          <View style={styles.crashInfo}>
            <AppInfo name="Crash Rate" data={this.props.crashPercent+'%'}/>
            <AppInfo name="App Load" data={this.props.appLoads}/>
            <AppInfo name="HTTP error rate" data='3.2%'/>
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

module.exports = {AppList, AppsInfo, AppInfo};