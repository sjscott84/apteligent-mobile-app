import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';

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
    const accessId = this.props.id;
    const myHeaders = new Headers({
      "Authorization": 'Bearer '+accessId
    });
    var request = new Request('https://developers.crittercism.com:443/v2/apps', {
      method: 'GET',
      //credentials: "same-origin",
      //mode: 'cors',
      headers: myHeaders
      //body: 'grant_type=password&username='+username+'&password='+password
    })
    fetch(request)
      .then((res) => {
        //console.log(res);
        return res.json();
      })
      .then((json) => {
        console.log(json);
      })
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