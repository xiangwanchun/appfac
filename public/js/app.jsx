import React, { Component } from 'react'

import 'antd/style/index.less'
/*import 'antd/style/themes/default/custom.less'*/
import '../css/base.less'
import '../css/index.less'
import { Row, Col} from 'antd'
import { Menu, Icon } from 'antd';
import MainNav from './components/mainNav';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const App = React.createClass({

  getInitialState() {
    return {
      current: 'index'
    };
  },
  handleClick(e) {
   
  },
  render() {
    return (
      <div>
        <MainNav></MainNav>
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

                </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }

});

export default  App;
