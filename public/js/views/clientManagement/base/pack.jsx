import React, { Component } from 'react'
import ReactDOM   from 'react-dom'

import 'antd/style/index.less'
import '../../../../css/base.less'
import '../../../../css/clientManagement.less'
import { Icon,Button,Row,Col,Upload,Radio,Form,Input,message,Tooltip } from 'antd'
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
let text = '测试说明';
let Pack = React.createClass({
  getInitialState() {
    return {
      current: 'base',
      index : 0
    };
  },
  handSubmit(){
    this.props.fun('pack');
  },
  render() {
    var _this = this;
    var bgColor = {
      backgroundColor:_this.props.bgColor
    }
    return (
       <div className="pushWrap">
          <div className="clearfix">
            <div className="AppInformation_r">
                <FormItem
                  label="版本类型："
                  labelCol={{ span:4 }}
                >
                  <div className="IconBtn">
                    <RadioGroup  defaultValue="apple">
                      <RadioButton value="all">推广配置</RadioButton>
                      <RadioButton value="apple">上架版本</RadioButton>
                    </RadioGroup>
                  </div>
                </FormItem>
                 <FormItem
                  label="版本号："
                  labelCol={{ span:4 }}
                  wrapperCol={{ span: 20}}
                  prefixCls="shorten-form"
                  >
                    <Input  defaultValue="1.0.1" disabled style={{width:'225px'}} />                
                </FormItem>
                <FormItem
                  label="生成配置："
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
                <Row style={{ marginTop: 24 }}>
                  <Col span="16" offset="4">
                    <Button type="primary" size="large" onClick={this.handSubmit} >开始生成</Button>
                  </Col>
                </Row>
            </div>
          </div>
      </div>
    );
  }
});

export default  Pack;

/* <Col span="2">
    <Tooltip placement="top" title={text}>
      <a href="javascript:;" className="questionCircle"><Icon type="question-circle-o"/></a>
    </Tooltip>
  </Col>*/ 