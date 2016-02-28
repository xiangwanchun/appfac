import React, { Component } from 'react'
import ReactDOM   from 'react-dom'

import 'antd/style/index.less'
import '../../../css/base.less'
import '../../../css/clientManagement.less'
import { Icon,Button,Row,Col,Upload,Radio,Form,Input,message} from 'antd'
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

let ListType = React.createClass({
  getInitialState() {
    return {
      current: 'base',
      index : 0,
      list_type : '1',
    };
  },
  listTypefun(type){
    this.setState({
      list_type : type
    })
    this.props.fun(type);
  },
  render() {
    var _this = this;
    var bgColor = {
      backgroundColor:_this.props.bgColor
    }
    return (
      <div>
        <Row type="flex" justify="space-between">
          <Col span="9">
            <div className="userChoose_1">
              <h2>使用左图样式</h2>
              <div style={bgColor} className="imgWrap" onClick={this.listTypefun.bind(this,'1')}>
                <img src="images/style_6.png"/>
                <Icon type="check-circle" style={{'display' : this.state.list_type == '1' ? 'block' : 'none'}}/>
              </div>
            </div>
          </Col>
          <Col span="9">
            <div className="userChoose_2">
              <h2>使用右图样式</h2>
              <div style={bgColor} className="imgWrap" onClick={this.listTypefun.bind(this,'2')}>
                <img src="images/user_2.png"/>
                <Icon type="check-circle" style={{'display' : this.state.list_type == '2' ? 'block' : 'none'}}/>
              </div>
            </div>
          </Col>
        </Row>  
      </div>
    );
  }
});

export default  ListType;
