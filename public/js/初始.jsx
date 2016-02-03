import React, { Component } from 'react'

import 'antd/style/index.less'
/*import 'antd/style/themes/default/custom.less'*/
import '../css/base.less'
import '../css/index.less'
import { Row, Col} from 'antd'
import { Menu, Icon,Button} from 'antd'
import MainNav from './components/mainNav'
import LeftNav from './components/LeftNav'

import {Tabs} from 'antd';
const TabPane = Tabs.TabPane;
const SubMenu = Menu.SubMenu;

const MenuItemGroup = Menu.ItemGroup;

const App1 = React.createClass({

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
                <LeftNav />
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

export default  App1;
