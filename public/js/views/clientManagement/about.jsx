import React, { Component } from 'react'

import 'antd/style/index.less'
import '../../../css/base.less'
import '../../../css/clientManagement.less'
import { Menu, Icon,Button,Tabs,Alert,Table} from 'antd';
import Disclaimer from './about/disclaimer'
import AboutUs from './about/aboutUs'
import CONFIG from '../../config/API'
const TabPane = Tabs.TabPane;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const About = React.createClass({
  getInitialState() {
    return {
      current: 'base',
    };
  },
  handleClick(e) {
        clientManagement
  },
  render() {

    return (

      <div className="contentBlocks mt_30">
          <Tabs  defaultActiveKey="2" onChange={this.callback}>
              <TabPane tab="关于我们"  key="1">
                  <AboutUs config={CONFIG}/>
              </TabPane>
              <TabPane tab="免责声明"  key="2">
                  <Disclaimer config={CONFIG}/>
              </TabPane>
          </Tabs>
      </div>
    );
  }
});

export default  About;
