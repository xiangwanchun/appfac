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
          <Tabs  defaultActiveKey="1" >
              <TabPane tab="功能快捷入口" key="1">
                
              </TabPane>
          </Tabs>
      </div>
    );
  }

});

export default  QuickEntry;
