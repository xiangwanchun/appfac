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
      list_type : this.props.checkedId,
      data : ''
    };
  },
  componentWillReceiveProps(nextProps) {
    this.setState({
      list_type : nextProps.checkedId
    })
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
    let  name  = this.props.name;
    let styles = this.props.styles[name];
    let index = 'content_list_' + name;
    let checked = this.props.data[index].id;
    let chooseList = [];
    let html;
    let pos = this.props.pos;
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
        </Row>  
      </div>
    );
  }
});

export default  ModelType;
