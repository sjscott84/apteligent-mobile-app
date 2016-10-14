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
    Path,
    Circle
} from 'react-native-svg';
import styles from './styleSheet';

const palette = [
  'rgb(10,61,72)',
  'rgb(23,153,173)',
  'rgb(44,186,221)',
  'rgb(193,228,233)',
  'rgb(195,211,218)',
  'rgb(137,151,158)',
  'rgb(205,220,57)',
  'rgb(245,122,0)',
  'rgb(86,71,101)',
  'rgb(153,183,31)',
  'rgb(252,200,148)',
  'rgb(156,137,174)',
  'rgb(174,99,25)',
  'rgb(94,112,120)',
  'rgb(223,217,229)',
  'rgb(122,104,139)',
  'rgb(121,142,35)',
  'rgb(255,161,20)',
  'rgb(18,111,126)',
  'rgb(223,245,134)'
]

class PieChart extends Component{
  _getSlices(){
    const data = this.props.data;
    if(data.length <= 1) {
      return (<Circle cx={'75'} cy={'75'} r={75} fill={palette[0]} />)
    }else{

      const total = Math.ceil(data.reduce((n, d) => d.value + n, 0));
      const center = 75;
      let startAngle = 0;
      let endAngle = 0;
      let max = 0;

      for(var j = 0; j < data.length; j++){
        if(data[j]['value'] > max){
          max = data[j]['value'];
        }
      }

      return (
        data.map((d, i) => {
          const angle = 360 * d.value / total;
          const largeArc = (d.value / total) <= 0.5 ? 0 : 1;

          startAngle = endAngle;
          endAngle = startAngle + angle;

          const x1 = Math.round(center + center * Math.cos(Math.PI * startAngle / 180));
          const y1 = Math.round(center + center * Math.sin(Math.PI * startAngle / 180));

          const x2 = Math.round(center + center * Math.cos(Math.PI * endAngle / 180));
          const y2 = Math.round(center + center * Math.sin(Math.PI * endAngle / 180));

          const dPath = 
            'M' + center + ' ' + center + ' ' +
            'L' + x1 + ' ' + y1 + ' ' +
            'A' + center + ' ' + center + ' 0 ' + largeArc + ' 1 ' + x2 + ' ' + y2 + ' ' +
            'Z'

          getColor = function(){
            if(d.value === max){
              return 'rgb(18,111,126)';
            }else{
              return palette[i];
            }
          }
          
          return (
            <Path
              key={ 'sector' + i }
              d={ dPath }
              fill={getColor()}
              stroke="#fff"
              strokeWidth={ 0 } 
              onPress={() => {console.log(d.label)}} />
          )
        })
      )
    }
  }

  render(){
    return(
        <Svg height={'150'} width={'150'}>
          <G>
            {this._getSlices()}
            <Circle cx={'75'} cy={'75'} r={45} fill={'white'} />
          </G>
        </Svg>
    )
  }
}

module.exports = PieChart;