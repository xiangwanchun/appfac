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
          <div className="clearfix">
            <div className="AppInformation_l ">
                <img src="images/basePhone.png" title="新媒体头条"/>
            </div>
            <div className="AppInformation_r">
               
                  <FormItem
                    id="control-input"
                    label="APP名称："
                    labelCol={{ span: 4}}
                    wrapperCol={{ span:18 }}>
                    <Input placeholder="输入您的APP名称" {...getFieldProps('appName')} style={{ width: 200 }}/>
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
                    label="IOS上架配置："
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 20 }}>
                    <p className="ant-form-text" id="userName" name="userName">若未设置，则无法在APPSTORE上架。 <Tooltip placement="top" title={text}>
                        <a href="#aaa" className="primary-color">说明</a>
                    </Tooltip></p>
                  </FormItem>
                  <FormItem
                    label="IOS上架证书上传："
                    labelCol={{ span: 5}}
                    wrapperCol={{ span: 18 }}>
                      <Row>
                        <Col span="5">
                            <Upload name="ios_1" action="/upload.do" listType="picture1" onChange={this.handleUpload} style={{display:'inline-block',width:'120px'}}
                              {...getFieldProps('upload1', {
                                valuePropName: 'fileList1',
                                normalize: this.normFile
                              })}
                            >
                              <Button type="primary" size="large">
                                 点击上传
                              </Button>
                            </Upload>
                        </Col>
                        <Col span="12">
                          <a className="ant-form-text primary-color">证书制作参考</a>
                        </Col>
                      </Row>                      
                      
                  </FormItem>

                  <FormItem
                    label="IOS上架证书上传："
                    labelCol={{ span: 5}}
                    wrapperCol={{ span: 18 }}>
                      <Row>
                        <Col span="5">
                            <Upload name="ios_1" action="/upload.do" listType="picture2" onChange={this.handleUpload} style={{display:'inline-block',width:'120px'}}
                              {...getFieldProps('upload2', {
                                valuePropName: 'fileList2',
                                normalize: this.normFile
                              })}
                            >
                              <Button type="primary" size="large">
                                 点击上传
                              </Button>
                            </Upload>
                        </Col>
                        <Col span="12">
                          <a className="ant-form-text primary-color">证书制作参考</a>
                        </Col>
                      </Row> 

                  </FormItem>                        
            </div>
          </div>
          <section>
            <div className="block_header">
              配置基础信息
            </div>
            <div className="mt_20">
                <FormItem
                    id="control-input"
                    label="iOS Boundle ID & Android 包名："
                    labelCol={{ span:7}}
                    wrapperCol={{ span:15 }}>
                    <Input id="control-input" disabled defaultValue="我是禁用的" style={{ width:345 }}/>
                  </FormItem>
                  <FormItem
                    id="control-input"
                    label="Android签名："
                    labelCol={{ span:7}}
                    wrapperCol={{ span:15 }}>
                    <Input id="control-input" defaultValue="我是禁用的"  disabled  style={{ width:345 }}/>
                  </FormItem>
                  <FormItem
                    id="control-input"
                    label="iOS & Android 回调地址："
                    labelCol={{ span:7}}
                    wrapperCol={{ span:15 }}>
                    <Input id="control-input"  defaultValue="我是禁用的"  disabled  style={{ width:345 }}/>
                    <p className="desP">上述参数不可修改，用于在各平台申请时使用。</p>
                  </FormItem>
            </div>
          </section>

      </div>
    );
  }
});


export default  AppInformation;



