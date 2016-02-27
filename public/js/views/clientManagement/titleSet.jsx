import React, { Component } from 'react'

import 'antd/style/index.less'
import '../../../css/base.less'
import '../../../css/clientManagement.less'
import { Icon,Button,Row,Col,Upload,Radio,Form,Input,message} from 'antd'
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const createForm = Form.create;
const FormItem = Form.Item;
const props = {
  name: 'file',
  action: '/upload.do',
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} 上传成功。`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 上传失败。`);
    }
  }
};

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
  render() {
    var _this = this;
    var bgColor = {
      backgroundColor:_this.props.bgColor
    }
    const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
    const nameProps = getFieldProps('name', {
      rules: [
        { required: true, min: 5, message: 'APP名最多为6个字符' },
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
                    <Upload {...props}>
                      <Button type="primary">
                        <Icon type="upload" /> 点击上传
                      </Button>
                    </Upload>
                    <div className="titleImg">

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

