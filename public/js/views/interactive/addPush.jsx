import React, { Component } from 'react'

import 'antd/style/index.less'
import '../../../css/base.less'
import '../../../css/push.less'
import { Form, Input, Checkbox, Radio, Switch,Slider, Button, Row, Col, Upload, Icon,Tooltip,Tabs,DatePicker, TimePicker,} from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;
const RadioButton = Radio.Button;
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
      <div className="mt_30 pushWrap">
          <div className="clearfix">
            <div className="AppInformation_l ">
                <img src="images/basePhone.png" title="新媒体头条"/>
            </div>
            <div className="AppInformation_r">
                <FormItem
                  label="推送目标："
                  labelCol={{ span:4 }}
                >
                  <div className="IconBtn">
                    <RadioGroup  defaultValue="apple">
                      <RadioButton value="all">所有</RadioButton>
                      <RadioButton value="apple"><Icon type="apple" /></RadioButton>
                      <RadioButton value="android"><Icon type="android" /></RadioButton>
                    </RadioGroup>
                  </div>
                </FormItem>
                <FormItem
                  label="推送时间："
                  labelCol={{ span:4 }}
                >
                  <div className="IconBtn">
                    <RadioGroup  defaultValue="apple">
                      <RadioButton value="apple">立即</RadioButton>
                      <RadioButton value="android">定时</RadioButton>
                    </RadioGroup>
                    <DatePicker /*{...getFieldProps('endDate')}*/ className="aaa"/>
                    <TimePicker /*{...getFieldProps('time')}*/ className="bbb" />
                  </div>
                </FormItem>
                <FormItem
                  label="推送内容："
                  labelCol={{ span:4 }}
                >
                  <div className="IconBtn">
                    <RadioGroup  defaultValue="apple">
                      <RadioButton value="apple">手动输入</RadioButton>
                      <RadioButton value="android">链接内容</RadioButton>
                    </RadioGroup>
                  </div>
                </FormItem>
            </div>
          </div>
      </div>
    );
  }
});


export default  Push;



