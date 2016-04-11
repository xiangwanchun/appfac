import React, { Component } from 'react'
import 'antd/style/index.less'
import '../../../css/base.less'
import '../../../css/clientManagement.less'
import { Form, Input, Checkbox, Radio, Switch,Slider, Button, Row, Col, Upload, Icon,Tooltip,Tabs,Menu, Modal,message} from 'antd';
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
      packState : {},
      data :  {
                "app_collocation": {
                    "id": "1",
                    "name": "",
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
                    "starting_img": "",
                    "is_push" : 0,
                    "is_weixin_share" : 0,
                    "guide_img": [
                        "/upload/guide_img1",
                        "/upload/guide_img2"
                    ],
                    "is_comment": "1",
                    "loading_img": "",
                    "weixin_secret": "",
                    "weixin_id": "",
                    "slogan": "这&lt;是一 个A“ PP‘的宣'传标语",
                    "statement": "这”是A&amp;P&lt;P的免&quot;责声'明"
                },
                "bundle_id": "",
                "android_sign": "",
                "callback": ""
            },
      subData : '',//提交给后台的数据
      data1 : { state: 'true', data: {ios: '', android: '', description: "开始打包"},'error' : {'code' : '2010'}},
      isFirst : true //判断是否是首次加载
    }
    
  },
  ajaxfun(timer){
      var subData = this.state.subData;
      subData.rand =  Math.random(); 
      subData.tenantid = tenantid[0];
      $.post(CONFIG.HOSTNAME+'/client/base',this.state.subData,function(ajaxdata){

      ajaxdata = JSON.parse(ajaxdata);
      
      if(!ajaxdata.state){

        if(ajaxdata.error.code == '2010'){//重复打包和打包失败
          
        }else if(ajaxdata.error.code == '3010'){
          Modal.error({
            title: '错误提示',
            content: `${ajaxdata.error.description}`
          });
          clearInterval(timer);
        }
        else{
          Modal.error({
            title: '错误提示',
            content: '请检查信鸽或者微信分享信息是否完整'
          });
        }
          
      }else{//打包成功

        let packState = this.state.packState;
        if(ajaxdata.data.ios){//IOS平台都打包完成

          packState.ios = true;
          this.setState({
              packState,
          })
          
        }


        if(ajaxdata.data.android){//android平台都打包完成

          packState.android = true;
          this.setState({
              packState
          })

        }

        if(packState.ios || packState.android){

          var data = {
              percent_ios : packState.ios,
              percent_android:  packState.android
          }

          this.setState({
              visible: true,
              allPointToType:'123',
              modalTitle : '打包进度',
              modalCon : <PackProgress  fun={this.packfun} {...data} />
          })

        }

        if(ajaxdata.data.ios && ajaxdata.data.android){//2个平台都打包完成
          clearInterval(timer)
        }

      }  

      }.bind(this) );

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
                   name:"11",
                   weixin_id:"",
                   weixin_secret:"",
                   version : ''

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
         data
      })
    }
  },
  handleCancel(e) {
    this.setState({
      visible: false
    });
  },
  //统计表单字数
  inputNum(name, rule, value, callback) {
    console.log(1111);
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
            content: `${info.file.name} ${info.file.response.error.description}`
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

          let data = this.state.data;
          ajaxdata = JSON.parse(ajaxdata);
          if(ajaxdata.state){
            data = ajaxdata.data.meta;
            this.setState({
              data,
              nameNum : data.app_collocation.name.length
            })
            setTimeout(function(){
              console.log(22222);
                 $('#name').val(data.app_collocation.name);
            }, 300)
           
          }  
      }.bind(this));
 
  },
  render() {
    console.log(333);
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
   /* var aa =app_col.is_push ? true : false;
    const testProps = getFieldProps('test', {
       validate: [{
        rules: [
          { required: aa ,message: '请输入APP名11111'},
        ],
        trigger: ['onBlur', 'onChange'],
      }]
    });*/

    const url = CONFIG.DONAME + app_col.icon;
    console.log(app_col.name);
    return (
      <div className="contentBlocks mt_30" style={{width:'100%','borderColor':'transparent'}}>
        <Form horizontal form={this.props.form} onSubmit={this.handleSubmit}>
          <section id="appInformation">
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
                              <Input  {...nameProps}/>
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

                          <FormItem
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
                    </div>
                  </div>
            </div>
          </section>
        </Form>
      </div>
    );
  }
});

Base = Form.create()(Base);

export default  Base;







