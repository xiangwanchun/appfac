import React, { Component } from 'react'

import 'antd/style/index.less'
import '../../../css/base.less'
import '../../../css/clientManagement.less'
import { Menu, Icon,Button,Tabs,Alert,Table} from 'antd';
import AppInformation from './appInformation'
const TabPane = Tabs.TabPane;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const Base = React.createClass({
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

      <div className="contentBlocks mt_30">
          <Tabs  defaultActiveKey="1" onChange={this.callback}>
              <TabPane tab="应用信息"  key="1">
                  <AppInformation/>
              </TabPane>
              <TabPane tab="推送配置"  key="2">
                 
              </TabPane>
              <TabPane tab="分享配置"  key="3">
                 
              </TabPane>
          </Tabs>
      </div>
    );
  }
});

export default  Base;
