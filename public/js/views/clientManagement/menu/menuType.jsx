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

let disabledType = ['2','3','10','12'];
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
    
    if(disabledType.indexOf(key) == -1){
      this.setState({
        checked : key
      })
      this.props.fun(id);
    }else{
      message.warn('模块开发中...');
    }
      
  },
  render() {
    var _this = this;
    let data = this.state.data;
    let chooseList = [];
    let html;
    let style = {
      borderColor : '#1ba796'
    }
    if(data){
      for(let key in data){
        let disabledClass = disabledType.indexOf(key) != -1 ? 'navTypeLiDisable' : 'navTypeLi';
        html = <li className={disabledClass}  onClick={this.checkedFun.bind(this,key,key)} key={key} style={key == this.state.checked ? style : {} }>{data[key]}</li>;
        chooseList.push(html);
      }
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
            data = ajaxdata.data.category;
            this.setState({
              data
            })
          }  

      }.bind(this));
  }
});

export default  MenuType;
