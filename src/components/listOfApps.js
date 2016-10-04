import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
  Text,
  View
} from 'react-native';


var api = require('../library/api.js');

//let appView = [];

class AppList extends Component {
  constructor(){
    super();
    this.state ={
      apps: ''
    }
  };

  componentWillMount(){
    getAppsList((data) => {
      //Object.keys(data).forEach(function(id){
        //data[id]['id'] = id;
        //appView.push(<AppsInfo key={id} name={data[id]['appName']} type={data[id]['appType']} />);
      //})
      this.setState({apps: data});
    })
  };

  render (){
    return (
      <View style={styles.container}>
        {this._getAppsInfo()}
      </View>
    )
  };

  _getAppsInfo(){
    const data=this.state.apps;
    const appView = []
    const nav = this.props.navigator;
    console.log(nav);
    Object.keys(data).forEach(function(id){
      data[id]['id'] = id;
      appView.push(<AppsInfo navigator={nav} key={id} name={data[id]['appName']} type={data[id]['appType']} />);
    })
    return appView;
  }
};

class AppsInfo extends Component {

  _onPress(){
    console.log(this.props.navigator);
    this.props.navigator.push({name: 'appDetails'});
  };

  render (){
    return (
      <View style={styles.app}>
        <View style={styles.head}>
          <Image style={styles.logo} source={require('../images/logoTest.png')}/>
          <Text style={[styles.font, styles.name]} onPress={this._onPress.bind(this)}>{this.props.name}</Text>
        </View>
          <Text style={[styles.font, styles.headerInfo]}>All Versions</Text>
          <Text style={[styles.font, styles.headerInfo]}>{this.props.type}</Text>
          <View style={styles.crashInfo}>
            <AppInfo name="Crash Rate" data='0.23%'/>
            <AppInfo name="App Load" data='4.3k'/>
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
        <Text style={[styles.font, styles.crashHeaders]}>{this.props.name}</Text>
        <Text style={[styles.font, styles.last24Hours]}>Last 24h</Text>
        <Text style={styles.data}>{this.props.data}</Text>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'rgb(229,234,236)'
  },
  app: {
    backgroundColor: 'rgb(255,255,255)',
    justifyContent: 'flex-start',
    margin: 5,
    height: 185,
    marginTop: 44,
    borderColor: 'rgb(229,234,236)',
    borderWidth: 1
  },
  head: {
    flexDirection: 'row'
  },
  logo: {
    height: 44,
    width: 44,
    borderRadius: 3,
    margin: 5
  },
  font: {
    fontFamily: 'AppleSDGothicNeo-Medium',
    marginLeft: 6
  },
  name: {
    fontSize: 24,
    lineHeight: 33,
    color: 'rgb(80,158,186)',
    marginTop: 10
  },
  headerInfo: {
    fontSize: 14,
    lineHeight: 19,
    color: 'rgb(122,143,147)'
  },
  crashInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 6
  },
  crashHeaders: {
    marginTop: 11,
    fontSize: 13,
    lineHeight: 18,
    color: 'rgb(53,73,76)'
  },
  last24Hours: {
    fontSize: 11,
    lineHeight: 18,
    color: 'rgb(122,143,147)'
  },
  data: {
    fontFamily: 'AppleSDGothicNeo-Bold',
    fontSize: 19,
    lineHeight: 26,
    color: 'rgb(52,73,76)',
    marginLeft: 6
  }
})

module.exports = {AppList, AppsInfo, AppInfo};