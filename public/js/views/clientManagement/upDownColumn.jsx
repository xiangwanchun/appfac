import React, { Component } from 'react'

import 'antd/style/index.less'
import '../../../css/base.less'
import '../../../css/clientManagement.less'
import { Menu, Icon,Button,Tabs,Alert,Table,Row, Col,Upload} from 'antd';
import PointTo from './pointTo'
import CONFIG from '../../config/API'


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
          pointToLineWidth: {'title':155,'defPic':105,'user':175,'comments':250},
          pointToAllWidth:  {'title':200,'defPic':135,'user':220,'comments':320}
        })
      }.bind(this),1000)

     
     
  },
  render() {
    let _this = this;
    let bgColor = {
      backgroundColor:_this.props.color
    }
    let title = this.props.content_title;
    let url1 = CONFIG.DONAME+(this.props.content_title.type == '2' ? this.props.content_title.content : '');
    let url2 = CONFIG.DONAME+ this.props.loading_img ;
    let style1 ={
      'backgroundImage':'url('+url1+')'
    }
    let style2 ={
      'backgroundImage':'url('+url2+')'
    }
    
    return (
      <div className="mt_30 allStyle" id="upDownColumn">
          <div style={{height:'120px'}} className="pointTo_1"> 
            <PointTo {...this.props} lineWidth={this.state.pointToLineWidth.title} allWidth={this.state.pointToAllWidth.title}  button="标题类型" fun={this.pointToFun} name="title" pos="right"/>
          </div>
          <div style={{height:'120px'}} className="pointTo_2"> 
            <PointTo {...this.props} lineWidth={this.state.pointToLineWidth.defPic} allWidth={this.state.pointToAllWidth.defPic}  button="未加载默认图" fun={this.pointToFun} name="defPic" pos="right"/>
          </div>
          {/*<div style={{height:'120px'}} className="pointTo_3"> 
            <PointTo lineWidth={this.state.pointToLineWidth.user} allWidth={this.state.pointToAllWidth.user}  button="使用:用户中心" fun={this.pointToFun} name="member"/>
          </div>*/}
          <div style={{height:'120px'}} className="pointTo_4"> 
            <PointTo {...this.props} lineWidth={this.state.pointToLineWidth.comments} allWidth={this.state.pointToAllWidth.comments}  button="评论" type="switch" fun={this.pointToFun} name="comments"/>
          </div>

          <div className="defPicBox" style={style2}></div>
          <div className="commentsBox" style={{display : this.props.is_comment == '1' ? 'none' : 'block'}}></div>
          <div className="titleBox" style={style1}>{title.type == '1' ? title.content : ''}</div>

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
