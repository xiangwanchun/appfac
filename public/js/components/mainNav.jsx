import React, { Component } from 'react'

import 'antd/style/index.less'
import '../../css/base.less'
import '../../css/index.less'
import { Row, Col } from 'antd'
import { Menu, Icon } from 'antd';
import { Router, Route, Link, browserHistory,RouteHandler} from 'react-router'

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
                          <Link to="/">首页</Link>
                        </Menu.Item>
                        <Menu.Item key="clientManagement">
                          <Link to="clientManagement">客户端管理</Link>
                        </Menu.Item>
         
                        <Menu.Item key="interactive">
                          <Link to="interactive">互动</Link>
                        </Menu.Item>
                        <Menu.Item key="statistics">
                          <Link to="statistics">统计</Link>
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

               /*<Menu.Item key="content">
                          <Link to="content">内容</Link>
                        </Menu.Item>*/
