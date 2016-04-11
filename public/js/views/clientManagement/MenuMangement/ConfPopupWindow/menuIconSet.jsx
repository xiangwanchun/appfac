import React, { Component } from 'react'

import 'antd/style/index.less'
import '../../../../../css/base.less'
import '../../../../../css/clientManagement.less'
import CONFIG from '../../../../config/API'

import { Icon,Button,Row,Col,Upload,Radio,Form,Input,message,Modal} from 'antd'
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;



let MenuIconSet = React.createClass({
  getInitialState() {
    return {
      current: 'base',
      titleInputComponent : 'text',
      data : ''
    };
  },
  componentWillMount(){
    //加载时获得数据
    let data = this.props;
    this.setState({
      data
    })
  },
  componentWillReceiveProps(nextProps){
    //更新时获得数据
    let data = this.props;
    this.setState({
      data
    })
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
      if (info.file.status !== 'uploading') {
        /*console.log(info.file, info.fileList);*/
      }
      if (info.file.status === 'done'){
        if(info.file.response.state){
          message.success(`${info.file.name} 上传成功。`);
          var data = this.state.data;
          /*this.props.titleFun({type:2,content:info.file.response.data.src})*/
          this.props.icon[name] = info.file.response.data.src;
          this.setState({
              data
          })
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
    let data = this.state.data;
    console.log(data);
   /* var url = this.props.config.DONAME+(this.props.content_title.type == '2' ? this.props.content_title.content : '');*/
    const menuIconOn = {
              name: 'file',
              action: '/factory/upload',
              listType:"text" ,
              onChange(info) {
                  _this.uploadChange('on',info);              
              }
            };
    const menuIconUn = {
              name: 'file',
              action: '/factory/upload',
              listType:"text" ,
              onChange(info) {
                  _this.uploadChange('un',info);              
              }
            };
    return (
            <div className="titleSetWrap">
                {/*<RadioGroup  defaultValue="text">
                  <RadioButton value="text" onClick={this.handClick.bind(this,'text')}>文本</RadioButton>
                  <RadioButton value="pic" onClick={this.handClick.bind(this,'pic')}>图标</RadioButton>
                </RadioGroup>*/}

                <Row>
                  <Col span='5' className="colFormItem">
                    普通状态 :
                  </Col>
                  <Col span='19'>
                  
                      <div className='NavBerImg'>
                          <div className='UpImg'>
                           <img src={CONFIG.DONAME+ data.icon.un} title="导航图标"/>
                          </div>
                          
                        </div>
                        <div className='NavBerInstr'>
                          <span className='Details1'>图标要求 PNG格式 ，60x60</span>
                          <span className='Details2'>图标制作示例</span>
                          <div className='chosebtn'>
                            <Upload {...menuIconUn} data={{"type" :'icon','tenantid':tenantid[0]}} >
                                        <Button type="primary">
                                           点击上传
                                        </Button>
                                     </Upload>
                          </div>   
                        </div>  
                    
                  </Col>
              </Row>

              <Row>
                <Col span='5' className="colFormItem">
                  选中状态 :
                </Col>
                <Col span='19'>
                
                    <div className='NavBerImg'>
                        <div className='UpImg'>
                         <img src={CONFIG.DONAME+ data.icon.on} title="导航图标"/>
                        </div>
                        
                      </div>
                      <div className='NavBerInstr'>
                        <span className='Details1'>图标要求 PNG格式 ，60x60</span>
                        <span className='Details2'>图标制作示例</span>
                        <div className='chosebtn'>
                          <Upload {...menuIconOn} data={{"type" :'icon'}} >
                              <Button type="primary">
                                 点击上传
                              </Button>
                           </Upload>
                        </div>   
                      </div>  
                  
                </Col>
              </Row>

            </div>
          );
    }
    
});

export default  MenuIconSet;

