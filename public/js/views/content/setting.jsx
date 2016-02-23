import React, { Component } from 'react'

import 'antd/style/index.less'
import '../../../css/base.less'
import '../../../css/clientManagement.less'
import { Form, InputNumber,Row, Col, Icon } from 'antd';
const FormItem = Form.Item;

let Setting = React.createClass({
   handleSubmit(e) {
    e.preventDefault();
    console.log('收到表单值：', this.props.form.getFieldsValue());
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
      <div className="mt_30" style={{width:406}}>
          <Form horizontal onSubmit={this.handleSubmit} >
            <FormItem
              label="热门文章标准："
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 10 }}>
              <InputNumber min={1}  style={{ width: 100 }}
                {...getFieldProps('hotArticle', { initialValue: 3 })} />
              <span className="ant-form-text"> 台机器</span>
            </FormItem>
            <FormItem
              label="热评文章标准："
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 10 }}>
              <InputNumber min={1}  style={{ width: 100 }}
                {...getFieldProps('hotEvaluation', { initialValue: 3 })} />
              <span className="ant-form-text"> 台机器</span>
            </FormItem>
            <FormItem
              label="热门活动标准："
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 10 }}>
              <InputNumber min={1}  style={{ width: 100 }}
                {...getFieldProps('hotActivity', { initialValue: 3 })} />
              <span className="ant-form-text"> 台机器</span>
            </FormItem>
          </Form>
      </div>
    );
  }
});

Setting = Form.create()(Setting);
export default  Setting;
