import React, { Component } from 'react'

import 'antd/style/index.less'
import '../../../css/base.less'
import '../../../css/clientManagement.less'
import { Icon,Button,Row,Col,Upload,Radio,Form,Input,message,Modal} from 'antd'
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const createForm = Form.create;
const FormItem = Form.Item;


let TitleSet = React.createClass({
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
  getInitialState() {
    this.props.childComponentsThis(this);
    return {
      current: 'base',
      titleInputComponent : 'text'
    };
  },
  pointToFun(type,val){

  },
  handClick(val,e){
    if(val == 'text'){
      this.setState({
          titleInputComponent : 'text'
      })
    }else if( val == 'pic' ){
      this.setState({
          titleInputComponent : 'pic'
      })
    }
  },
  //上传变换的时候
  uploadChange(name,info){
    console.log(info)
      if (info.file.status !== 'uploading') {
        /*console.log(info.file, info.fileList);*/
      }
      if (info.file.status === 'done'){
        if(info.file.response.state){
          message.success(`${info.file.name} 上传成功。`);
          var data = this.state.data;
          this.props.titleFun({type:2,content:info.file.response.data.src})
          /*data[name] = info.file.response.data.src;
          this.setState({
              data
          })*/
        }else{
          var errorsDes =  info.file.response.error.description ;
          errorsDes = errorsDes instanceof Array ? errorsDes[0] : errorsDes
          Modal.error({
            title: '文件上传错误',
            content: `${info.file.name} ${errorsDes}`
          });
        }                  
      }else if (info.file.status === 'error') {
        Modal.error({
            title: '文件上传错误',
            content: `${info.file.name} 上传失败。`
          });
      }
  },
  render() {
    console.log(this.props)
    var _this = this;
    var bgColor = {
      backgroundColor:_this.props.bgColor
    }
    var url = this.props.config.DONAME+(this.props.content_title.type == '2' ? this.props.content_title.content : '');
    var style1 ={
      'backgroundImage':'url('+url+')'
    }
    const titlePic = {
              name: 'file',
              action: '/factory/upload',
              listType:"text" ,
              onChange(info) {
                  _this.uploadChange('titlePic',info);              
              }
            };
    const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
    const nameProps = getFieldProps('title', {
      rules: [
        { required: false, max: 5, message: 'APP名最多为6个字符' },
        { validator: this.userExists },
      ],
    });

    if(this.state.titleInputComponent == 'text'){
        return (
            <div className="titleSetWrap">
              <Form horizontal form={this.props.form}>
                <RadioGroup  defaultValue="text">
                  <RadioButton value="text" onClick={this.handClick.bind(this,'text')}>文本</RadioButton>
                  <RadioButton value="pic" onClick={this.handClick.bind(this,'pic')}>图标</RadioButton>
                </RadioGroup>
                <div className="mt_15 titleInputWrap">
                    <FormItem
                      hasFeedback>
                      <Input {...nameProps} type="text" placeholder="APP名称" />
                    </FormItem>
                </div>
              </Form>
            </div>

          );
    }else if(this.state.titleInputComponent == 'pic'){
        return (
            <div className="titleSetWrap">
              <Form horizontal form={this.props.form}>
                <RadioGroup  defaultValue="text">
                  <RadioButton value="text" onClick={this.handClick.bind(this,'text')}>文本</RadioButton>
                  <RadioButton value="pic" onClick={this.handClick.bind(this,'pic')}>图标</RadioButton>
                </RadioGroup>
                <div className="mt_15 titleInputWrap">
                     <p className="picDes">自定义图标要求:PNG格式,140x30</p>
                    <Upload {...titlePic} data={{"type" :'title'}}>
                      <Button type="primary">
                        <Icon type="upload" /> 点击上传
                      </Button>
                    </Upload>
                    <div className="titleImg"  style={ style1 } >

                    </div>
                </div>
              </Form>
            </div>

          );
    }
    
  }
});

TitleSet = createForm()(TitleSet);

export default  TitleSet;

