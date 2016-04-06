import React, { Component } from 'react'
import ReactDOM   from 'react-dom'

import 'antd/style/index.less'
import '../../../css/base.less'
import '../../../css/clientManagement.less'
import '../../../css/guidePage.less'
import { Icon,Button,Row,Col,Upload,Radio,Form,Input,message,Steps } from 'antd'
const Step = Steps.Step;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
import CONFIG from '../../config/API'

const steps = [{
  title: '应用信息'
}, {
  title: '开机画面',
}, {
  title: '引导图组',
}, {
  title: '总体风格',
}, {
  title: '导航配置',
}, {
  title: '生成APP',
}].map((s, i) => <Step key={i} title={s.title}  />);

let GuidePage = React.createClass({
  getInitialState() {
    return {
      current: 'base',
      index : 1,
      data : ''
    };
  },
  render() {
    console.log(this.state.index);
    return (
      <div className="guidePage">
        <Steps current={4}>{steps}</Steps>
      </div>
    );
    
  },
  componentDidMount() {
    setTimeout(function(){
      this.setState({
        index : 2
      })
    }.bind(this), 3000)
   
  }
});

export default  GuidePage;
