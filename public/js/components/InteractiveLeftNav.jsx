import React, { Component } from 'react'

import 'antd/style/index.less'
import '../../css/base.less'
import '../../css/index.less'
import { Menu, Icon } from 'antd';
import { Router, Route, Link, browserHistory,RouteHandler} from 'react-router'
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const InteractiveLeftNav = React.createClass({
  getInitialState() {
    return {
      current:'push'
    };

  },
  handleClick(e) {
    console.log('click ', e);
    this.setState({
      current: e.key
    });
  },
  render() {
    return (
      <Menu onClick={this.handleClick}
        style={{ width: 170 ,marginTop : 30,paddingBottom:9999999999,marginBottom:-9999999999,overflow:'hidden'}}
        selectedKeys={[this.props.cur || this.state.current]}
        mode="inline">

        <Menu.Item key="push">
          <Link to="/Interactive/push">推送</Link>
        </Menu.Item>
        <Menu.Item key="notice">
          <Link to="/Interactive/notice">公告</Link>
        </Menu.Item>
        <Menu.Item key="feedback">
          <Link to="/Interactive/feedback">意见反馈</Link>
        </Menu.Item>
       
      </Menu>
    );
  }
});

export default  InteractiveLeftNav;


 
