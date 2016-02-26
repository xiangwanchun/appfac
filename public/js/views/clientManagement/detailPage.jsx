import React, { Component } from 'react'

import 'antd/style/index.less'
import '../../../css/base.less'
import '../../../css/clientManagement.less'
import { Menu, Icon,Button,Tabs,Alert,Table,Row, Col,Upload} from 'antd'
import PointTo from './pointTo'

const DetailPage = React.createClass({
  getInitialState() {
    return {
      current: 'base',
      index : 0,
      pointToLineWidth:{'detailPage':0},
      pointToAllWidth: {'detailPage':0}
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
          pointToLineWidth: {'detailPage':130},
          pointToAllWidth:  {'detailPage':165}
        })
      }.bind(this),1000)
  },
  render() {
    var _this = this;
    var bgColor = {
      backgroundColor:_this.props.bgColor
    }
    return (
      <div className="mt_30 allStyle" id="detailPage">          
          <div style={{height:'120px'}} className="pointTo_1"> 
            <PointTo lineWidth={this.state.pointToLineWidth.detailPage} allWidth={this.state.pointToAllWidth.detailPage}  button="内容查看页样式" fun={this.pointToFun} name="comments"/>
          </div>
          <div className="detailPage_r">
              <div className="detailPage_r_con" style={bgColor} >
              </div>
          </div>
          
      </div>
    );
  }
});

export default  DetailPage;
