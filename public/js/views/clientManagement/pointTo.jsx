import React, { Component } from 'react'

import 'antd/style/index.less'
import '../../../css/base.less'
import '../../../css/clientManagement.less'
import { Menu, Icon,Button,Tabs,Alert,Table,Row, Col,Upload,Switch } from 'antd';

const PointTo = React.createClass({
  getInitialState() {
    return {
      current: 'base',
      opacity : 0,
      Switch : true
    };
  },
  handleClick(e) {
        clientManagement
  },
  componentWillMount(){
    this.setState({
      index : this.state.index++
    })
  },
  componentDidMount(){
    setTimeout(function(){
        this.setState({
            opacity : 1
        })
    }.bind(this),1500)
  },
  onChange(checked) {
    this.setState({
      Switch : checked
    })
    this.props.fun('switch',checked);
  },
  render() {
    let _this = this;
    let squareEdgeWidth = this.props.allWidth - this.props.lineWidth;
    let hypotenuseWidth = Math.sqrt(squareEdgeWidth*squareEdgeWidth + squareEdgeWidth*squareEdgeWidth);
    let name = "focusBox focusBox_"+this.state.index;
    let pos =  this.props.pos || 'left';//斜线是在左边还是在右边
let leftPosition = pos != 'left'? this.props.lineWidth : 0;//相对于左边的位置


    let hypotenuseStyle_L = {
            'width':hypotenuseWidth+'px',
            'left': leftPosition,
            'MozTransform':'rotate(-45deg)',
            'WebkitTransform':'rotate(-45deg)',
            'transform':'rotate(-45deg)',
            'transformOrigin':'left'
       }
    let hypotenuseStyle_R = {
            'width':hypotenuseWidth+'px',
            'right':0,
            'MozTransform':'rotate(45deg)',
            'WebkitTransform':'rotate(45deg)',
            'transform':'rotate(45deg)',
            'transformOrigin':'right'
       }
   let opacity = this.state.opacity;
      if(pos == 'left'){
        return (
           <div className="pointToWrap" style={{height:squareEdgeWidth+32+'px',width:this.props.allWidth+'px'}}>
              <div className="pointToControl" style={{'opacity':opacity,textAlign:'right'}}>{this.props.type == 'switch' ? 
<Switch checked={this.state.Switch} onChange={this.onChange} /> : <a href="javascript:;">{this.props.button}</a>}</div>
              <div className="pointToline" style={{'left': squareEdgeWidth-1+'px','width' : this.props.lineWidth+'px'}}>
              </div>
              <div className="pointToline_hypotenuse" style={ hypotenuseStyle_L}>
              </div>
          </div>
        )
      }else{
        return (
            <div className="pointToWrap" style={{height:squareEdgeWidth+32+'px',width:this.props.allWidth+'px'}}>
                <div className="pointToControl" style={{'opacity':opacity}}>{this.props.type == 'switch' ? 
<Switch checked={this.state.Switch} onChange={this.onChange} /> : <a href="javascript:;">{this.props.button}</a>}</div>
                <div className="pointToline" style={{'left':0,'width' : this.props.lineWidth+'px'}}>
                </div>
                <div className="pointToline_hypotenuse" style={hypotenuseStyle_R}>
                </div>
            </div>
          )
      }

  }
});

export default  PointTo;
