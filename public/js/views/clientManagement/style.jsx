import React, { Component } from 'react'

import 'antd/style/index.less'
import '../../../css/base.less'
import '../../../css/clientManagement.less'
import { Menu, Icon,Button,Tabs,Alert,Table} from 'antd';
import BootScreen from './bootScreen';
const TabPane = Tabs.TabPane;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const Style = React.createClass({
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
              <TabPane tab="开机画面"  key="1">
                  <BootScreen/>
              </TabPane>
              <TabPane tab="引导图组"  key="2">
                 
              </TabPane>
              <TabPane tab="总体样式"  key="3">
                 
              </TabPane>
              <TabPane tab="列表样式"  key="4">
                 
              </TabPane>
              <TabPane tab="模型配置"  key="5">
                 
              </TabPane>
              <TabPane tab="内容查看页"  key="6">
                 
              </TabPane>
          </Tabs>
      </div>
    );
  }
});

export default  Style;
