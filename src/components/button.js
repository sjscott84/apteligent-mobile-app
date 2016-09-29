import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

module.exports = React.createClass({
	render: function(){
		return (
			<TouchableHighlight style={styles.button} underlayColor={'gray'} onPress={this.props.onPress}>
				<Text style={styles.buttonText}>{this.props.text}</Text>
			</TouchableHighlight>
		)
	}
})

var styles = StyleSheet.create({
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