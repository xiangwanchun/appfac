import React, { Component } from 'react'

import 'antd/style/index.less'
import '../../../css/base.less'
import '../../../css/clientManagement.less'



import { Form, Input, Checkbox, Radio, Switch,Slider, Button, Row, Col, Upload, Icon,Tooltip} from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
var text = <span>说明文字说明文字说明文字说明文字说明文字</span>;
let AppInformation = React.createClass({
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
                  labelCol={{ span: 4}}
                  wrapperCol={{ span:18 }}>
                  <Input id="control-input" placeholder="输入您的APP名称"  style={{ width: 200 }}/>
                  <span className="ant-form-text">建议不大于6个字</span>
                </FormItem>
                <FormItem
                  label="APP图标："
                  labelCol={{ span: 4}}
                  wrapperCol={{ span: 18 }}>
                  <div className="AppInformation_upload_l">
                    <img src="images/ml_headlines.png"/>
                  </div>
                  <div className="AppInformation_upload_r">
                    <p className="mb_10">图片要求:PNG格式,1024x1024</p>
                    <Upload name="logo" action="/upload.do" listType="picture" onChange={this.handleUpload}
                      {...getFieldProps('upload', {
                        valuePropName: 'fileList',
                        normalize: this.normFile
                      })}
                    >
                      <Button type="primary" size="large">
                         点击上传
                      </Button>
                    </Upload>
                  </div>
                </FormItem>
                <FormItem
                  label="IOS上架配置:"
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 20 }}>
                  <p className="ant-form-text" id="userName" name="userName">若未设置，则无法在APPSTORE上架。 <Tooltip placement="top" title={text}>
        <a href="javascript:;" className="primary-color">说明</a>
      </Tooltip></p>
                </FormItem>
              </Form>
          </div>
      </div>
    );
  }
});

AppInformation = Form.create()(AppInformation);
export default  AppInformation;
