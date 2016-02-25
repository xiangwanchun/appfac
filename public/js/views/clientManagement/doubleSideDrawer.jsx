import React, { Component } from 'react'

import 'antd/style/index.less'
import '../../../css/base.less'
import '../../../css/clientManagement.less'
import { Menu, Icon,Button,Tabs,Alert,Table,Row, Col,Upload} from 'antd';
import '../../plug/jquery.SuperSlide.2.1.1.js'
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

const DoubleSideDrawer = React.createClass({
  getInitialState() {
    return {
      current: 'base',
      index : 0
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
    
  },
  render() {
    var _this = this;
    var bgColor = {
      backgroundColor:_this.props.bgColor
    }
    return (
      <div className="mt_30 allStyle" id="doubleSideDrawer">
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
