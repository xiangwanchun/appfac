import React, { Component } from 'react'

import 'antd/style/index.less'
import '../../css/base.less'
import '../../css/index.less'
import { Menu, Icon } from 'antd';
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
          基础配置
        </Menu.Item>
        <Menu.Item key="style">
          风格配置
        </Menu.Item>
        <Menu.Item key="menu">
          菜单配置
        </Menu.Item>
        <Menu.Item key="about">
          关于
        </Menu.Item>
        <Menu.Item key="version">
          版本管理
        </Menu.Item>
      </Menu>
    );
  }
});

export default  LeftNav;
