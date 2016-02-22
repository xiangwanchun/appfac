import React, { Component } from 'react'

import 'antd/style/index.less'
import '../../css/base.less'
import '../../css/index.less'
import { Menu, Icon } from 'antd';
import { Router, Route, Link, browserHistory,RouteHandler} from 'react-router'
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const ContentLeftNav = React.createClass({
  getInitialState() {
    return {
      current: '1',
      openKeys: []
    };
  },
  handleClick(e) {
    console.log('click ', e);
    this.setState({
      current: e.key,
      openKeys: e.keyPath.slice(1)
    });
  },
  onToggle(info) {
    this.setState({
      openKeys: info.open ? info.keyPath : info.keyPath.slice(1)
    });
  },
  render() {
    return (
      <Menu onClick={this.handleClick}
        style={{ width: 170 ,marginTop : 30,paddingBottom:9999999999,marginBottom:-9999999999,overflow:'hidden'}}
        openKeys={this.state.openKeys}
        onOpen={this.onToggle}
        onClose={this.onToggle}
        selectedKeys={[this.state.current]}
        mode="inline">
        <SubMenu key="sub1" title={<span><span>导航一</span></span>}>
          <Menu.Item key="1">选项1</Menu.Item>
          <Menu.Item key="2">选项2</Menu.Item>
          <Menu.Item key="3">选项3</Menu.Item>
          <Menu.Item key="4">选项4</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" title={<span><span>导航二</span></span>}>
          <Menu.Item key="5">选项5</Menu.Item>
          <Menu.Item key="6">选项6</Menu.Item>
          <SubMenu key="sub3" title="三级导航">
            <Menu.Item key="7">选项7</Menu.Item>
            <Menu.Item key="8">选项8</Menu.Item>
          </SubMenu>
        </SubMenu>
        <SubMenu key="sub4" title={<span>导航三</span>}>
          <Menu.Item key="9">选项9</Menu.Item>
          <Menu.Item key="10">选项10</Menu.Item>
          <Menu.Item key="11">选项11</Menu.Item>
          <Menu.Item key="12">选项12</Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
});

export default  ContentLeftNav;


