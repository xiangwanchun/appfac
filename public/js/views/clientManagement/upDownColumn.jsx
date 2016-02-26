import React, { Component } from 'react'

import 'antd/style/index.less'
import '../../../css/base.less'
import '../../../css/clientManagement.less'
import { Menu, Icon,Button,Tabs,Alert,Table,Row, Col,Upload} from 'antd';
import PointTo from './pointTo'

const UpDownColumn = React.createClass({
  getInitialState() {
    return {
      current: 'base',
      index : 0,
      pointToLineWidth:  {'title':0,'defPic':0,'user':0,'comments':0},
      pointToAllWidth: {'title':0,'defPic':0,'user':0,'comments':0}
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
          pointToLineWidth: {'title':125,'defPic':105,'user':175,'comments':250},
          pointToAllWidth:  {'title':170,'defPic':135,'user':220,'comments':320}
        })
      }.bind(this),1000)
  },
  render() {
    var _this = this;
    var bgColor = {
      backgroundColor:_this.props.bgColor
    }
    return (
      <div className="mt_30 allStyle" id="upDownColumn">
          <div style={{height:'120px'}} className="pointTo_1"> 
            <PointTo lineWidth={this.state.pointToLineWidth.title} allWidth={this.state.pointToAllWidth.title}  button="标题类型" fun={this.pointToFun} name="title" pos="right"/>
          </div>
          <div style={{height:'120px'}} className="pointTo_2"> 
            <PointTo lineWidth={this.state.pointToLineWidth.defPic} allWidth={this.state.pointToAllWidth.defPic}  button="未加载默认图" fun={this.pointToFun} name="defPic" pos="right"/>
          </div>
          <div style={{height:'120px'}} className="pointTo_3"> 
            <PointTo lineWidth={this.state.pointToLineWidth.user} allWidth={this.state.pointToAllWidth.user}  button="使用:用户中心" fun={this.pointToFun} name="users"/>
          </div>
          <div style={{height:'120px'}} className="pointTo_4"> 
            <PointTo lineWidth={this.state.pointToLineWidth.comments} allWidth={this.state.pointToAllWidth.comments}  button="评论" type="switch" fun={this.pointToFun} name="comments"/>
          </div>
          <div className="upDownColumn_l">
              <div className="upDownColumn_l_con" style={bgColor}>
              </div>
          </div>
          <div className="upDownColumn_r" style={bgColor}>

          </div>
      </div>
    );
  }
});

export default  UpDownColumn;
