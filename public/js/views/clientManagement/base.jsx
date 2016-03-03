import React, { Component } from 'react'
import 'antd/style/index.less'
import '../../../css/base.less'
import '../../../css/clientManagement.less'
import { Form, Input, Checkbox, Radio, Switch,Slider, Button, Row, Col, Upload, Icon,Tooltip,Tabs,Menu, Modal,message} from 'antd';
import Pack from './base/pack'
import PackProgress from './base/packProgress'
import CONFIG from '../../config/API'
const TabPane = Tabs.TabPane;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const createForm = Form.create;
const FormItem = Form.Item;
var text = <span>说明文字说明文字说明文字说明文字说明文字</span>;
let Base = React.createClass({
  getInitialState() {
    return {
      current: 'base',
      is_updata : 'none',
      visible: false,
      modalCon: '',
      nameNum:'0',
      data :  {
                "app_collocation": {
                    "id": "1",
                    "name": "1",
                    "icon": "",
                    "qrcode": "",
                    "version": "1.0.1",
                    "ios_access_id": "",
                    "ios_access_key": "",
                    "ios_secret_key": "",
                    "android_access_id": "",
                    "android_access_key": "",
                    "android_secret_key": "",
                    "ios_shelf_certificate": "",
                    "ios_push_certificate": "",
                    "starting_img": "/upload/guide_img1",
                    "is_push" : 0,
                    "is_weixin_share" : 0,
                    "guide_img": [
                        "/upload/guide_img1",
                        "/upload/guide_img2"
                    ],
                    "is_comment": "1",
                    "loading_img": "/upload/load/default.jpg",
                    "weixin_secret": "",
                    "weixin_id": "",
                    "slogan": "这&lt;是一 个A“ PP‘的宣'传标语",
                    "statement": "这”是A&amp;P&lt;P的免&quot;责声'明"
                },
                "bundle_id": "bundle_id",
                "android_sign": "android_sign",
                "callback": "http://www.baidu.com"
            },
      subData : ''//提交给后台的数据
    }
    
  },
  /*点击开始生成按钮回调*/
  packfun(type){

    if(type == 'pack'){
      this.setState({
        visible: true,
        allPointToType:'123',
        modalTitle : '打包配置',
        modalCon : <PackProgress bgColor={this.state.data.color} fun={this.packfun}  />
      })
      var a = CONFIG.HOSTNAME+'/client/base';
      console.log('##################');
      console.log(this.state.subData);
      $.post(CONFIG.HOSTNAME+'/client/base',this.state.subData,function(data){
          console.log(data);
      })
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
  handleSubmit1(e) {
    e.preventDefault();
    var formGetFieldsValue = this.props.form.getFieldsValue();
    console.log('收到表单值：', this.props.form.getFieldsValue());
    let subData = {
                   android_access_id:"",
                   android_access_key:"",
                   android_secret_key:"",
                   icon:"",
                   ios_access_id:"",
                   ios_access_key:"",
                   ios_push_certificate:"",
                   ios_secret_key:"",
                   ios_shelf_certificate:"",
                   is_push:"",
                   is_weixin_share:"",
                   name:"",
                   weixin_id:"",
                   weixin_secret:""
    }
    var data = this.state.data.app_collocation;
    for(let key in subData){
        subData[key] = data[key];
    }
    subData.name = formGetFieldsValue.name;
    
    

    this.setState({
      visible: true,
      allPointToType:'123',
      modalTitle : '打包配置',
      subData : subData,
      modalCon : <Pack bgColor={this.state.data.color} fun={this.packfun} data={{...this.state.data}}/>
    })
  },
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!');
        return;
      }
      console.log('Submit!!!');
      console.log(values);
      this.handleSubmit1(e);
    });
  },
  normFile(e) {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  },
  //未验证表单变换时
  onChange(name,val) {
    let  data= this.state.data;
    if(name == 'is_push' || name == 'is_weixin_share'){
      val = val ? 1 : 0; 
      data.app_collocation[name] = val;
      this.setState({
        "data": data,
        "is_updata": 'block'
      })
    }else{
      data.app_collocation[name] = val.target.value;
      this.setState({
        "data" : data,
        "is_updata" : 'block'
      })
    }
  },
  handleCancel(e) {
    this.setState({
      visible: false
    });
  },
  handleOk() {
    console.log('点击了确定');
    this.setState({
      visible: false
    });
  },
  //统计表单字数
  inputNum(name, rule, value, callback) {
      this.setState({
        "is_updata": 'block'
      })
      if(value){
        this.setState({
          [name] : value.length
        })
      }
      if(name == 'nameNum'){
          var data = this.state.data;
              data.app_collocation.name = value;
          this.setState({
            data
          })   
      }
      callback();
  },
  //上传变换的时候
  uploadChange(name,info){
      if (info.file.status !== 'uploading') {
        /*console.log(info.file, info.fileList);*/
      }
      if (info.file.status === 'done') {
        if(info.file.response.state){
          message.success(`${info.file.name} 上传成功。`);
          var data = this.state.data;
          data.app_collocation[name] = info.file.response.data.src;
          this.setState({
              data
          })
        }else{
          Modal.error({
            title: '文件上传错误',
            content: `${info.file.name} ${info.file.response.errors.description}`
          });
        }                  
      }else if (info.file.status === 'error') {
        Modal.error({
            title: '文件上传错误',
            content: `${info.file.name} 上传失败。`
          });
      }
  },
  componentDidMount(){
     
     $.get(CONFIG.HOSTNAME+'/client/base',function(ajaxdata){
          console.log(ajaxdata);
          let data = this.state.data;
          ajaxdata = JSON.parse(ajaxdata);
          if(ajaxdata.state){
            data = ajaxdata.data.meta;
            this.setState({
              data
            })
          }  
      }.bind(this));

      
  },
  render() {
    let  app_col= this.state.data.app_collocation;
    const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;

    //文件上传处理
    const _this = this;
    const icon = {
              name: 'file',
              action: '/factory/upload',
              listType:"text" ,
              onChange(info) {
                  _this.uploadChange('icon',info);              
              }
            };
    const certificate1 = {
              name: 'file',
              action: '/factory/upload',
              listType:" text" ,
              onChange(info) {
                  _this.uploadChange('ios_shelf_certificate',info);              
              }
            };
    const certificate2 = {
      name: 'file',
      action: '/factory/upload',
      listType:"text " ,
      onChange(info) {
          _this.uploadChange('ios_push_certificate',info);              
      }
    };
    const nameProps = getFieldProps('name', {
       validate: [{
        rules: [
          { required: true ,message: '请输入APP名'},
        ],
        trigger: 'onBlur',
      }, {
        rules: [
          { max : 6 , message: 'APP名称建议6个字以内' },
          { validator: this.inputNum.bind(this,'nameNum') },
        ],
        trigger: ['onBlur', 'onChange'],
      }]
    });
    var aa =app_col.is_push ? true : false;
    const testProps = getFieldProps('test', {
       validate: [{
        rules: [
          { required: aa ,message: '请输入APP名11111'},
        ],
        trigger: ['onBlur', 'onChange'],
      }]
    });

    const url = CONFIG.DONAME + app_col.icon;

    console.log(app_col.is_push );
    return (
      <div className="contentBlocks mt_30">
        <Form horizontal form={this.props.form} onSubmit={this.handleSubmit}>
          <section id="appInformation">
            <ul className="block_nav" >
              <li className="cur">
                <a href="#appInformation">应用信息</a>
              </li>
              <li>
                <a href="#pushConfiguration">推送配置</a> 
              </li>
              <li>
                <a href="#shareConfiguration">分享配置</a>
              </li>
            </ul>
            <div className="mt_30">
                  <div className="clearfix">
                    <div className="AppInformation_l ">
                        <img src="images/basePhone.png"/>
                        <div className="appIconPreview">
                            <img src={url} alt="APP图标"/>
                            <p>{app_col.name}</p>                            
                        </div>
                    </div>
                    <div className="AppInformation_r">
                          <div className="inputNumWrap">
                            <FormItem
                              id="control-input"
                              label="APP名称："
                              labelCol={{ span: 4}}
                              wrapperCol={{ span:8}}>
                              <Input  defaultValue={app_col.name} {...nameProps}/>
                            </FormItem>
                            <span className="inputNum" style={{right:330}}><i style={{"color" : this.state.nameNum > 6 ? '#ff5d3d' : ''}}>{this.state.nameNum}</i>/6</span>
                          </div>

                          <Row>
                            <Col span="4" className="colFormItem">
                                APP图标：
                            </Col>
                            <Col span="20">
                            <div className="AppInformation_upload_l">
                                <img src={CONFIG.DONAME + app_col.icon}/>
                              </div>

                              <div className="AppInformation_upload_r">
                                <p className="mb_10">图片要求:PNG格式,1024x1024</p>
                              </div>
                              <div>
                                <Upload {...icon}  data={{"type" :'app_icon'}} >
                                  <Button type="primary" size="large">
                                     点击上传
                                  </Button>
                                </Upload>
                              </div>
                            </Col>
                          </Row>

                          {/*<FormItem
                            label="IOS上架配置："
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 20 }}
                            prefixCls="shorten-form"
                            >
                            <p className="ant-form-text" id="userName" name="userName">若未设置，则无法在APPSTORE上架。 <Tooltip placement="top" title={text}>
                                <a href="javascript:;" className="primary-color">说明</a>
                            </Tooltip></p>
                          </FormItem>
  
                          <Row>
                            <Col span="5" className="colFormItem">
                              IOS上架证书上传：
                            </Col>
                            <Col span="4">
                                <Upload {...certificate1} data={{"type" :'certificate'}} style={{display:'inline-block',width:'120px'}}> 
                                  <Button type="primary" size="large">
                                     点击上传
                                  </Button>
                                </Upload>
                            </Col>
                            <Col span="5">
                              <a className="ant-form-text primary-color">证书制作参考</a>
                            </Col>
                          </Row>      

                         <Row>
                            <Col span="5" className="colFormItem" >
                              IOS推送证书上传：
                            </Col>
                            <Col span="4">
                                <Upload {...certificate2} data={{"type" :'certificate'}} style={{display:'inline-block',width:'120px'}}>
                                  <Button type="primary" size="large">
                                     点击上传
                                  </Button>
                                </Upload>
                            </Col>
                            <Col span="5">
                              <a className="ant-form-text primary-color">证书制作参考</a>
                            </Col>
                          </Row>                                  
                         <FormItem
                            label="IOS推送证书上传："
                            labelCol={{ span: 5}}
                            wrapperCol={{ span: 18 }} 
                            prefixCls="shorten-form"
                            >
                              <Row>
                                <Col span="5">
                                    <Upload name="file" action="/factory/upload" listType="text" data={{"type" :'certificate'}} onChange={this.handleUpload} style={{display:'inline-block',width:'120px'}}
                                      {...getFieldProps('certificate2', {
                                        valuePropName: 'fileList2',
                                        normalize: this.normFile
                                      })}
                                    >
                                      <Button type="primary" size="large">
                                         点击上传
                                      </Button>
                                    </Upload>
                                </Col>
                                <Col span="12">
                                  <a className="ant-form-text primary-color">证书制作参考</a>
                                </Col>
                              </Row> 
                          </FormItem>    */  }                    
                    </div>
                  </div>
                  <section>
                    <div className="block_header">
                      配置基础信息
                    </div>
                    <div className="mt_20">
                        <FormItem
                            id="control-input"
                            label="iOS Boundle ID & Android 包名："
                            labelCol={{ span:7}}
                            wrapperCol={{ span:9 }}>
                            <Input id="control-input1" disabled defaultValue={this.state.data.bundle_id}/>
                          </FormItem>
                          <FormItem
                            id="control-input2"
                            label="Android签名："
                            labelCol={{ span:7}}
                            wrapperCol={{ span:9 }}>
                            <Input id="control-input2" defaultValue={this.state.data.android_sign}  disabled />
                          </FormItem>
                          <FormItem
                            id="control-input3"
                            label="iOS & Android 回调地址："
                            labelCol={{ span:7}}
                            wrapperCol={{ span:9 }}>
                            <Input id="control-input3"  defaultValue={this.state.data.callback}  disabled />
                            <p className="desP">上述参数不可修改，用于在各平台申请时使用。</p>
                          </FormItem>
                    </div>
                  </section>  
            </div>
          </section>
          <section id="pushConfiguration">
            <ul className="block_nav" >
              <li>
                <a href="#appInformation">应用信息</a>
              </li>
              <li className="cur">
                <a href="#pushConfiguration">推送配置</a>
              </li>
              <li>
                <a href="#shareConfiguration">分享配置</a>
              </li>
            </ul>
            <div className="block_header mt_20">
              <i className="xgts"></i>
              <span>信鸽推送</span>
              <Switch defaultChecked={app_col.is_push ? true : false } onChange={this.onChange.bind(this,'is_push')} style={{float:'right',marginTop:'6px'}}/>
            </div>
            <h4 className="ml_10 mt_15">正式环境配置</h4> 
            <h4 className="ml_25">IOS设置</h4>
            <div className="mt_20">
                <FormItem                  
                    label="ACCESS ID："
                    labelCol={{ span:4}}
                    wrapperCol={{ span:9 }}>
                    <Input  defaultValue={app_col.ios_access_id}  {...testProps}  disabled={!app_col.is_push}/>
                </FormItem>
                <FormItem                
                  label="ACCESS KEY："
                  labelCol={{ span:4}}
                  wrapperCol={{ span:9 }}>
                  <Input defaultValue={app_col.ios_access_key} onChange={this.onChange.bind(this,'ios_access_key')} disabled={!app_col.is_push}  />
                </FormItem>
                <FormItem                
                  label="SECRET KEY："
                  labelCol={{ span:4}}
                  wrapperCol={{ span:9 }}>
                  <Input  defaultValue={app_col.ios_secret_key} disabled={!app_col.is_push}  onChange={this.onChange.bind(this,'ios_secret_key')} />
                  <p className="desP">上述参数不可修改，用于在各平台申请时使用。</p>
                </FormItem>
            </div>
            <h4 className="ml_25">Android设置</h4>
            <div className="mt_20">
                <FormItem                  
                    label="ACCESS ID："
                    labelCol={{ span:4}}
                    wrapperCol={{ span:9 }}>
                    <Input onChange={this.onChange.bind(this,'android_access_id')} disabled={!app_col.is_push} defaultValue={app_col.android_access_id} />
                </FormItem>
                <FormItem
                 
                  label="ACCESS KEY："
                  labelCol={{ span:4}}
                  wrapperCol={{ span:9 }}>
                  <Input defaultValue={app_col.android_access_key} disabled={!app_col.is_push} onChange={this.onChange.bind(this,'android_access_key')}  />
                </FormItem>
                <FormItem               
                  label="SECRET KEY："
                  labelCol={{ span:4}}
                  wrapperCol={{ span:9 }}>
                  <Input  defaultValue={app_col.android_secret_key} disabled={!app_col.is_push} onChange={this.onChange.bind(this,'android_secret_key')}  />
                </FormItem>
                <p className="desP">推广版本无需配置，若APP需要在应用商店发布，打包前请  前往信鸽  申请正式环境需要的配置。  点击查看申请流程</p>
            </div>
          </section>
          <section id="shareConfiguration">
            <ul className="block_nav" >
              <li>
                <a href="#appInformation">应用信息</a>
              </li>
              <li>
                <a href="#pushConfiguration">推送配置</a>
              </li>
              <li className="cur">
                <a href="#shareConfiguration">分享配置</a>
              </li>
            </ul>
            <div className="block_header mt_20">
              <i className="wxfx"></i>
              微信分享
              <Switch defaultChecked={app_col.is_weixin_share ? true : false} onChange={this.onChange.bind(this,'is_weixin_share')} style={{float:'right',marginTop:'6px'}}/>
            </div>
            <h4 className="ml_25 mt_20">微信分享</h4>
            <div className="mt_20">
                <FormItem                   
                    label="APP ID："
                    labelCol={{ span:4}}
                    wrapperCol={{ span:9 }}>
                    <Input onChange={this.onChange.bind(this,'weixin_id')} disabled={!app_col.is_weixin_share} defaultValue={app_col.weixin_id} />
                </FormItem>
                <FormItem
                 
                  label="APP SECRET："
                  labelCol={{ span:4}}
                  wrapperCol={{ span:9 }}>
                  <Input  defaultValue={app_col.weixin_secret}  onChange={this.onChange.bind(this,'weixin_secret')} disabled={!app_col.is_weixin_share}  />
                </FormItem>
                <p className="desP" style={{marginBottom:50}}>用于您的客户端分享功能，若关闭或未配置，会造成您的客户端分享功能无法使用，请前往微信开放平台申请。点击查看申请流程</p>
            </div>
          </section>
          <div className="baseUpdataTip" style={{"display": this.state.is_updata}}>
            <p>
                <Icon type="exclamation-circle" className="baseUpdataTipIcon"/>
                本页信息已经修改,需重新打包生成APP  
                <Button type="primary" size="small" className="baseUpdatedBtn" htmlType="submit">点击生成APP</Button>
            </p>
          </div>
        </Form>

        <Modal title={this.state.modalTitle} visible={this.state.visible}
          onOk={this.handleOk} onCancel={this.handleCancel} footer={[]}>
              {this.state.modalCon}
          </Modal>
      </div>
    );
  }
});

Base = Form.create()(Base);

export default  Base;







