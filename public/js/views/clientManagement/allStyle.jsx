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

const AllStyle = React.createClass({
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
  componentDidMount() {
    $(".focusBox_"+this.state.index).slide({ mainCell:".pic",effect:"left",delayTime:300});
  },
  render() {
    var name = "focusBox focusBox_"+this.state.index;
    return (
      <div className="mt_30" id="bootScreenmain">
        <div className={name}>
            <ul className="pic">
                <li><img src="images/1.jpg"/></li>
                <li><img src="images/2.jpg"/></li>
                <li><img src="images/3.jpg"/></li>
                <li><img src="images/4.jpg"/></li>
            </ul>
            <a className="prev" href="javascript:void(0)"></a>
            <a className="next" href="javascript:void(0)"></a>
            <ul className="hd">
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
        </div>
      </div>
    );
  }
});

export default  AllStyle;
