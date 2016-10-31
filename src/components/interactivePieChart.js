'use strict'

import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  ScrollView,
  Dimensions,
} from 'react-native';
import Svg,{
    Circle
} from 'react-native-svg';

import styles from './styleSheet';
import Icon from 'react-native-vector-icons/FontAwesome';
import PieChart from './pieChart'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class InteractivePieChart extends Component {
  constructor(){
    super();
    this.state = {
      label: '',
      value: '',
      percent: '',
      color: 'rgb(255,255,255)'
    }
  };

  render(){
    return(
      <View style={styles.container}>
        <View style={styles.topLinks}>
          <Icon.Button name="chevron-left" size={20} color='rgb(23,153,173)' backgroundColor='white' onPress={this._onPressBack.bind(this)} />
          <Text style={styles.dark18Text}>{this.props.name}</Text>
          <Icon.Button name="cog" size={20} color='rgb(98,129,133)' backgroundColor='white' onPress={this._onPressBack.bind(this)} />
        </View>
        <View style={styles.app}>
          <ScrollView>
            <View style={[{marginTop: 6}, {alignItems: 'center'}]}>
              <PieChart data={this.props.data} height={width-24} width={width-24} cx={(width-24)/2} cy={(width-24)/2} r={110} interactive={true} onPress={this._onPress} />
            </View>
            <View style={[{flexDirection: 'row'}, {alignItems: 'center'}, {marginLeft: 6}, {marginTop: 53}]}>
              <Svg height={'14'} width={'14'}>
                <Circle cx={'7'} cy={'7'} r={'7'} fill={this.state.color} />
              </Svg>
              <Text style={styles.bold15Text}>{numeral(this.state.percent).format('0.00%')}</Text>
              <Text style={styles.bold15Text}>{this.state.label}</Text>
            </View>
            <View style={[{flexDirection: 'row'}, {marginLeft: 22}]}>
              <Text style={styles.light15Text}>{this.state.value} crashes</Text>
            </View>
              <CrashList data={this.props.data} />
          </ScrollView>
        </View>
      </View>
    )
  };

  _onPress = (label, value, color) => {
    const dataTotal = Math.ceil(this.props.data.reduce((n, d) => d.value + n, 0));
    this.setState({
      label: label,
      value: value,
      color: color,
      percent: value / dataTotal
    })
  }

  _getCircleDimensions(){
    let dimension;
    if(height > width){
      dimension = width - 24;
      return dimension.toString();
    }else{
      dimension = height - 24;
      return dimension.toString();
    }
  }

  _getCXDimensions(){
    if(height > width){
      return (width - 24) / 2;
    }else{
      return (height - 24) / 2;
    }
  }

  //Go back to previous screen
  _onPressBack(){
    this.props.navigator.pop();
  };
};

class CrashList extends Component {
  //Display as a list the same data as shown in the pie chart
  _getDetails(){
    let allDetails = [];
    let total = Math.ceil(this.props.data.reduce((n, d) => d.value + n, 0));
    for(var i = 0; i < this.props.data.length; i++){
      let data = this.props.data[i];
      let percent = data['value'] / total;
      allDetails.push(<CrashItem key={[i]} name={data['label']} value={data['value']} percent={percent} />);
    }
    return allDetails
  }

  render(){
    return(
      <View style={{marginTop: 15}}>
      <View style={[{flex: 1}, {flexDirection: 'row'},{marginTop: 4}, {justifyContent: 'flex-start'}, {borderBottomColor: 'rgb(122,143,147)'}, {borderBottomWidth: 1}]}>
        <Text style={[{flex: 0.5}, styles.bold14Text]}>Version</Text>
        <Text style={[{flex: 0.2}, styles.bold14Text]}>Crashes</Text>
        <Text style={[{flex: 0.3}, styles.bold14Text]}>Percentage</Text>
      </View>
        {this._getDetails()}
      </View>
    )
  }
}

class CrashItem extends Component {
  render(){
    return(
      <View style={[{flex: 1}, {flexDirection: 'row'}, {justifyContent: 'flex-start'}, {flexWrap:'wrap'}, {borderBottomColor: 'rgb(229,234,236)'}, {borderBottomWidth: 1}]}>
        <Text style={[{flex: 0.5}, styles.light14Text]}>{this.props.name}</Text>
        <Text style={[{flex: 0.2}, styles.light14Text]}>{this.props.value}</Text>
        <Text style={[{flex: 0.3}, styles.light14Text]}>{numeral(this.props.percent).format('0.00%')}</Text>
      </View>
    )
  }
}

module.exports = InteractivePieChart;