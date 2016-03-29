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
      data : {
            "starting_img": "/upload/starting_img"
        },
      fileList : ''
    };
  },
  handleClick(e) {
        clientManagement
  },
  //上传变换的时候
  uploadChange(name,info){
    let fileList = info.fileList;

    // 1. 上传列表数量的限制
    //    只显示最近上传的一个，旧的会被新的顶掉
    fileList = fileList.slice(-2);

    // 2. 读取远程路径并显示链接
    fileList = fileList.map((file) => {
      if (file.response) {
        // 组件会将 file.url 作为链接进行展示
        file.url = file.response.url;
      }
      return file;
    });

    // 3. 按照服务器返回信息筛选成功上传的文件
    fileList = fileList.filter((file) => {
      if (file.response) {
        return file.response.status === 'success';
      }
      return true;
    });
    this.setState({ fileList });

      if (info.file.status !== 'uploading') {
        /*console.log(info.file, info.fileList);*/
      }
      if (info.file.status === 'done'){
        if(info.file.response.state){
          message.success(`${info.file.name} 上传成功。`);
          var data = this.state.data;
          data[name] = info.file.response.data.src;
          this.setState({
              data
          })
        }else{
          var errorsDes = typeof info.file.response.error.description;
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
    $.post(CONFIG.HOSTNAME+'/client/starting',{starting_img : this.state.data.starting_img},function(ajaxdata){
          /*console.log(ajaxdata);*/
          let data = this.state.data;
          ajaxdata = JSON.parse(ajaxdata);
          if(ajaxdata.state){
              Modal.success({
                title: '成功信息',
                content: `恭喜您!开屏图设置成功。`
              });
          }else{
              Modal.error({
                title: '开屏图设置失败',
                content: `${info.file.name} 上传失败。`
              });
          }  
      }.bind(this));
  },
  render() {
    //文件上传处理
    const _this = this;
    const starting = {
              name: 'file',
              action: '/factory/upload',
              onChange(info) {
                  _this.uploadChange('starting_img',info);              
              }
            };
    let url2 = CONFIG.DONAME+ this.state.data.starting_img;
    let style2 ={
      'backgroundImage':'url('+url2+')'
    }
    return (
      <div className="mt_30" id="bootScreenmain" >
        <Row type="flex" justify="space-around" align="middle">
          <Col span="9">
            <div className="bootScreen_l">
                <div className="starting_img" style={style2}></div>
            </div>
          </Col>
          <Col span="15">
            <div className="bootScreen_r">
                <p>
                  <label>自定义开机画面: </label>
                  图标要求:png格式,1080x1920
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
  },
  componentDidMount(){
     
     $.get(CONFIG.HOSTNAME+'/client/starting',function(ajaxdata){
          /*console.log(ajaxdata);*/
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

export default  BootScreen;
