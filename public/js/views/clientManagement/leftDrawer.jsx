import React, { Component } from 'react'

import 'antd/style/index.less'
import '../../../css/base.less'
import '../../../css/clientManagement.less'
import { Menu, Icon,Button,Tabs,Alert,Table,Row, Col,Upload} from 'antd'
import PointTo from './pointTo'
import CONFIG from '../../config/API'

const LeftDrawer = React.createClass({
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
  //箭头函数回调
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
          pointToLineWidth: {'user':65,'defPic':190,'comments':105},
          pointToAllWidth:  {'user':120,'defPic':260,'comments':130}
        })
      }.bind(this),1000)
  },
  render() {
    var _this = this;
    var bgColor = {
      backgroundColor:_this.props.color
    }
    let url2 = CONFIG.DONAME+ this.props.loading_img ;
    let style2 ={
      'backgroundImage':'url('+url2+')'
    }
    return (
      <div className="mt_30 allStyle" id="leftDrawer">
          {/*<div style={{height:'120px'}} className="pointTo_1"> 
            <PointTo lineWidth={this.state.pointToLineWidth.user} allWidth={this.state.pointToAllWidth.user}  button="用户中心" fun={this.pointToFun} name="member" pos="right"/>
          </div>*/}

          <div style={{height:'120px'}} className="pointTo_2"> 
            <PointTo  {...this.props} lineWidth={this.state.pointToLineWidth.defPic} allWidth={this.state.pointToAllWidth.defPic}  button="未加载默认图" fun={this.pointToFun} name="defPic" />
          </div>
          
          <div style={{height:'120px'}} className="pointTo_3"> 
            <PointTo {...this.props} lineWidth={this.state.pointToLineWidth.comments} allWidth={this.state.pointToAllWidth.comments}  button="评论" type="switch" fun={this.pointToFun} name="comments"/>
          </div>
          <div className="defPicBox" style={style2}></div>
          <div className="commentsBox" style={{display : this.props.is_comment == '1' ? 'none' : 'block'}}></div>
          <div className="leftDrawer_l" style={bgColor}>

          </div>
          <div className="leftDrawer_r">
              <div className="leftDrawer_r_con" style={bgColor} >
              </div>
          </div>
          
      </div>
    );
  }
});

export default  LeftDrawer;
