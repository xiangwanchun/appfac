import React, { Component } from 'react'

import 'antd/style/index.less'
import '../../css/base.less'
import '../../css/index.less'
import { Menu, Icon } from 'antd';
import { Router, Route, Link, browserHistory,RouteHandler} from 'react-router'
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const LeftNav = React.createClass({
  getInitialState() {
    return {
      current: 'base'
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
        selectedKeys={[this.state.current]}
        mode="inline">

        <Menu.Item key="base">
          <Link to="/clientmanagement/base">基础配置</Link>
        </Menu.Item>
        <Menu.Item key="style">
          <Link to="/clientmanagement/style">风格配置</Link>
        </Menu.Item>
        <Menu.Item key="menu">
          <Link to="/clientmanagement/menu">菜单配置</Link>
        </Menu.Item>
        <Menu.Item key="about">
          <Link to="/clientmanagement/about">关于</Link>
        </Menu.Item>


      </Menu>
    );
  }
});

export default  LeftNav;



        /*<Menu.Item key="version">
          <Link to="/clientmanagement/version">版本管理</Link>
        </Menu.Item>*/
