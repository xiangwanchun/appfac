import React, { Component } from 'react'
import ReactDOM   from 'react-dom'

import 'antd/style/index.less'
import '../../../../css/base.less'
import '../../../../css/clientManagement.less'
import { Icon,Button,Row,Col,Upload,Radio,Form,Input,message} from 'antd'
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
import CONFIG from '../../../config/API'

let ModelType = React.createClass({
  getInitialState() {
    return {
      current: 'base',
      index : 0,
      list_type : 1,
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

    let styles = this.props.styles;
   /* let checked = this.props.data.;*/
    let chooseList = [];
    let html;
    let pos = 'left';
    for(let key in styles){
      html = <Col span="12" key={key}>
            <div className="modelChoose">
              <h2>{styles[key].name}</h2>
              <div style={bgColor} className="imgWrap" onClick={this.listTypefun.bind(this,styles[key].id)}>
                <img src={CONFIG.DONAME + styles[key].img[pos]}/>
                <Icon type="check-circle" style={{'display' : this.state.list_type == styles[key].id ? 'block' : 'none'}}/>
              </div>
            </div>
          </Col>;
      chooseList.push(html);
    }
    return (
      <div>
        <Row type="flex" justify="space-between">
          {chooseList}
          {/*<Col span="12">
            <div className="modelChoose">
              <h2>使用左图样式</h2>
              <div style={bgColor} className="imgWrap" onClick={this.listTypefun.bind(this,'1')}>
                <img src="images/list_l.png"/>
                <Icon type="check-circle" style={{'display' : this.state.list_type == '1' ? 'block' : 'none'}}/>
              </div>
            </div>
          </Col>
          <Col span="12">
            <div className="modelChoose">
              <h2>使用右图样式</h2>
              <div style={bgColor} className="imgWrap" onClick={this.listTypefun.bind(this,'2')}>
                <img src="images/list_r.png"/>
                <Icon type="check-circle" style={{'display' : this.state.list_type == '2' ? 'block' : 'none'}}/>
              </div>
            </div>
          </Col>
          <Col span="12">
            <div className="modelChoose">
              <h2>使用右图样式</h2>
              <div style={bgColor} className="imgWrap" onClick={this.listTypefun.bind(this,'3')}>
                <img src="images/list_r.png"/>
                <Icon type="check-circle" style={{'display' : this.state.list_type == '3' ? 'block' : 'none'}}/>
              </div>
            </div>
          </Col>*/}
        </Row>  
      </div>
    );
  }
});

export default  ModelType;
