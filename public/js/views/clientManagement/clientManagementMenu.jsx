import React, { Component } from 'react'

import 'antd/style/index.less'
import '../../../css/base.less'
import '../../../css/clientManagement.less'
import { Menu, Icon,Button,Tabs,Alert,Table} from 'antd';
const TabPane = Tabs.TabPane;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const ClientManagementMenu = React.createClass({
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
              <TabPane tab="菜单配置"  key="1">
                 
              </TabPane>
          </Tabs>
      </div>
    );
  }
});

export default  ClientManagementMenu;
