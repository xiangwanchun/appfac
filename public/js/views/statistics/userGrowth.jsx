import React, { Component } from 'react'

import 'antd/style/index.less'
import '../../../css/base.less'
import '../../../css/push.less'
import { Form, Input, Checkbox, Radio, Switch,Slider, Button, Row, Col, Upload, Icon,Tooltip,Tabs,DatePicker, TimePicker,Alert} from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;
const RadioButton = Radio.Button;

let UserGrowth = React.createClass({ 

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
      <div className="mt_30 pushWrap">
          <div className="clearfix">
                 <FormItem
                  id="control-input"
                  label="公告标题："
                  labelCol={{ span:2 }}
                  prefixCls="shorten-form"
                  >
                  <Row >
                    <Col span="17">
                      <Input id="control-input" placeholder="请填写推送内容标题（仅Android设备可见）" style={{width:'830px'}} />
                    </Col>
                  </Row>
                </FormItem>
                <FormItem
                  id="control-textarea1"
                  label="公告内容："
                  labelCol={{ span:2 }}
                  >  
                    <Input type="textarea" id="control-textarea1" placeholder="限150个字内" rows="5" style={{width:'830px'}}/>
                </FormItem>

                <Row style={{ marginTop: 25 }}>
                  <Col span="16" offset="2">
                    <Button type="primary" size="large" htmlType="submit">发布</Button>
                  </Col>
                </Row>
          </div>
      </div>
    );
  }
});


export default  UserGrowth;



