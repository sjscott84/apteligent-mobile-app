'use strict'

import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  ActivityIndicator,
  AsyncStorage
} from 'react-native';

import styles from './styleSheet';
import getData from './getData';

//Displays loading symbol while checking if a working authentication token already exists in local storage, if not will load the sign in screen 
class Load extends Component {
  constructor(){
    super();
    this.state = {
      animating: true
    }
  }

  componentWillMount(){
    AsyncStorage.getItem('AccessToken')
      .then((value) =>{
        if(value){
          provideAccessToken(value, () => {
            getAppsList((data) => {
              if(data === "Error"){
                this.props.navigator.push({
                  name: 'errorScreen'
                })
              } else {  
                if(data){
                  this.props.navigator.push({
                    name: 'appList'
                  })
                }else{
                  this.props.navigator.push({
                    name: 'signin'
                  })
                }
              }
            })
          })
        }else{
          this.props.navigator.push({
            name: 'signin'
          })
        }
      })
  };

  render (){
    return (
      <View style={[styles.container, {marginTop: 20}]}>
        <ActivityIndicator animating={this.state.animating} style={[{height: 80}]} size='large'/>
      </View>
    )
  };
};


module.exports = Load;