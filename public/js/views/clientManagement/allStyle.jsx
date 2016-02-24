import React, { Component } from 'react'

import 'antd/style/index.less'
import '../../../css/base.less'
import '../../../css/clientManagement.less'
import { Menu, Icon,Button,Tabs,Alert,Table,Row, Col,Upload} from 'antd';
import LeftDrawer from './leftDrawer'
import UpDownColumn from './upDownColumn'
import DoubleSideDrawer from './doubleSideDrawer'
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
      index : 0,
      color :['#4546cd','#21ae37','#e60111','#000','#8a8a8a']
    };
  },
  handleClick(event) {
    console.log(event.target.style.backgroundColor);
    console.log(event.target.key);
  },
  componentWillMount(){
    this.setState({
      index : this.state.index++
    })
  },
  componentDidMount() {
    $(".focusBox_"+this.state.index).slide({ mainCell:".pic",effect:"left",delayTime:300,defaultIndex:0});
  },
  render() {
    var name = "focusBox focusBox_"+this.state.index;
     var options = [];
          for (var option in this.state.names) {
              options.push(
                <Col span="4"><span className="defColor_choose"  style={{backgroundColor:option}}  onClick={this.handleClick}></span></Col>
                )
          };
    return (

      <div className="mt_30">
        <Row>
          <Col span="14"><p className="styleName"> 左抽屉<span>1/3</span></p></Col>
          <Col span="10">
            <Row style={{width:220}} className="defColor" type="flex" justify="space-around">

              
              <Col span="4"><span className="defColor_choose"></span></Col>
              <Col span="4"><span className="defColor_choose"></span></Col>
              <Col span="4"><span className="defColor_choose"></span></Col>
              <Col span="4"><span className="defColor_choose"></span></Col>
            </Row>
          </Col>
        </Row>
        <div className={name}>
            <ul className="pic">
                <li>
                  <LeftDrawer/>
                </li>
                <li>
                  <UpDownColumn/>
                </li>
                <li>
                  <DoubleSideDrawer/>
                </li>
            </ul>
            <a className="prev" href="javascript:void(0)"><Icon type="left"/></a>
            <a className="next" href="javascript:void(0)"><Icon type="right"/></a>
        </div>
      </div>
    );
  }
});

export default  AllStyle;
