import React, { Component } from 'react'

import 'antd/style/index.less'
import '../../../css/base.less'
import '../../../css/clientManagement.less'
import { Menu, Icon,Button,Tabs,Alert,Table,Row, Col,Upload} from 'antd';
import '../../plug/jquery.SuperSlide.2.1.1.js'
import PointTo from './pointTo'
const TabPane = Tabs.TabPane;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const props = {
  name: 'file',
  action: '/upload.do',
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} 上传成功。`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 上传失败。`);
    }
  }
};

const LeftDrawer = React.createClass({
  getInitialState() {
    return {
      current: 'base',
      index : 0,
      pointToLineWidth:{'title':0,'defPic':0,'user':0,'comments':0},
      pointToAllWidth:{'title':0,'defPic':0,'user':0,'comments':0}
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
  componentWillMount(){
    this.setState({
      index : this.state.index++
    })
  },
  componentDidMount() {
    setTimeout(function(){
      this.setState({
        pointToLineWidth:{'title':125,'defPic':0,'user':0,'comments':0},
        pointToAllWidth:{'title':170,'defPic':0,'user':0,'comments':0}
      })
    }.bind(this),1000)
  },
  render() {
    var _this = this;
    var bgColor = {
      backgroundColor:_this.props.bgColor
    }
    return (
      <div className="mt_30 allStyle" id="leftDrawer">
          <div style={{height:'120px'}} className="pointTo_1"> 
            <PointTo lineWidth={this.state.pointToLineWidth.title} allWidth={this.state.pointToAllWidth.title}  button="标题类型" fun={this.pointToFun} name="title" pos="right"/>
          </div>
          <div style={{height:'120px'}} className="pointTo_2"> 
            <PointTo lineWidth={this.state.pointToLineWidth.title} allWidth={this.state.pointToAllWidth.title}  button="未加载默认图" fun={this.pointToFun} name="defPic" pos="right"/>
          </div>
          <div style={{height:'120px'}} className="pointTo_3"> 
            <PointTo lineWidth={this.state.pointToLineWidth.title} allWidth={this.state.pointToAllWidth.title}  button="使用:用户中心" fun={this.pointToFun} name="users"/>
          </div>
          <div style={{height:'120px'}} className="pointTo_4"> 
            <PointTo lineWidth={this.state.pointToLineWidth.title} allWidth={this.state.pointToAllWidth.title}  button="评论" type="switch" fun={this.pointToFun} name="comments"/>
          </div>
          <div className="leftDrawer_l">
              <div className="leftDrawer_l_con" style={bgColor}>
              </div>
          </div>
          <div className="leftDrawer_r" style={bgColor}>

          </div>
      </div>
    );
  }
});

export default  LeftDrawer;
