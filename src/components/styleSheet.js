import React, { Component } from 'react';
import {
  StyleSheet
} from 'react-native';

module.exports = StyleSheet.create({
  loginContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    paddingTop: 150,
    paddingBottom: 60,
    fontSize: 24,
    lineHeight: 33,
    alignSelf: 'flex-start',
    color:'rgb(52, 73, 76)',
    fontFamily: 'AppleSDGothicNeo-Medium'
  },
  input: {
    height: 40,
    marginTop: 3,
    marginBottom: 20,
    borderColor: 'rgb(139, 157, 160)',
    borderWidth: 1,
    borderRadius: 2,
    alignSelf: 'stretch'
  },
  label: {
    fontSize: 15,
    lineHeight: 20,
    color: 'rgb(52, 73, 76)',
    alignSelf: 'flex-start',
    fontFamily: 'AppleSDGothicNeo-SemiBold'
  },
  forgotPassword: {
    fontFamily: 'AppleSDGothicNeo-SemiBold',
    fontSize: 13,
    lineHeight: 18,
    alignSelf: 'flex-end',
    color: 'rgb(54, 143, 175)'
  },
  disclaimer: {
    marginTop: 30,
    lineHeight: 18,
    fontSize: 13,
    fontFamily: 'AppleSDGothicNeo-Medium',
    color: 'rgb(52,73,76)',
    alignSelf: 'flex-start'
  },
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
  bold15Text: {
    fontFamily: 'AppleSDGothicNeo-Bold',
    fontSize: 15,
    lineHeight: 24,
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
    marginTop: 5,
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
    justifyContent: 'space-between',
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
  },
  availableApps: {
    height: 60,
    backgroundColor: 'rgb(255,255,255)',
    margin: 0,
    borderWidth: 1,
    borderColor: 'rgb(12,143,147)',
    paddingTop: 17
  },
  crashInfoSymbels: {
    flex: 1,
    flexDirection: 'row',
    justifyContent:'flex-start'
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    height: 36,
    padding: 5,
    marginTop: 20,
    alignSelf: 'stretch',
    backgroundColor: 'rgb(46,167,158)'
  },
  buttonText: {
    fontSize: 14,
    lineHeight: 19,
    fontFamily: 'AppleSDGothicNeo-SemiBold',
    alignSelf: 'center',
    color: 'rgb(255,255,255)'
  }
})
