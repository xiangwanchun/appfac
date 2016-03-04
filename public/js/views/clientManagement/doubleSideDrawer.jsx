import React, { Component } from 'react'

import 'antd/style/index.less'
import '../../../css/base.less'
import '../../../css/clientManagement.less'
import { Menu, Icon,Button,Tabs,Alert,Table,Row, Col,Upload} from 'antd';
import PointTo from './pointTo'
const DoubleSideDrawer = React.createClass({
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
  pointToFun(name,expand){
    if( typeof expand != 'undefined'){
      this.props.fun(name,expand);
    }else{
      this.props.fun(name);
    }
  },
  componentDidMount() {
     setTimeout(function(){
        this.setState({
          pointToLineWidth: {'defPic':185, 'user':100, 'comments':185},
          pointToAllWidth:  {'defPic':255, 'user':155, 'comments':255}
        })
      }.bind(this),1000)
  },
  render() {
    var _this = this;
    var bgColor = {
      backgroundColor:_this.props.color
    }
    return (
      <div className="mt_30 allStyle" id="doubleSideDrawer">

          <div style={{height:'120px'}} className="pointTo_1"> 
            <PointTo {...this.props} lineWidth={this.state.pointToLineWidth.defPic} allWidth={this.state.pointToAllWidth.defPic}  button="未加载默认图" fun={this.pointToFun} name="defPic" pos="right" />
          </div>
          {/*<div style={{height:'120px'}} className="pointTo_2"> 
            <PointTo {...this.props} lineWidth={this.state.pointToLineWidth.user} allWidth={this.state.pointToAllWidth.user}  button="用户中心" fun={this.pointToFun} name="member"/>
          </div>*/}
          <div style={{height:'120px'}} className="pointTo_3"> 
            <PointTo {...this.props} lineWidth={this.state.pointToLineWidth.comments} allWidth={this.state.pointToAllWidth.comments}  button="评论" type="switch" fun={this.pointToFun} name="comments"/>
          </div>

          <div className="defPicBox"></div>
          <div className="commentsBox"></div>

          <div className="doubleSideDrawer_l" style={bgColor}>

          </div>
          <div className="doubleSideDrawer_m">
              <div className="doubleSideDrawer_m_con" style={bgColor}>
              </div>
          </div>
          <div className="doubleSideDrawer_r" style={bgColor}>

          </div>
      </div>
    );
  }
});

export default  DoubleSideDrawer;
