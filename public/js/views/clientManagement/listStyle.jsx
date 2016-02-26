import React, { Component } from 'react'

import 'antd/style/index.less'
import '../../../css/base.less'
import '../../../css/clientManagement.less'
import { Menu, Icon,Button,Tabs,Alert,Table,Row, Col,Upload} from 'antd'
import PointTo from './pointTo'

const ListStyle = React.createClass({
  getInitialState() {
    return {
      current: 'base',
      index : 0,
      pointToLineWidth:{'user':0,'defPic':0,'comments':0},
      pointToAllWidth: {'user':0,'defPic':0,'comments':0}
    };
  },
  handleClick(e) {
        clientManagement
  },
  pointToFun(type,val){
      if(type == 'Switch'){

      }else{

      }
  },
  componentDidMount() {
     setTimeout(function(){
        this.setState({
          pointToLineWidth: {'sliderNum':100,'listType':105},
          pointToAllWidth:  {'sliderNum':135,'listType':130}
        })
      }.bind(this),1000)
  },
  render() {
    var _this = this;
    var bgColor = {
      backgroundColor:_this.props.bgColor
    }
    return (
      <div className="mt_30 allStyle" id="listStyle">

          <div style={{height:'120px'}} className="pointTo_1"> 
            <PointTo lineWidth={this.state.pointToLineWidth.sliderNum} allWidth={this.state.pointToAllWidth.sliderNum}  button="幻灯片数量" fun={this.pointToFun} name="defPic" />
          </div>
          
          <div style={{height:'120px'}} className="pointTo_2"> 
            <PointTo lineWidth={this.state.pointToLineWidth.listType} allWidth={this.state.pointToAllWidth.listType}  button="列表默认样式" fun={this.pointToFun} name="comments"/>
          </div>
          <div className="listStyle_r">
              <div className="listStyle_r_con" style={bgColor} >
              </div>
          </div>
          
      </div>
    );
  }
});

export default  ListStyle;
