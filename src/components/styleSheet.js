import React, { Component } from 'react';
import {
  StyleSheet
} from 'react-native';

module.exports = StyleSheet.create({

    container: {
      flex: 1,
      //flexDirection: 'column',
      backgroundColor: 'rgb(229,234,236)'
    },
    largeLink: {
      fontFamily: 'AppleSDGothicNeo-Medium',
      marginLeft: 6,
      fontSize: 24,
      lineHeight: 33,
      color: 'rgb(80,158,186)',
      marginTop: 10
    },
    smallLink: {
      fontFamily: 'AppleSDGothicNeo-Medium',
      marginLeft: 6,
      fontSize: 15,
      lineHeight: 24,
      color: 'rgb(80,158,186)',
      marginTop: 5
    },
    largeText: {
      fontFamily: 'AppleSDGothicNeo-Medium',
      marginLeft: 6,
      fontSize: 24,
      lineHeight: 33,
      color: 'rgb(52,73,76)',
      marginTop: 10
    },
    boldText: {
      fontFamily: 'AppleSDGothicNeo-Bold',
      fontSize: 19,
      lineHeight: 26,
      color: 'rgb(52,73,76)',
      marginLeft: 6
    },
    dark13Text: {
      fontFamily: 'AppleSDGothicNeo-Medium',
      fontSize: 13,
      lineHeight: 18,
      marginLeft: 6,
      color: 'rgb(52,73,76)'
    },
    dark14Text: {
      fontFamily: 'AppleSDGothicNeo-Medium',
      fontSize: 14,
      lineHeight: 19,
      marginLeft: 6,
      color: 'rgb(52,73,76)'
    },
    dark15Text: {
      fontFamily: 'AppleSDGothicNeo-Medium',
      fontSize: 15,
      lineHeight: 24,
      marginLeft: 6,
      color: 'rgb(52,73,76)'
    },
    dark18Text: {
      fontFamily: 'AppleSDGothicNeo-Medium',
      fontSize: 18,
      lineHeight: 24,
      marginLeft: 6,
      color: 'rgb(52,73,76)'
    },
    light11Text: {
      fontFamily: 'AppleSDGothicNeo-Medium',
      fontSize: 11,
      lineHeight: 18,
      marginLeft: 6,
      color: 'rgb(122,143,147)'
    },
    light14Text: {
      fontFamily: 'AppleSDGothicNeo-Medium',
      fontSize: 14,
      lineHeight: 18,
      marginLeft: 6,
      color: 'rgb(122,143,147)'
    },
    light18Text: {
      fontFamily: 'AppleSDGothicNeo-Medium',
      fontSize: 18,
      lineHeight: 26,
      marginLeft: 6,
      color: 'rgb(122,143,147)'
    },
    topLinks:{
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: 'rgb(255,255,255)',
      margin: 0,
      height: 60,
      padding: 15
    },
    app: {
      backgroundColor: 'rgb(255,255,255)',
      justifyContent: 'flex-start',
      margin: 5,
      marginBottom: 0,
      borderColor: 'rgb(229,234,236)',
      borderWidth: 1
    },
    appDetailSummary: {
      flex: 2,
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: 5,
      marginBottom: 0,
      height: 74
    },
    appDetailSummaryItem: {
      flexGrow: 2,
      justifyContent: 'flex-start'
    },
    border: {
      borderWidth: 1,
      borderColor: 'rgb(229,234,236)'
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
    crashInfo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginRight: 6,
      marginTop: 10
    },
    svg: {
      marginTop: 20,
      marginLeft: 6,
      marginRight: 6,
      flex: 1,
      height: 138
    },
    svgTriangle: {
      marginTop: 9.5,
      marginLeft: 20
    },
    backArrow: {
      height: 20,
      width: 20
    }
})

//module.exports = StyleSheet;