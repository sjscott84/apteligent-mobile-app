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
    paddingTop: 50,
    paddingBottom: 60,
    fontSize: 24,
    lineHeight: 33,
    margin: 10,
    alignSelf: 'flex-start',
    color:'rgb(52, 73, 76)',
    fontFamily: 'AppleSDGothicNeo-Medium'
  },
  input: {
    height: 40,
    margin: 6,
    marginBottom: 20,
    paddingLeft: 5,
    borderColor: 'rgb(139, 157, 160)',
    borderWidth: 1,
    borderRadius: 2,
    alignSelf: 'stretch'
  },
  appInput: {
    margin: 5,
    paddingLeft: 5,
    alignSelf: 'center',
    height: 50,
    width: 200,
    paddingTop: 3
  },
  versionInput: {
    margin: 5,
    paddingLeft: 5,
    borderColor: 'rgb(122,143,147)',
    borderWidth: 1,
    borderRadius: 2,
    alignSelf: 'center',
    height: 33,
    alignSelf: 'stretch',
  },
  label: {
    fontSize: 15,
    lineHeight: 20,
    marginLeft: 10,
    color: 'rgb(52, 73, 76)',
    alignSelf: 'flex-start',
    fontFamily: 'AppleSDGothicNeo-SemiBold'
  },
  forgotPassword: {
    fontFamily: 'AppleSDGothicNeo-SemiBold',
    fontSize: 13,
    lineHeight: 18,
    marginRight: 10,
    alignSelf: 'flex-end',
    color: 'rgb(54, 143, 175)',
    marginBottom: 20
  },
  disclaimer: {
    marginLeft: 10,
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
    marginLeft: 10,
    fontSize: 24,
    lineHeight: 33,
    color: 'rgb(80,158,186)'
  },
  smallLink: {
    fontFamily: 'AppleSDGothicNeo-Medium',
    marginLeft: 10,
    fontSize: 15,
    lineHeight: 20,
    color: 'rgb(80,158,186)'
  },
  largeText: {
    fontFamily: 'AppleSDGothicNeo-Medium',
    marginLeft: 10,
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
    marginLeft: 10
  },
  bold15Text: {
    fontFamily: 'AppleSDGothicNeo-Bold',
    fontSize: 15,
    lineHeight: 24,
    color: 'rgb(52,73,76)',
    marginLeft: 10
  },
  bold13Text: {
    fontFamily: 'AppleSDGothicNeo-Bold',
    fontSize: 13,
    lineHeight: 18,
    color: 'rgb(52,73,76)',
    marginLeft: 10
  },
  bold14Text: {
    fontFamily: 'AppleSDGothicNeo-Bold',
    fontSize: 14,
    lineHeight: 24,
    color: 'rgb(122,143,147)',
    marginLeft: 10
  },
  dark13Text: {
    fontFamily: 'AppleSDGothicNeo-Medium',
    fontSize: 13,
    lineHeight: 18,
    marginLeft: 10,
    color: 'rgb(52,73,76)'
  },
  dark14Text: {
    fontFamily: 'AppleSDGothicNeo-Medium',
    fontSize: 14,
    lineHeight: 19,
    marginLeft: 10,
    color: 'rgb(52,73,76)'
  },
  dark15Text: {
    fontFamily: 'AppleSDGothicNeo-Medium',
    fontSize: 15,
    lineHeight: 20,
    marginLeft: 10,
    color: 'rgb(52,73,76)'
  },
  dark18Text: {
    fontFamily: 'AppleSDGothicNeo-Medium',
    fontSize: 18,
    lineHeight: 24,
    marginLeft: 10,
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
  light13Text: {
    fontFamily: 'AppleSDGothicNeo-Medium',
    fontSize: 13,
    lineHeight: 18,
    marginLeft: 10,
    color: 'rgb(122,143,147)'
  },
  light14Text: {
    fontFamily: 'AppleSDGothicNeo-Medium',
    fontSize: 14,
    lineHeight: 18,
    marginLeft: 10,
    color: 'rgb(122,143,147)'
  },
  light15Text: {
    fontFamily: 'AppleSDGothicNeo-Medium',
    fontSize: 15,
    lineHeight: 24,
    marginLeft: 10,
    color: 'rgb(122,143,147)'
  },
  light18Text: {
    fontFamily: 'AppleSDGothicNeo-Medium',
    fontSize: 18,
    lineHeight: 26,
    marginLeft: 10,
    color: 'rgb(122,143,147)'
  },
  crashNameText: {
    fontFamily: 'AppleSDGothicNeo-Bold',
    fontSize: 17,
    lineHeight: 30,
    color: 'rgb(54,143,175)',
    marginLeft: 16
  },
  topLinks:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgb(255,255,255)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(122,143,147)',
    margin: 0,
    height: 60,
    //paddingLeft: 15,
    paddingTop: 15
  },
  footer: {
    height: 50,
    borderTopWidth: 1,
    borderTopColor: 'rgb(122,143,147)',
    backgroundColor: 'rgb(255,255,255)',
    justifyContent: 'center',
    alignItems: 'center'
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
    justifyContent: 'space-between'
  },
  appDetailSummaryItem: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 5,
    paddingBottom: 8
  },
  border: {
    borderWidth: 1,
    borderColor: 'rgb(229,234,236)'
  },
  logo: {
    height: 44,
    width: 44,
    borderRadius: 3,
    marginLeft: 10,
    marginTop: 14
  },
  svg: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
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
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(12,143,147)',
    paddingTop: 17
  },
  crashInfoSymbels: {
    flex: 1,
    marginLeft: 10,
    flexDirection: 'row',
    justifyContent:'flex-start'
  },
  crashSortButtons: {
    margin: 6,
    borderColor:'rgb(122,143,147)',
    borderWidth: 1,
    padding: 3,
    borderRadius: 2
  },
  iconButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
    padding: 6,
    borderColor: 'rgb(122,143,147)',
    borderWidth: 1,
    borderRadius: 2
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    height: 36,
    padding: 5,
    margin: 6,
    marginBottom: 0,
    //marginTop: 20,
    //marginBottom: 20,
    alignSelf: 'stretch',
    backgroundColor: 'rgb(46,167,158)'
  },
  breadcrumbButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    height: 36,
    padding: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 0,
    borderWidth: 1,
    borderColor: 'rgb(229,234,236)',
    //marginTop: 5,
    marginBottom: 8,
    alignSelf: 'stretch',
    backgroundColor: 'rgb(255,255,255)'
  },
  buttonText: {
    fontSize: 14,
    lineHeight: 19,
    fontFamily: 'AppleSDGothicNeo-SemiBold',
    alignSelf: 'center',
    color: 'rgb(255,255,255)'
  },
  breadcrumbButtonText: {
    fontSize: 14,
    lineHeight: 19,
    fontFamily: 'AppleSDGothicNeo-SemiBold',
    alignSelf: 'center',
    color: 'rgb(46,167,158)'
  },
  marginLeft: {
    marginLeft: 6
  },
  marginRight: {
    marginRight: 6
  },
  crashInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 6
  }
})
