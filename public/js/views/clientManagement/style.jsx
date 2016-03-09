import React, { Component } from 'react'

import 'antd/style/index.less'
import '../../../css/base.less'
import '../../../css/clientManagement.less'
import { Menu, Icon,Button,Tabs,Alert,Table} from 'antd';
import BootScreen from './bootScreen';
import Guide from './guide';
import DetailPage from './detailPage';
import AllStyle from './allStyle';
import ListStyle from './listStyle';
import Model from './model';
const TabPane = Tabs.TabPane;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import CONFIG from '../../config/API'

const Style = React.createClass({
  getInitialState() {
    return {
      current: 'base',
      bgColor : ''
    };
  },
  handleClick(e) {
        clientManagement
  },
  render() {

    return (

      <div className="contentBlocks mt_30">
          <Tabs  defaultActiveKey="5" onChange={this.callback}>
              <TabPane tab="开机画面"  key="1">
                <BootScreen/>
              </TabPane>
              <TabPane tab="引导图组"  key="2">
                <Guide/>
              </TabPane>
              <TabPane tab="总体样式"  key="3">
                <AllStyle bgColor={this.state.bgColor}/>
              </TabPane>
              <TabPane tab="列表样式"  key="4">
                 <ListStyle bgColor={this.state.bgColor} />
              </TabPane>
              <TabPane tab="模型配置"  key="5">
                <Model bgColor={this.state.bgColor} />
              </TabPane>
              <TabPane tab="内容查看页"  key="6">
                <DetailPage bgColor={this.state.bgColor} />
              </TabPane>
          </Tabs>
      </div>
    );
  },
  componentDidMount(){
     console.log(11111111)
     $.get(CONFIG.HOSTNAME+'/client/frame',function(ajaxdata){
          /*console.log(ajaxdata);*/
          let data = this.state.data;
          ajaxdata = JSON.parse(ajaxdata);
          if(ajaxdata.state){
            data = ajaxdata.data.meta;
            this.setState({
              bgColor : data.color
            })
          }  
      }.bind(this));

      
  }
});

export default  Style;
