import React, { Component } from 'react';
import {
  StyleSheet
} from 'react-native';

module.exports = StyleSheet.create({

    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'rgb(229,234,236)'
    },
    app: {
      backgroundColor: 'rgb(255,255,255)',
      justifyContent: 'flex-start',
      margin: 5,
      //height: 90,
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
    nameAndType: {
      flexDirection: 'column'
    },
    font: {
      fontFamily: 'AppleSDGothicNeo-Medium',
      marginLeft: 6
    },
    name: {
      fontSize: 24,
      lineHeight: 33,
      color: 'rgb(52,73,76)',
      marginTop: 10
    },
    headerInfo: {
      fontSize: 14,
      lineHeight: 19,
      color: 'rgb(122,143,147)',
      flexDirection: 'column',
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

//module.exports = StyleSheet;