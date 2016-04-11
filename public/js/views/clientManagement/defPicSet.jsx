import React, { Component } from 'react'

import 'antd/style/index.less'
import '../../../css/base.less'
import '../../../css/clientManagement.less'
import { Icon,Button,Row,Col,Upload,Modal,message} from 'antd'

const DefPicSet = React.createClass({
  getInitialState() {
    return {
      current: 'base',
      index : 0,
      dada : {
        defPic : ''
      }
    };
  },
  //上传变换的时候
  uploadChange(name,info){
      if (info.file.status !== 'uploading') {
        /*console.log(info.file, info.fileList);*/
      }
      if (info.file.status === 'done'){
        if(info.file.response.state){
          message.success(`${info.file.name} 上传成功。`);
          /*var data = this.state.data;
          data[name] = info.file.response.data.src;
          this.setState({
              data
          })*/
           this.props.fun(info.file.response.data.src);
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
    var _this = this;
    var bgColor = {
      backgroundColor:_this.props.bgColor
    };
    //文件上传处理
    const defPic = {
              name: 'file',
              action: '/factory/upload',
              listType:"text" ,
              onChange(info) {
                  _this.uploadChange('defPic',info);              
              }
            };

    return (
      <div className="t_center">
          <Upload {...defPic} data={{"type" :'default',tenantid : tenantid[0]}}>
            <Button type="primary" size="large">
              <Icon type="upload" /> 点击上传默认图
            </Button>
          </Upload> 
      </div>
    );
  }
});

export default  DefPicSet;
