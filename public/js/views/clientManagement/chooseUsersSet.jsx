import React, { Component } from 'react'
import ReactDOM   from 'react-dom'

import 'antd/style/index.less'
import '../../../css/base.less'
import '../../../css/clientManagement.less'
import { Icon,Button,Row,Col,Upload,Radio,Form,Input,message} from 'antd'
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const createForm = Form.create;
const FormItem = Form.Item;


let ChooseUserSet = React.createClass({
  getInitialState() {
    return {
      current: 'base',
      index : 0,
      is_member : this.props.is_member
    };
  },
  chooseUsers(type){
    this.setState({
      is_member : type
    })
    this.props.memberFun(type);
  },
  render() {
    var _this = this;
    var bgColor = {
      backgroundColor:_this.props.bgColor
    }
    const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
    return (
      <div>
        <Row type="flex" justify="space-between">
          <Col span="9">
            <div className="userChoose_1">
              <h2>使用用户中心</h2>
              <div style={bgColor} className="imgWrap" onClick={this.chooseUsers.bind(this,'1')}>
                <img src="images/style_6.png"/>
                <Icon type="check-circle" style={{'display' : this.state.is_member == '1' ? 'block' : 'none'}}/>
              </div>
            </div>
          </Col>
          <Col span="9">
            <div className="userChoose_2">
              <h2>使用基础配置</h2>
              <div style={bgColor} className="imgWrap" onClick={this.chooseUsers.bind(this,'0')}>
                <img src="images/user_2.png"/>
                <Icon type="check-circle" style={{'display' : this.state.is_member == '0' ? 'block' : 'none'}}/>
              </div>
            </div>
          </Col>
        </Row>  
      </div>
    );
  }
});

ChooseUserSet = createForm()(ChooseUserSet);
export default  ChooseUserSet;
