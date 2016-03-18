import React, { Component } from 'react'
import 'antd/style/index.less'
import '../../../css/base.less'
import '../../../css/index.less'
import { Row, Col} from 'antd'
import { Menu, Icon,Button,Tabs} from 'antd';
const TabPane = Tabs.TabPane;
import { Router, Route, Link, browserHistory,RouteHandler} from 'react-router'

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
                    <Link to="/Interactive/push">
                      <img src="images/kj1.png"/>
                      <p>消息推送</p>
                    </Link> 
                  </div>
                  {/*<div className="quickEntryDiv">
                    <Link to="/Interactive/feedback">
                      <img src="images/kj2.png"/>
                      <p>意见反馈</p>
                    </Link> 
                  </div>*/}
                  <div className="quickEntryDiv">
                    <Link to="/clientmanagement/menu">
                      <img src="images/kj3.png"/>
                      <p>导航设置</p>
                    </Link> 
                  </div>
                  <div className="quickEntryDiv">
                    <Link to="/statistics/all">
                        <img src="images/kj4.png"/>
                        <p>总体统计</p>
                    </Link> 
                  </div>
                  <div className="quickEntryDiv">
                      <Link to="/clientmanagement/style">
                        <img src="images/kj5.png"/>
                        <p>风格管理</p>
                      </Link> 
                  </div>
                  <div className="quickEntryDiv">
                    <Link to="/clientmanagement/base">
                      <img src="images/kj6.png"/>
                      <p>重新打包</p>
                    </Link> 
                  </div>
              </TabPane>
          </Tabs>
      </div>
    );
  }

});

export default  QuickEntry;
