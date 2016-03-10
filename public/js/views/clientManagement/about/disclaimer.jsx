import React, { Component } from 'react'

import 'antd/style/index.less'
import '../../../../css/base.less'
import '../../../../css/push.less'
import { Form, Input, Checkbox, Radio, Switch,Slider, Button, Row, Col, Upload, Icon,Tooltip,Tabs,DatePicker, TimePicker,Alert,Modal} from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;
const RadioButton = Radio.Button;

let Disclaimer = React.createClass({
  getInitialState() {
    return {
      current: 'base',
      data : {
        statement : ''
      }
    };
  },
  handleSelectChange(value) {
    console.log('selected ' + value);
  },
  handleUpload(){
    console.log('111111');
  },
  normFile(e) {
      if (Array.isArray(e)) {
        return e;
      }
      return e && e.fileList;
  },
  handChange(e){
    var data = this.state.data;
    data.statement = e.target.value;
    this.setState({
      data
    })
  },
  ajaxhandleSubmit(e){
      $.post(this.props.config.HOSTNAME+'/client/statement',this.state.data,function(ajaxdata){
        ajaxdata = JSON.parse(ajaxdata);
        if(ajaxdata.state){
          Modal.success({
            title: '成功信息',
            content: `恭喜您!免责申明修改成功。`
          });
        }else{
          Modal.error({
            title: '失败消息',
            content: `免责申明修改成功。`
          });
        }  
      }.bind(this));
  },
  render() {
    return (
      <div className="mt_30 pushWrap">
          <div className="clearfix">
                <FormItem
                  id="control-textarea1"
                  label="内容："
                  labelCol={{ span:2 }}
                  >  
                    <Input type="textarea" id="control-textarea1"  rows="16" style={{width:'830px'}} value={this.state.data.statement} onChange={this.handChange}/>
                </FormItem>

                <Row style={{ marginTop: 25 }}>
                  <Col span="16" offset="2">
                    <Button type="primary" size="large"  onClick={this.ajaxhandleSubmit}>发布</Button>
                  </Col>
                </Row>
          </div>
      </div>
    );
  },
  componentDidMount(){

    $.get(this.props.config.HOSTNAME+'/client/statement',function(ajaxdata){
          let data = this.state.data;
          ajaxdata = JSON.parse(ajaxdata);
          if(ajaxdata.state){
            data = ajaxdata.data.meta;
            this.setState({
              data
            })
          }
    }.bind(this));
      
  }
});


export default  Disclaimer;



