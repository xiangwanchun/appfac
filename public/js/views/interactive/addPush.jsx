import React, { Component } from 'react'

import 'antd/style/index.less'
import '../../../css/base.less'
import '../../../css/push.less'
import { Form, Input, Checkbox, Radio, Switch,Slider, Button, Row, Col, Upload, Icon,Tooltip,Tabs,DatePicker, TimePicker,Alert} from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;
const RadioButton = Radio.Button;
var text = <span>由于iOS系统限制，所有推送 标题必须显示为APP名称，该 设置仅在安卓上起效</span>;

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
                  <div className="IconBtn clearfix">
                    <div className="pushtime fl">
                      <RadioGroup  defaultValue="apple">
                        <RadioButton value="apple">立即</RadioButton>
                        <RadioButton value="android">定时</RadioButton>
                      </RadioGroup>
                    </div>
                    <div className="ml_10 pushtime fl">
                      <DatePicker /*{...getFieldProps('endDate')}*/ style={{width:'105px'}}/>
                    </div>
                    <div className="ml_10 pushtime fl">
                      <TimePicker /*{...getFieldProps('time')}*//>
                    </div>
                  </div>
                  
                </FormItem>
                <FormItem
                  label="推送内容："
                  labelCol={{ span:4 }}
                  prefixCls="shorten-form"
                >
                  <div className="IconBtn">
                    <RadioGroup  defaultValue="apple">
                      <RadioButton value="apple">手动输入</RadioButton>
                      <RadioButton value="android">链接内容</RadioButton>
                    </RadioGroup>
                  </div>
                </FormItem>
                <p className="AddPush_openApp" style={{marginTop:'-10px'}}>
                    <Icon type="exclamation-circle" className="updataTipIcon"/>
                    <a className="UpdatedInstructions" onClick={this.showModal}>点击后打开APP</a>  
                </p>
                 <FormItem
                  id="control-input"
                  label="推送标题："
                  labelCol={{ span:4 }}
                  wrapperCol={{ span: 20}}
                  prefixCls="shorten-form"
                  >
                  <Row >
                    <Col span="17">
                      <Input id="control-input" placeholder="请填写推送内容标题（仅Android设备可见）" style={{width:'370px'}} />
                    </Col>
                    <Col span="2">
                      <Tooltip placement="top" title={text}>
                        <a href="javascript:;" className="questionCircle"><Icon type="question-circle-o"/></a>
                      </Tooltip>
                    </Col>
                  </Row>
                  
                </FormItem>

                <FormItem
                  id="control-textarea"
                  label="推送正文："
                  labelCol={{ span:4 }}>
                  <Input type="textarea" id="control-textarea" placeholder="推送正文" rows="5" style={{width:'370px'}}/>
                </FormItem>
                <Row style={{ marginTop: 24 }}>
                  <Col span="16" offset="4">
                    <Button type="primary" size="large" htmlType="submit">确定</Button>
                  </Col>
                </Row>
  
            </div>
          </div>
      </div>
    );
  }
});


export default  Push;



