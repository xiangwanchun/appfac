import React, { Component } from 'react'
import ReactDOM   from 'react-dom'

import 'antd/style/index.less'
import '../../../../css/base.less'
import '../../../../css/clientManagement.less'
import { Icon,Button,Row,Col,Upload,Radio,Form,Input,message,Modal} from 'antd'
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const createForm = Form.create;
const FormItem = Form.Item;

let SloganSet = React.createClass({
  getValidateStatus(field) {
    const { isFieldValidating, getFieldError, getFieldValue } = this.props.form;

    if (isFieldValidating(field)) {
      return 'validating';
    } else if (!!getFieldError(field)) {
      return 'error';
    } else if (getFieldValue(field)) {
      return 'success';
    }
  },
  getInitialState() {
    this.props.childComponentsThis(this);
    return {
      current: 'base',
      index : 0,
      data : ''
    };
  },
  sloganSetfun(type){
    this.props.fun(type);
  },
  render() {

    var _this = this;
    var bgColor = {
      backgroundColor:'red'
    }
    const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
    const nameProps = getFieldProps('slogan', {
      rules: [
        { required: false, max: 20, message: '宣传口号最多位20字符' }
      ]
    });

    return (
      <div>
        <Row type="flex" justify="space-between">
          <Col span="18">
            <Form horizontal form={this.props.form}>
              <div className="userChoose_1">
                <div className="mt_15 titleInputWrap">
                  <FormItem
                    hasFeedback>
                    <Input {...nameProps} type="text" placeholder='请输入宣传口号' />
                  </FormItem>
                </div>
              </div>
            </Form>
          </Col>
        </Row>  
      </div>
    );
  }
});

SloganSet = createForm()(SloganSet);
export default  SloganSet;
