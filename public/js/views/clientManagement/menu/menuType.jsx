import React, { Component } from 'react'
import ReactDOM   from 'react-dom'

import 'antd/style/index.less'
import '../../../../css/base.less'
import '../../../../css/clientManagement.less'
import { Icon,Button,Row,Col,Upload,Radio,Form,Input,message,Tooltip } from 'antd'
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
import CONFIG from '../../../config/API'
let MenuType = React.createClass({
  getInitialState() {
    return {
      current: 'base',
      index : 0,
      data : '',
      checked : -1
    };
  },
  handSubmit(){
    this.props.fun('pack');
  },
  checkedFun(key,id){

      this.setState({
        checked : key
      })
      this.props.fun(id);
  },
  render() {
    var _this = this;
    let data = this.state.data;
    let chooseList = [];
    let html;
    let style = {
      borderColor : '#1ba796'
    }

    for(let key in data){
      html = <li onClick={this.checkedFun.bind(this,key,data[key].id)} key={key} style={key == this.state.checked ? style : {} }>{data[key].name}</li>;
      chooseList.push(html);
    }
    return (

      <ul className="menuTypeUl clearfix">
        {chooseList}
      </ul>

    );
  },
  componentDidMount(){
    $.get(CONFIG.HOSTNAME+'/content/type',function(ajaxdata){
         
          let data = this.state.data;
          ajaxdata = JSON.parse(ajaxdata);
           console.log(ajaxdata);
          if(ajaxdata.state){
            data = ajaxdata.data.model;
            this.setState({
              data
            })
          }  

      }.bind(this));
  }
});

export default  MenuType;