import React, { Component } from 'react'

import 'antd/style/index.less'
/*import 'antd/style/themes/default/custom.less'*/
import '../css/base.less'
import '../css/index.less'
import { Row, Col } from 'antd'
import { Menu, Icon } from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const App = React.createClass({

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
      <div>
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
        <div className="appcenter mt_30">
          <Row>
            <Col span="4">
                <div id="mainleft">
                    <section className="ml_headlines">
                      <h2 className="t_center">新媒体头条</h2>
                      <img src="images/ml_headlines.png" title="新媒体头条"/>
                      <p>上线时间:<span>2015-1-29</span></p>
                      <p>下线时间:<span>None</span></p>
                    </section>
                    <section className="mt_20 ml_scanInstall">
                      <h3>扫描安装</h3>
                      <img src="images/ml_download.png" title="新媒体头条"/>
                    </section>
                    <section className="mt_20 ml_download">
                      <h3>下载</h3>
                      <img src="images/login-title.png" title="新媒体头条"/>
                    </section>
                  </div>
            </Col>
            <Col span="20">
                <div id="mainCon">
2222
                </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }

});

export default  App;
