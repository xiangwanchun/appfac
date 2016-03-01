import React, { Component } from 'react'
import ReactDOM   from 'react-dom'

import 'antd/style/index.less'
import '../../../../css/base.less'
import '../../../../css/clientManagement.less'
import { Icon,Button,Row,Col,Upload,Radio,Form,Input,message,Tooltip,Progress} from 'antd'
const ProgressCircle = Progress.Circle;
const ButtonGroup = Button.Group;
let text = '测试说明';
let PackProgress = React.createClass({
  getInitialState() {
    return {
      current: 'base',
      index : 0,
      percent_ios:0,
      percent_android:0
    };
  },
  progressfun(type){
    this.setState({
      list_type : type
    })
    this.props.fun(type);
  },
  increase() {
    let percent_ios = this.state.percent_ios;
    let percent_android = this.state.percent_android;
    let rand1Time = Math.floor(Math.random()*(10000-8000)+ 8000);
    let rand2Time = Math.floor(Math.random()*(10000-8000)+ 8000);
    let rand1 = parseInt(3*Math.random())+1;
    let rand2 = parseInt(3*Math.random())+1;
    let times_ios = setInterval(function(){
        percent_ios += rand1;
        this.setState({ percent_ios });
        if (percent_ios > 91) {
          clearInterval(times_ios);
        }
    }.bind(this),rand1Time);
    let times_android = setInterval(function(){
        percent_android += rand2;
        this.setState({ percent_android });
        if (percent_android > 93) {
          clearInterval(times_android)
        }
    }.bind(this),rand2Time);
    
  },
  componentDidMount(){
      this.increase();
  },
  render() {
    return (
       <div>
          <Row>
            <Col span="12">
              <div className="packProgressWrap" >
                <ProgressCircle percent={this.state.percent_ios} width={160} />
                <Icon type="apple"/>
              </div>
            </Col>
            <Col span="12">
              <div className="packProgressWrap">
                <ProgressCircle percent={this.state.percent_android} width={160}/>
                <Icon type="android"/>
              </div>
            </Col>
          </Row>
        </div>
    );
  }
});

export default  PackProgress;

/* <Col span="2">
    <Tooltip placement="top" title={text}>
      <a href="javascript:;" className="questionCircle"><Icon type="question-circle-o"/></a>
    </Tooltip>
  </Col>*/ 