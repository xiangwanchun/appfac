import React, { Component } from 'react'
import ReactDOM   from 'react-dom'

import 'antd/style/index.less'
import '../../../../css/base.less'
import '../../../../css/clientManagement.less'
import { Icon,Button,Row,Col,Upload,Radio,Form,Input,message,Tooltip } from 'antd'
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
let MenuType = React.createClass({
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
    return (

      <ul className="menuTypeUl clearfix">
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
        <li>7</li>
        <li>8</li>
      </ul>

    );
  }
});

export default  MenuType;
