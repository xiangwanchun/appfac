import React, { Component } from 'react'

import 'antd/style/index.less'
import '../../../css/base.less'
import '../../../css/clientManagement.less'
import { Menu, Icon,Button,Tabs,Alert,Table} from 'antd';
import AddNotice from './addNotice'
import NoticeRecord from './noticeRecord'
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
              <TabPane tab="新建公告"  key="1">
                 <AddNotice/>
              </TabPane>
              <TabPane tab="公告记录"  key="2">
                 <NoticeRecord/>
              </TabPane>
          </Tabs>
      </div>
    );
  }
});

export default  Style;
