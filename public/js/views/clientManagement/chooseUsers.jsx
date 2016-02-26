import React, { Component } from 'react'

import 'antd/style/index.less'
import '../../../css/base.less'
import '../../../css/clientManagement.less'
import { Icon,Button,Row,Col,Upload} from 'antd'


const ChooseUser = React.createClass({
  getInitialState() {
    return {
      current: 'base',
      index : 0
    };
  },
  pointToFun(type,val){
      if(type == 'Switch'){

      }else{

      }
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
              <h2>使用用户中心</h2>
              <div style={bgColor} className="imgWrap">
                <img src="images/style_6.png"/>
              </div>
            </div>
          </Col>
          <Col span="9">
            <div className="userChoose_2">
              <h2>使用基础配置</h2>
              <div style={bgColor} className="imgWrap">
                <img src="images/user_2.png"/>
              </div>
            </div>
          </Col>
        </Row>    
      </div>
    );
  }
});

export default  ChooseUser;
