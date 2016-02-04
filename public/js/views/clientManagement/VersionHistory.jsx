import React, { Component } from 'react'

import 'antd/style/index.less'
import '../../../css/base.less'
import '../../../css/clientManagement.less'
import { Menu, Icon,Button,Tabs,Alert,Table} from 'antd';
const TabPane = Tabs.TabPane;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const columns = [{
              title: '版本号',
              dataIndex: 'name',
              render: function(text) {
                return <a href="#">{text}</a>;
              }
            }, {
              title: '类型',
              className: 'column-money',
              dataIndex: 'money'
            }, {
              title: '打包日期',
              dataIndex: 'address'
            },
            {
              title: '下载',
              dataIndex: '',
              render: renderAction
            }];


function renderAction() {
  return  <div className="tableBtn">
            <a href="#"><Icon type="apple" /></a>
            <a href="#"><Icon type="android" /></a>
          </div>;
}

var data = [{
  key: '1',
  name: '胡彦斌',
  money: '￥300,000.00',
  address: '西湖区湖底公园1号'
}, {
  key: '2',
  name: '胡彦祖',
  money: '￥1,256,000.00',
  address: '西湖区湖底公园1号'
}, {
  key: '3',
  name: '李大嘴',
  money: '￥120,000.00',
  address: '西湖区湖底公园1号'
}];

const VersionHistory = React.createClass({
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
              <TabPane tab="版本历史"  key="1">
                  <Alert message="这里的版本，为系统生成的版本号，非上架版本号。若需要上架，请在上架时根据对应AppStore的要求填写" type="info" showIcon />
                  <div className="addVersion">
                      <Button type="primary">
                          <Icon type="plus" />
                          新建版本
                      </Button>
                      <p>您今天打包次数共100次，还剩余5次</p>
                  </div>
                  <div className="mt_10">
                    <Table columns={columns} dataSource={data} bordered />
                  </div>
              </TabPane>
          </Tabs>
      </div>
    );
  }
});

export default  VersionHistory;
