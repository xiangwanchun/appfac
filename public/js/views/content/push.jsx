import React, { Component } from 'react'

import 'antd/style/index.less'
import '../../../css/base.less'
import '../../../css/clientManagement.less'
import { Form, Input, Checkbox, Radio, Switch,Slider, Button, Row, Col, Upload, Icon,Tooltip,Tabs} from 'antd';
import AddPush from './addPush'
import PushRecord from './PushRecord'
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;
var text = <span>说明文字说明文字说明文字说明文字说明文字</span>;

let Push = React.createClass({

  handleSelectChange(value) {
    console.log('selected ' + value);
  },
  handleUpload(){
    console.log('111111');
  },
  normFile(e) {
      if (Array.isArray(e)) {
        return e;
      }
      return e && e.fileList;
  },

  render() {
    return (
      <div className="contentBlocks mt_30">
          <Tabs  defaultActiveKey="1" onChange={this.callback}>
              <TabPane tab="新建推送"  key="1">
                <AddPush/>
              </TabPane>
              <TabPane tab="推送记录"  key="2">
                <PushRecord/>
              </TabPane>
          </Tabs>
      </div>

    );
  }
});


export default  Push;



