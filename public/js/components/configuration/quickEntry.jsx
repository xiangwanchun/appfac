import React, { Component } from 'react'
import 'antd/style/index.less'
import '../../../css/base.less'
import '../../../css/index.less'
import { Row, Col} from 'antd'
import { Menu, Icon,Button,Tabs} from 'antd';
const TabPane = Tabs.TabPane;

const QuickEntry = React.createClass({

  getInitialState() {
    return {
      current: 'index'
    };
  },
  render() {
    return (
      <div className="quickEntry mt_30">
          <Tabs  defaultActiveKey="1" onChange={this.callback}>
              <TabPane tab="功能快捷入口"  key="1">
                  <div className="quickEntryDiv">
                      <img src="images/kj1.png"/>
                      <p>消息推送</p>
                  </div>
                  <div className="quickEntryDiv">
                      <img src="images/kj1.png"/>
                      <p>意见反馈</p>
                  </div>
                  <div className="quickEntryDiv">
                      <img src="images/kj1.png"/>
                      <p>导航设置</p>
                  </div>
                  <div className="quickEntryDiv">
                      <img src="images/kj1.png"/>
                      <p>总体统计</p>
                  </div>
                  <div className="quickEntryDiv">
                      <img src="images/kj1.png"/>
                      <p>风格管理</p>
                  </div>
              </TabPane>
          </Tabs>
      </div>
    );
  }

});

export default  QuickEntry;
