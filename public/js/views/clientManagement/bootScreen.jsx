import React, { Component } from 'react'

import 'antd/style/index.less'
import '../../../css/base.less'
import '../../../css/clientManagement.less'
import { Menu, Icon,Button,Tabs,Alert,Table,Row, Col,Upload,message,Modal} from 'antd';
import CONFIG from '../../config/API'
const TabPane = Tabs.TabPane;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const BootScreen = React.createClass({
  getInitialState() {
    return {
      current: 'base',
      data : ''
    };
  },
  handleClick(e) {
        clientManagement
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
          /*data[name] = info.file.response.data.src;
          this.setState({
              data
          })*/
        }else{
          var errorsDes = typeof info.file.response.error.description;
          alert(errorsDes)
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
  handSubmit(){

  },
  render() {
    //文件上传处理
    const _this = this;
    const starting = {
              name: 'file',
              action: '/factory/upload',
              listType:"text" ,
              onChange(info) {
                  _this.uploadChange('starting',info);              
              }
            };
    return (
      <div className="mt_30" id="bootScreenmain" >
        <Row type="flex" justify="space-around" align="middle">
          <Col span="9">
            <div className="bootScreen_l">

            </div>
          </Col>
          <Col span="15">
            <div className="bootScreen_r">
                <p>
                  <label>自定义开机画面: </label>
                  图标要求:png格式,1024x1024
                </p>
                <div className="mt_15">
                  <Upload {...starting} data={{"type" :'starting'}} >
                    <Button type="primary">
                       点击上传
                    </Button>
                  </Upload>
                </div>
            </div>  
          </Col>
        </Row>
        <Row type="flex" justify="center" style={{marginTop:15}}>
          <Col span="5">
            <div className="">
                <Button type="primary" size="large" onClick={this.handSubmit}>确认并发布</Button>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
});

export default  BootScreen;
