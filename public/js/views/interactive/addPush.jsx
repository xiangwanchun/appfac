import React, { Component } from 'react'

import 'antd/style/index.less'
import '../../../css/base.less'
import '../../../css/push.less'

import { Form,message, Input, Button, Row, Col, Upload, Icon,Tooltip,DatePicker,Radio,Modal} from 'antd';
import CONFIG from '../../config/API'
const createForm = Form.create;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;


var text = <span>由于iOS系统限制，所有推送 标题必须显示为APP名称，该 设置仅在安卓上起效</span>;
let data = '';

Date.prototype.format = function(format) {
       var date = {
              "M+": this.getMonth() + 1,
              "d+": this.getDate(),
              "h+": this.getHours(),
              "m+": this.getMinutes(),
              "s+": this.getSeconds(),
              "q+": Math.floor((this.getMonth() + 3) / 3),
              "S+": this.getMilliseconds()
       };
       if (/(y+)/i.test(format)) {
              format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
       }
       for (var k in date) {
              if (new RegExp("(" + k + ")").test(format)) {
                     format = format.replace(RegExp.$1, RegExp.$1.length == 1
                            ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
              }
       }
       return format;
}


let Push = React.createClass({
  getInitialState() {
    return {
      current: 'base',
      visible: false,
      is_member : '',
      menberType : '0',
      //弹窗名
      modalTitle : '',
      //模型内容
      modalCon : '',
      //判断是哪个箭头函数触发的
      allPointToType : '',
      titleNum:0,
      status : false,
      data : {
              "destination":"3","timing":"1","time":" ","title":" ",'content': " "
            }

    }
  },
  getValidateStatus(field) {
    const { isFieldValidating, getFieldError, getFieldValue } = this.props.form;

    if (isFieldValidating(field)) {
      return 'validating';
    } else if (!!getFieldError(field)) {
      return 'error';
    } else if (getFieldValue(field)) {
      return 'success';
    }
  },
  handleSelectChange(value) {
    console.log('selected ' + value);
  },
  handleUpload(){
    console.log('111111');
  },
  pushHandleClick(customData,e){
    data = this.state.data;
    if(typeof customData.type != 'undefined' && customData.type == 'input'){//普通表单
      data[customData.name] = e.target.value ;  
    }else{//按钮切换处理
      data[customData.name] = customData.val ;
      if(customData.name == 'timing' &&  customData.val == '1'){
        data.time = '' ;
      }
    }

    this.setState({
      data
    })
  },
  normFile(e) {
      if (Array.isArray(e)) {
        return e;
      }
      return e && e.fileList;
  },
  handleSubmit(e) {
    e.preventDefault();
    
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!');
        return;
      }

      data = this.state.data;
      let time = values.time && data.timing == '2' ? values.time.format('yyyy-MM-dd hh:mm:ss') : '';
      console.log('222222');
      if(!values.time && data.timing == '2'){
           message.warn('请选择定时发布时间');
          return;
      }
      data.title = values.title;
      data.content = values.content;
      data.time = time;
      console.log(data);
      this.setState({
        'status' : true
      })
    });
  },
  ajaxhandleSubmit(e){
    this.handleSubmit(e);
    setTimeout(function(){

      if( this.state.status ){
        let data = this.state.data;
        data.tenantid = tenantid[0];

        $.post(CONFIG.HOSTNAME+'/push',data,function(ajaxdata){
          ajaxdata = JSON.parse(ajaxdata);
          if(ajaxdata.state){
            Modal.success({
              title: '成功信息',
              content: `恭喜您!推送成功。`
            });
          }else{
            Modal.error({
              title: '失败消息',
              content: `推送失败`
            });
          } 
        }.bind(this));

      }

      }.bind(this), 500)

    
    
  },
  inputNum(name, rule, value, callback) {
      if(value){
        this.setState({
          [name] : value.length
        })
      }
      callback();
  },
  render() {
    console.log(this.state.data);
    const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
    const titleProps = getFieldProps('title', {
       validate: [{
        rules: [
          { required: true ,message: '请输入推送标题'},
        ],
        trigger: 'onBlur',
      }, {
        rules: [
          { max : 10 , message: '推送标题长度不能大于10个汉字' },
          { validator: this.inputNum.bind(this,'titleNum') },
        ],
        trigger: ['onBlur', 'onChange'],
      }]
    });
    const contentProps = getFieldProps('content', {
      rules: [
        { required: true, max: 25, message: "推送内容建议为25个汉字以内" }
      ],
    });
    data = this.state.data;
    return (
      <div className="mt_30 pushWrap">
         <Form horizontal form={this.props.form} onSubmit={this.ajaxhandleSubmit}>
          <div className="clearfix">
            <div className="AppInformation_l ">
                <img src="images/basePhone.png" title="新媒体头条"/>
            </div>
            <div className="AppInformation_r">
                <FormItem
                  label="推送目标："
                  labelCol={{ span:4 }}
                  wrapperCol={{ span: 20}}
                >
                  <div className="IconBtn">
                    <RadioGroup  defaultValue={data.destination}>
                      <RadioButton value="3" onClick={this.pushHandleClick.bind(this,{'name':'destination','val':'3'}) }>所有</RadioButton>
                      <RadioButton value="1" onClick={this.pushHandleClick.bind(this,{'name':'destination','val':'1'}) }><Icon type="apple" /></RadioButton>
                      <RadioButton value="2" onClick={this.pushHandleClick.bind(this,{'name':'destination','val':'2'}) }><Icon type="android" /></RadioButton>
                    </RadioGroup>
                  </div>
                </FormItem>
                <FormItem
                  label="推送时间："
                  labelCol={{ span:4 }}
                  wrapperCol={{ span: 20}}
                >
                  <div className="IconBtn clearfix">
                    <div className="pushtime fl">
                      <RadioGroup  defaultValue={data.timing}>
                        <RadioButton value="1" onClick={this.pushHandleClick.bind(this,{'name':'timing','val':'1'})}>立即</RadioButton>
                        <RadioButton value="2" onClick={this.pushHandleClick.bind(this,{'name':'timing','val':'2'})}>定时</RadioButton>
                      </RadioGroup>
                    </div>
                    <div className="ml_10 pushtime fl" style={{'display':data.timing == '1' ? 'none ' : 'block'}}>
                      <DatePicker showTime format="yyyy-MM-dd HH:mm:ss"  style={{ width: 160 }} {...getFieldProps('time')}/>
                    </div>
                  </div>
                </FormItem>
                <FormItem
                  label="推送内容："
                  labelCol={{ span:4 }}
                  wrapperCol={{ span: 20}}
                >
                  <div className="IconBtn">
                    <RadioGroup  defaultValue="apple">
                      <RadioButton value="apple">手动输入</RadioButton>
                      <RadioButton value="android">链接内容</RadioButton>
                    </RadioGroup>
                  </div>
                </FormItem>
                <p className="AddPush_openApp" style={{marginTop:'-10px'}}>
                    <Icon type="exclamation-circle" className="updataTipIcon"/>
                    <a className="UpdatedInstructions" onClick={this.showModal}>点击后打开APP</a>  
                </p>
                             
                 <Row >
                    <Col span="4" style={{textAlign:'right',lineHeight:'35px'}}>
                      推送标题：
                    </Col>
                    <Col span="14">
                      <div className="inputNumWrap">
                        <FormItem
                          id="control-input"
                          label=""
                          wrapperCol={{ span: 24}}
                          >    
                          <Input id="control-input"  placeholder="请填写推送内容标题（仅Android设备可见）"  {...titleProps}/>
                        </FormItem>
                        <span className="inputNum"><i style={{"color" : this.state.titleNum > 10 ? '#ff5d3d' : ''}}>{this.state.titleNum}</i>/10</span>
                      </div>
                    </Col>

                    <Col span="2">
                      <div className="ml_10">
                        <Tooltip placement="top" title={text}>
                          <a href="javascript:;" className="questionCircle"><Icon type="question-circle-o"/></a>
                        </Tooltip>
                      </div>
                    </Col>
                  </Row>

                <FormItem
                  label="推送正文："
                  hasFeedback
                  labelCol={{ span:4 }}
                  wrapperCol={{ span:14}}
                  >
                  <Input type="textarea" placeholder="推送正文" rows="5"  {...contentProps}/>
                </FormItem>
                <Row style={{ marginTop: 24 }}>
                  <Col span="16" offset="4">
                    <Button type="primary" size="large" htmlType="submit">确定</Button>
                  </Col>
                </Row>
            </div>
          </div>
        </Form>
      </div>
    );
  }
});

Push = createForm()(Push);
export default  Push;



