'use strict'

import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';
import Svg,{
    Circle,
    Line
} from 'react-native-svg';

import styles from './styleSheet';
import moment from 'moment';
import numeral from 'numeral';
import getData from './getData';
import BarChart from './barChart';
import PieChart from './pieChart'
import StacktraceSummary from './stacktraceSummary';
import Breadcrumbs from './breadcrumbs';
import AppFooter from './appFooter';
import AppHeader from './appHeader';

class CrashDetail extends Component {
  constructor(){
    super();
      this.state = {
        version: [],
        width: Dimensions.get('window').width,
        selectX1: 20,
        selectX2: Dimensions.get('window').width / 3 - 10,
        selectedTraceX1: 0,
        selectedTraceX2: (Dimensions.get('window').width - 10) / 2,
        appVersionText: styles.bold15Text,
        osVersionText: styles.light15Text,
        deviceVersionText: styles.light15Text,
        stacktraceText: styles.dark15Text,
        breadcrumbsText: styles.light15Text,
        stacktrace: null,
        display: 'stacktrace',
        animating: true,
        isLoading: true
      }
  }

  //Retreives more info about a crash including the stacktrace from the api
  componentWillMount(){
    getCrashInfo(this.props.id, this.props.hash, (error, data) => {
      if(error){
        this.props.navigator.push({name: 'errorScreen'});
      }else{
        getCrashByAppVersion((data) => {
          this._summariseData(data);
        });
        getStacktrace(this.props.id, this.props.hash, (error, data) => {
          if(error){
            this.props.navigator.push({name: 'errorScreen'});
          }else{
            this.setState({
              stacktrace: data,
              isLoading: false
            })
          }
        })
      }
    })
  }

  render(){
    var occurrences = (this.props.dailyOccurances.length > 2) ? (<BarChart data={this.props.dailyOccurances} start={this.props.firstOccured} end={this.props.lastOccured} />) :
    (<View style={[{flexDirection: 'row'}, {alignItems: 'center'}, {marginTop: 8}, {marginBottom: 8}]}>
      <Summary timeFrame={moment.utc(this.props.firstOccured).format('DD MMM YYYY')} figure={numeral(this.props.dailyOccurances[0]).format('0.0a')} />
      <Summary timeFrame={moment.utc(this.props.lastOccured).format('DD MMM YYYY')} figure={numeral(this.props.dailyOccurances[1]).format('0.0a')} />
    </View>)
    var spinner = this.state.isLoading ? (<ActivityIndicator animating={this.state.animating} style={[{height: 80}]} size='large'/>) :
    (<View>
      <View style={[styles.app, {marginTop: 0}, {borderTopWidth: 1}, {borderTopColor: 'rgb(122,143,147)'}]}>
        <Svg height={8} width={Dimensions.get('window').width}>
          <Line x1={this.state.selectX1} y1={3} x2={this.state.selectX2} y2={3} stroke={'rgb(54,143,175)'} strokeWidth={3} />
        </Svg>
        <View style={[{flexDirection: 'row'}, {justifyContent: 'space-around'}]}>
          <Text style={[this.state.appVersionText, {marginLeft: 0}]} onPress={this._onPressApp.bind(this)}>App Versions</Text>
          <Text style={[this.state.osVersionText, {marginLeft: 0}]} onPress={this._onPressOS.bind(this)}>OS Versions</Text>
          <Text style={[this.state.deviceVersionText, {marginLeft: 0}]} onPress={this._onPressDevice.bind(this)}>Devices</Text>
        </View>
        <View style={[{flexDirection: 'row'}, {marginTop: 40}, {justifyContent: 'space-around'}]}>
          <TouchableHighlight onPress={this._openInteractiveChart.bind(this)}>
            <View>
            <PieChart data={this.state.version} height={'150'} width={'150'} cx={75} cy={75} r={45} interactive={false} />
            </View>
          </TouchableHighlight>
          <View>
            <TopCrashInfo color={'rgb(18,111,126)'} data={this.state.version} index={0} />
            {this._getTopCrashes()}
          </View>
        </View>
        <CrashList data={this.state.version} />
      </View>
      <View style={styles.app}>
        <View style={[{flexDirection: 'row'}, {justifyContent: 'space-around'}, {borderBottomWidth: 1}, {borderBottomColor: 'rgb(122,143,147)'}, {paddingTop: 5}]}>
          <TouchableHighlight underlayColor={'gray'} onPress={this._onPressStacktrace.bind(this)}>
            <Text style={this.state.stacktraceText}>STACKTRACE</Text>
          </TouchableHighlight>
          <TouchableHighlight underlayColor={'gray'} onPress={this._onPressBreadcrumbs.bind(this)}>
            <Text style={this.state.breadcrumbsText}>BREADCRUMBS</Text>
          </TouchableHighlight>
        </View>
        <Svg height={8} width={Dimensions.get('window').width}>
          <Line x1={this.state.selectedTraceX1} y1={1} x2={this.state.selectedTraceX2} y2={1} stroke={'rgb(54,143,175)'} strokeWidth={4} />
        </Svg>
        {this._displayComponent()}
      </View>
    </View>)
    return(
      <View style={styles.container}>
        <AppHeader navigator={this.props.navigator} name={this.props.name} />
        <ScrollView>
          <View style={styles.app}>
            <Text style={[styles.dark15Text, {marginTop: 5}]}>CRASH DETAILS</Text>
            <Text style={styles.bold15Text}>{this.props.crashName}</Text>
            <Text style={styles.dark15Text}>{this.props.reason}</Text>
            <View style={[{flexDirection: 'row'}, {marginTop: 5}, {borderTopWidth: 1}, {borderTopColor: 'rgb(229,234,236)'}]}>
              <Text style={[{flex: 0.4}, styles.dark15Text, {marginTop: 5}]}>Status</Text>
              <Text style={[{flex: 0.6}, styles.bold15Text]}>{this.props.status}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={[{flex: 0.4}, styles.dark15Text]}>Occurred</Text>
              <Text style={[{flex: 0.6}, styles.bold15Text]}>{this.props.occurances} times</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={[{flex: 0.4}, styles.dark15Text]}>Affected</Text>
              <Text style={[{flex: 0.6}, styles.bold15Text]}>{this.props.users} users</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={[{flex: 0.4}, styles.dark15Text]}>Last Occured</Text>
              <Text style={[{flex: 0.6}, styles.bold15Text]}>{moment.utc(this.props.lastOccured).format('DD MMM YYYY h:mm:ss a')}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={[{flex: 0.4}, styles.dark15Text]}>First Occured</Text>
              <Text style={[{flex: 0.6}, styles.bold15Text]}>{moment.utc(this.props.firstOccured).format('DD MMM YYYY h:mm:ss a')}</Text>
            </View>
            <View style={[{borderTopWidth: 1}, {borderTopColor: 'rgb(229,234,236)'}]}>
              <Text style={[styles.dark15Text, {marginTop: 10}]}>OCCURRENCES</Text>
              {occurrences}
            </View>
          </View>
          {spinner}
        </ScrollView>
        <AppFooter navigator={this.props.navigator} id={this.props.id} name={this.props.name} type={this.props.type} />
      </View>
    )
  };

  //Opens an interactive pie chart in a new page (so as to make it bigger) to get more information
  _openInteractiveChart(){
    this.props.navigator.push({
      name: 'interactivePieChart',
      passProps: {
        name: this.props.name,
        data: this.state.version,
        id: this.props.id
      }
    });
  }

  //Chooses which component to display on click of 'stacktrace' or 'breadcrumbs'
  _displayComponent(){
    if(this.state.display === 'stacktrace'){
      return <StacktraceSummary data={this.state.stacktrace} name={this.props.name} navigator={this.props.navigator} crashName={this.props.crashName} reason={this.props.reason} />
    }else{
      return <Breadcrumbs id={this.props.id} hash={this.props.hash} name={this.props.name} navigator={this.props.navigator} />
    }
  }

  //Display top two (or if only one, one) top crashes next to the bar chart
  _getTopCrashes(){
    if(this.state.version.length > 1){
      return (<TopCrashInfo color={'rgb(10,61,72)'} data={this.state.version} index={1} />);
    }
  };

  //Reduce data to show top 9 and combine all others into an 'All Others category'
  _summariseData(data){
    const dataTotal = Math.ceil(data.reduce((n, d) => d.value + n, 0));
    if(data.length > 10){
      let arrayLength = data.length;
      let summary = data.splice(9, arrayLength);
      let summaryTotal = Math.ceil(summary.reduce((n, d) => d.value + n, 0));
      data.push({label: 'All Others', value: summaryTotal});
      this.setState({version: data});
    }else{
      this.setState({version: data});
    }
  };

  //Display the crashes sorted by app version and update the styles to reflect which crash sort is being used
  _onPressApp(){
    this.setState({selectX1: 20, selectX2: this.state.width / 3 - 10, appVersionText: styles.bold15Text, osVersionText: styles.light15Text, deviceVersionText: styles.light15Text});
    getCrashByAppVersion((data) => {
      this._summariseData(data);
    })
  };

  //Display the crashes sorted by operating system version and update the styles to reflect which crash sort is being used
  _onPressOS(){
    this.setState({selectX1: this.state.width / 3 + 20, selectX2: (this.state.width / 3 + 20) + (this.state.width / 3 - 10), appVersionText: styles.light15Text, osVersionText: styles.bold15Text, deviceVersionText: styles.light15Text })
    getCrashByOsVersion((data) => {
      this._summariseData(data);
    })
  };

  //Display the crashes sorted by device and update the styles to reflect which crash sort is being used
  _onPressDevice(){
    this.setState({selectX1: (this.state.width / 3) * 2 + 20, selectX2: ((this.state.width / 3) * 2 + 20) + (this.state.width / 3 - 40), appVersionText: styles.light15Text, osVersionText: styles.light15Text, deviceVersionText: styles.bold15Text })
    getCrashByDevice((data) => {
      this._summariseData(data);
    })
  };

  //Change formatting when stacktrace is clicked (_displayComponent() actually opens the new component)
  _onPressStacktrace(){
    this.setState({
      display: 'stacktrace',
      stacktraceText: styles.dark15Text,
      breadcrumbsText: styles.light15Text,
      selectedTraceX1: 0,
      selectedTraceX2: (this.state.width - 10) / 2
    });
  };

  //Change formatting when breadcrumbs is clicked (_displayComponent() actually opens the new component)
  _onPressBreadcrumbs(){
    this.setState({
      display: 'breadcrumbs',
      stacktraceText: styles.light15Text,
      breadcrumbsText: styles.dark15Text,
      selectedTraceX1: (this.state.width - 10) / 2,
      selectedTraceX2: this.state.width - 12
    });
  }
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
      <View style={{marginTop: 31}}>
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

class TopCrashInfo extends Component {
  render(){
    return(
      <View>
        <View style={{flexDirection: 'row'}}>
          <Svg height={20} width={13}>
            <Circle cx={6.5} cy={11} r={6.5} fill={this.props.color} />
          </Svg>
          {this._getText()}
        </View>
      </View>
    )
  };

  //Get the top crash text to display next to the pie chart
  _getText(){
    let data = this.props.data;
    let index = this.props.index;
    let total = Math.ceil(this.props.data.reduce((n, d) => d.value + n, 0));
    if(data[index] !== undefined){
      let percent = numeral(data[index]['value'] / total ).format('0.00%');
      return (
        <View>
          <Text style={styles.bold15Text}>{percent}</Text>
          <Text style={[styles.bold15Text, {flex: 1}, {flexWrap: 'wrap'}]}>{data[index]['label']}</Text>
          <Text style={styles.light14Text}>{data[index]['value']+' crashes'}</Text>
        </View>
      )
    }
    return <Text>{'Value'}</Text>
  }
}

class Summary extends Component {
  render(){
    return(
      <View style={[styles.appDetailSummaryItem, {alignItems: 'center'}]}>
        <Text style={styles.boldText}>{this.props.figure}</Text>
        <Text style={styles.light13Text}>{this.props.timeFrame}</Text>
      </View>
    )
  }
};

module.exports = CrashDetail;