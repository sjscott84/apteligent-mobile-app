
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import Svg,{
    G,
    Line,
    Rect,
    Text,
    Path
} from 'react-native-svg';

import styles from './styleSheet';
import moment from 'moment';
import numeral from 'numeral';

class BarChart extends Component {
  render() {
    return (
      <View>
        <Svg style={styles.svg}>
          {this._svgGraph()}
        </Svg>
      </View>
    );
  }

  _svgGraph(){
    const dataset = this.props.data;
    const start = moment.utc(this.props.start).format('h:mm A MM/DD/YYYY');
    const end = moment.utc(this.props.end).format('h:mm A MM/DD/YYYY');
    const numberType=this.props.numberType;
    let rectangles = []; //Array of bars
    let textArray = []; //tick points on axis
    let tickLines = []; //tick lines;

    //Measurments for placement of axis
    const lowNumberForXAxis = 40;
    const lowNumberForYAxis = 0;
    const highNumberForYAxis = 115;
    const highNumberForXAxis = Dimensions.get('window').width-20;//Screen width minus the margins
    const barPadding = 3;

    //Get max number from data set
    let max = function(){
      let currentMax = dataset[0];
      for(var i = 0; i < dataset.length; i++){
        if(dataset[i] > currentMax){
          currentMax = dataset[i];
        }
      }
      return currentMax;
    }();

    getTicks(3);
    getBars();

    //Get the relative height based on the propportion between max number and total screen height
    function getHeight(axisHeight, datasetMax, newNumber){
      let height = (newNumber / datasetMax) * axisHeight;
      return height;
    };

    //Get the axis labels and lines
    function getTicks(numberofTicks){
      let lineHeight = 14;
      //Create the axis labels for top and bottom as well as the top axis line (these are done seperatly to ensure they display correctly)
      if(numberType === 'percent'){
        textArray.push(<Text key={0} fontSize={10} strokeWidth={0.3} stroke={'rgb(122,143,147)'} x={1} y={highNumberForYAxis - lineHeight}>{'0%'}</Text>);
        textArray.push(<Text key={max} fontSize={10} strokeWidth={0.3} stroke={'rgb(122,143,147)'} x={1} y={lowNumberForYAxis}>{max+'%'}</Text>);
      }else{
        textArray.push(<Text key={0} fontSize={10} strokeWidth={0.3} stroke={'rgb(122,143,147)'} x={1} y={highNumberForYAxis - lineHeight}>{0}</Text>);
        textArray.push(<Text key={max} fontSize={10} strokeWidth={0.3} stroke={'rgb(122,143,147)'} x={1} y={lowNumberForYAxis}>{max}</Text>);        
      }

      tickLines.push(<Line key={max} x1={lowNumberForXAxis} y1={lowNumberForYAxis + 1} x2={highNumberForXAxis} y2={lowNumberForYAxis + 1} stroke='rgb(229,234,236)' strokeWidth={0.75} />);

      //Create the axis labels and lines for everthing in between 0 and max, numbers displayed to 2 decimal places
      for(var i = 1; i < numberofTicks; i++){
        if(numberType === 'percent'){
          //let tickText = Math.round(((max / numberofTicks) * [i]) * 100) / 100;
          let tickText = numeral(max / numberofTicks * [i]).format('0.00');
          let tickY = getHeight(highNumberForYAxis, max, tickText);
          textArray.push(<Text key={tickText} fontSize={10} strokeWidth={0.3} stroke={'rgb(122,143,147)'} lineHeight={lineHeight} x={1} y={highNumberForYAxis - tickY - (lineHeight / 2)}>{tickText+'%'}</Text>);
          tickLines.push(<Line key={tickText} x1={lowNumberForXAxis} y1={highNumberForYAxis - tickY} x2={highNumberForXAxis} y2={highNumberForYAxis - tickY} stroke='rgb(229,234,236)' strokeWidth={0.75} />);
        }else{
          let tickText = numeral(((max / numberofTicks) * [i])).format('0.00');
          let tickY = getHeight(highNumberForYAxis, max, tickText);
          textArray.push(<Text key={tickText} fontSize={10} strokeWidth={0.3} stroke={'rgb(122,143,147)'} lineHeight={lineHeight} x={1} y={highNumberForYAxis - tickY - (lineHeight / 2)}>{tickText}</Text>);
          tickLines.push(<Line key={tickText} x1={lowNumberForXAxis} y1={highNumberForYAxis - tickY} x2={highNumberForXAxis} y2={highNumberForYAxis - tickY} stroke='rgb(229,234,236)' strokeWidth={0.75} />);
        }
      }
    };

    //Create the bars for the graph
    function getBars(){
      for(var i = 0; i < dataset.length; i++){
        let height = getHeight(highNumberForYAxis, max, dataset[i]);
        let width = (highNumberForXAxis - lowNumberForXAxis) / dataset.length - barPadding;
        let x = (lowNumberForXAxis + barPadding) + rectangles.length * (highNumberForXAxis - lowNumberForXAxis - 5) / dataset.length;
        let y = highNumberForYAxis - height;
        rectangles.push(<Rect key={rectangles.length} x={x} y={y} width={width} height={height} fill={'rgb(23,153,173)'} />)
      }
    };

    if(dataset.reduce((a,b) => a+b,0) !== 0){
      return(
        <G>
          <Line x1={lowNumberForXAxis} y1={lowNumberForYAxis} x2={lowNumberForXAxis} y2={highNumberForYAxis} stroke='black' strokeWidth={1} />
          <Line x1={lowNumberForXAxis} y1={highNumberForYAxis} x2={highNumberForXAxis} y2={highNumberForYAxis} stroke='black' strokeWidth={1} />
          <Text fontSize={10} strokeWidth={0.3} stroke={'rgb(122,143,147)'} x={lowNumberForXAxis} y={highNumberForYAxis + 5}>{start}</Text>
          <Text fontSize={10} strokeWidth={0.3} stroke={'rgb(122,143,147)'} textAnchor="end" x={highNumberForXAxis - 8} y={highNumberForYAxis + 5}>{end}</Text>
          {textArray}
          {tickLines}
          {rectangles}
        </G>
      )
    }else{
      return(
        <G>
          <Line x1={lowNumberForXAxis} y1={lowNumberForYAxis} x2={lowNumberForXAxis} y2={highNumberForYAxis} stroke='black' strokeWidth={1} />
          <Line x1={lowNumberForXAxis} y1={highNumberForYAxis} x2={highNumberForXAxis} y2={highNumberForYAxis} stroke='black' strokeWidth={1} />
          <Text fontSize={10} strokeWidth={0.3} stroke={'rgb(122,143,147)'} x={lowNumberForXAxis} y={highNumberForYAxis + 5}>{start}</Text>
          <Text fontSize={10} strokeWidth={0.3} stroke={'rgb(122,143,147)'} textAnchor="end" x={highNumberForXAxis - 8} y={highNumberForYAxis + 5}>{end}</Text>
          <Text fontSize={15} strokeWidth={0.5} stroke={'rgb(122,143,147)'} x={lowNumberForXAxis + 20} y={highNumberForYAxis-(highNumberForYAxis/2)}>No data avaliable</Text>
        </G>
      )
    }
  }
}
module.exports = BarChart;
