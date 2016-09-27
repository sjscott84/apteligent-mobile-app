import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';

var SignInButton = require('.//button');
//Course used Parse which is no longer working, but for user authentication firebase now works with react native

module.exports = React.createClass({
	getInitialState: function(){
		return {
			username: '',
			password: ''
		}
	},
	render: function(){
		return (
			<View style={styles.container}>
				<Text>Sign In</Text>
				<Text style={styles.label}>Username:</Text>
				<TextInput style={styles.input} onChangeText={(text) => this.setState({username: text})} value={this.state.username}/>{/*By default TextInput has no default styling*/}
				<Text style={styles.label}>Password:</Text>
				<TextInput secureTextEntry={true} style={styles.input} onChangeText={(text) => this.setState({password: text})} value={this.state.password}/>
				<SignInButton text={'Sign In'} onPress={this.onPress} />
				<SignInButton text={'Test Navigator'} onPress={this.onTestPress} />
			</View>
		)
	},
	onPress: function(){
		const username = this.state.username;
		const password =  this.state.password;
		//console.log(username, password);
		const clientId = window.btoa('HpS0dzMRx9oKPwBlE7TJXzvbfHuODsrO');
		const grant_type = 'password';
		const myHeaders = new Headers({
			"Content-Type": "application/x-www-form-urlencoded",
			"Authorization": 'Basic '+clientId
		});

		var request = new Request('https://developers.crittercism.com/v2/token', {
			method: 'POST',
			credentials: "same-origin",
			mode: 'cors',
			headers: myHeaders,
			body: 'grant_type=password&username=s.j.scott84%40gmail.com&password=A228kp3jT!'
		})

		fetch(request)
			.then((res) => {
				console.log(res.text());
			})
	},
	onTestPress: function(){
		//navigate to new route - pushing to a new ROUTE
		//push & pop used to navigate between similar routes
		//if you want to replace all views in a stack we use immediatelyResetRouteStack
		this.props.navigator.push({name: 'test'});
	}
});

var styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	input: {
		padding: 4,
		height: 40,
		borderColor: 'gray',
		borderWidth: 1,
		borderRadius: 5,
		margin: 5,
		width: 200,
		alignSelf: 'center'
	},
	label: {
		fontSize: 18
	}
})