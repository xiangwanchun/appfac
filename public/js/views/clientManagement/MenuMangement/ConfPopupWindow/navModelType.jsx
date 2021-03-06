import React, { Component } from 'react'
import ReactDOM   from 'react-dom'

import 'antd/style/index.less'
import '../../../../../css/base.less'
import '../../../../../css/clientManagement.less'
import { Icon,Button,Row,Col,Upload,Radio,Form,Input,message} from 'antd'
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
import CONFIG from '../../../../config/API'

let NavModelType = React.createClass({
  getInitialState() {
    return {
      current: 'base',
      index : 0,
      list_type : this.props.style_list_selected.id,
      data : ''
    };
  },
  componentWillReceiveProps(nextProps) {
    this.setState({
      list_type : nextProps.style_list_selected.id
    })
  },
  listTypefun(data){
    this.setState({
      list_type : data.id
    })
    this.props.fun(data);
  },
  render() {
    var _this = this;
    var bgColor = {
      backgroundColor:_this.props.bgColor
    }
    let list_style  = this.props.style_list;
    let checked = this.props.style_list_selected.id;
    let chooseList = [];
    let html;
    let span = '24';
    if(this.props.style_list_length){
      span  = parseInt(24 / this.props.style_list_length) +'';
    }

    for(let key in list_style){
      html = <Col span={span} key={key}>
            <div className="listStyleChoose">
              <h2>{list_style[key].name}</h2>
              <div style={bgColor} className="imgWrap" onClick={this.listTypefun.bind(this,list_style[key])}>
                <img src={CONFIG.DONAME + list_style[key].img}/>
                <Icon type="check-circle" style={{'display' : this.state.list_type == list_style[key].id ? 'block' : 'none'}}/>
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

export default  NavModelType;
