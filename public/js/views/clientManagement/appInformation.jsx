import React, { Component } from 'react'

import 'antd/style/index.less'
import '../../../css/base.less'
import '../../../css/clientManagement.less'



import { Form, Input, Checkbox, Radio, Switch,Slider, Button, Row, Col, Upload, Icon} from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

let AppInformation = React.createClass({
  handleSubmit(e) {
    e.preventDefault();
    console.log('收到表单值：', this.props.form.getFieldsValue());
  },

  render() {
    const { getFieldProps } = this.props.form;
    return (
      <Form horizontal onSubmit={this.handleSubmit}>
        <FormItem
          label="用户名："
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}>
          <p className="ant-form-text" id="userName" name="userName">大眼萌 minion</p>
        </FormItem>
        <FormItem
          label="密码："
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}>
          <Input type="password" {...getFieldProps('pass')} placeholder="请输入密码" />
        </FormItem>
        <FormItem
          label="您的性别："
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}>
            <RadioGroup {...getFieldProps('gender', { initialValue: 'female' })}>
              <Radio value="male">男的</Radio>
              <Radio value="female">女的</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem
          label="备注："
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          help="随便写点什么">
          <Input type="textarea" placeholder="随便写" {...getFieldProps('remark')} />
        </FormItem>
        <FormItem
          wrapperCol={{ span: 14, offset: 6 }}>
          <label>
            <Checkbox {...getFieldProps('agreement')} />同意
          </label>
        </FormItem>
        <Row>
          <Col span="16" offset="6">
            <Button type="primary" htmlType="submit">确定</Button>
          </Col>
        </Row>
      </Form>
    );
  }
});

AppInformation = Form.create()(AppInformation);



/*let AppInformation = React.createClass({
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
    console.log(this.props.form);
    const { getFieldProps } = this.props.form;
    return (
      <div className="mt_30">
          <div className="AppInformation_l red">
              <img src="images/basePhone.png" title="新媒体头条"/>
          </div>
          <div className="AppInformation_r red">
              <Form horizontal>
                <FormItem
                  id="control-input"
                  label="APP名称："
                  labelCol={{ span: 3 }}
                  wrapperCol={{ span:18 }}>
                  <Input id="control-input" placeholder="输入您的APP名称"  style={{ width: 200 }}/>
                  <span className="ant-form-text">建议不大于6个字</span>
                </FormItem>
                <FormItem
                  label="APP图标："
                  labelCol={{ span: 3 }}
                  wrapperCol={{ span: 18 }}
                  help="提示信息要长长长长长长长长长长长长长长">

                  <Upload name="logo" action="/upload.do" listType="picture" onChange={this.handleUpload}
                    {...getFieldProps('upload', {
                      valuePropName: 'fileList',
                      normalize: this.normFile
                    })}
                  >
                    <Button type="ghost">
                      <Icon type="upload" /> 点击上传
                    </Button>
                  </Upload>
                </FormItem>
              </Form>
          </div>
      </div>
    );
  }
});*/






/*const AppInformation = React.createClass({
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
          <div>
              <img src="../images/ml_headlines.png" title="新媒体头条"/>
          </div>
          <div>
              <Form horizontal>
                  <FormItem
                    id="control-input"
                    label="输入框："
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}>
                    <Input id="control-input" placeholder="Please enter..." />
                  </FormItem>
              </Form>
          </div>
      </div>
    );
  }
});*/

export default  AppInformation;
