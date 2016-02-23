import React, { Component } from 'react'

import 'antd/style/index.less'
import '../../../css/base.less'
import '../../../css/clientManagement.less'
import { Menu, Icon,Button,Tabs,Alert,Table,Row, Col} from 'antd';
const TabPane = Tabs.TabPane;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const BootScreen = React.createClass({
  getInitialState() {
    return {
      current: 'base'
    };
  },
  handleClick(e) {
        clientManagement
  },
  render() {

    return (
      <div className="mt_30" id="bootScreenmain">
        <Row >
          <Col span="6">
1111
          </Col>
          <Col span="6">
222
          </Col>
        </Row>
      </div>
    );
  }
});

export default  BootScreen;
