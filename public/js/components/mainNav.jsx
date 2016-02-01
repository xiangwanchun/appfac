import React, { Component } from 'react'

import 'antd/style/index.less'
import '../../css/base.less'
import '../../css/index.less'
import { Row, Col } from 'antd'
import { Menu, Icon } from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const MainNav = React.createClass({

  getInitialState() {
    return {
      current: 'index'
    };
  },
  handleClick(e) {
    console.log('click ', e.key);
    this.setState({
      current: e.key
    });
  },
  render() {
    return (
        <header id="topHeader">
          <nav  className="mainNav">         
            <Row>
                <Col span="4">
                    <div id="mainlogo">
                        
                    </div>
                </Col>
                <Col span="20">
                    <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} theme={this.state.theme} mode="horizontal">
                        <Menu.Item key="index">
                          首页
                        </Menu.Item>
                        <Menu.Item key="clientManagement">
                          客服端管理
                        </Menu.Item>
                        <Menu.Item key="content">
                          内容
                        </Menu.Item>
                        <Menu.Item key="interactive">
                          互动
                        </Menu.Item>
                        <Menu.Item key="statistics">
                          统计
                        </Menu.Item>         
                  </Menu>
                </Col>
            </Row>
          </nav>
        </header>   
    );
  }

});

export default  MainNav;
