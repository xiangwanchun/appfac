import React, { Component } from 'react'

import 'antd/style/index.less'
import '../../../css/base.less'
import '../../../css/clientManagement.less'
import { Menu, Icon,Button,Tabs,Alert,Table,Row, Col,Modal} from 'antd'
import PointTo from './pointTo'
import DetailPageType from './detailPageType'

const DetailPage = React.createClass({
  getInitialState() {
    return {
      current: 'base',
      index : 0,
      content_show : 1,
      pointToLineWidth:{'detailPage':0},
      pointToAllWidth: {'detailPage':0},
      data : {
                content_show : 2
             }
    };
  },
  pageTypeFun(type){
    console.log(type);
      this.setState({
          content_show : type
      })
  },
  handleClick(e) {
        clientManagement
  },
  pointToFun(name,expand){  
    if(name == 'detailPageType'){
        this.setState({
          visible: true,
          allPointToType:name,
          modalTitle : '内容查看页样式',
          modalCon : <DetailPageType bgColor={this.props.bgColor} fun={this.pageTypeFun} content_show={this.state.data.content_show} />
        })
    }
  },
  componentDidMount() {
     setTimeout(function(){
        this.setState({
          pointToLineWidth: {'detailPage':130},
          pointToAllWidth:  {'detailPage':165}
        })
      }.bind(this),1000)
  },
  handleCancel(e) {
    this.setState({
      visible: false
    });
  },
  //提交弹窗时验证表单
  handleSubmit() {
    
    let name = this.state.allPointToType;
    let data = this.state.data;
    if(name == 'detailPageType'){
      data.content_show = this.state.content_show;
      this.setState({ 
        "visible": false,
        "data":data
      });
    }
  },
  render() {
    var _this = this;
    var bgColor = {
      backgroundColor:_this.props.bgColor
    }
    return (
      <div className="mt_30 allStyle" id="detailPage">          
          <div style={{height:'120px'}} className="pointTo_1"> 
            <PointTo lineWidth={this.state.pointToLineWidth.detailPage} allWidth={this.state.pointToAllWidth.detailPage}  button="内容查看页样式" fun={this.pointToFun} name="detailPageType"/>
          </div>
          <div className="detailPage_r">
              <div className="detailPage_r_con" style={bgColor} >
              </div>
          </div>
          <Modal title={this.state.modalTitle} visible={this.state.visible}
            onOk={this.handleSubmit} onCancel={this.handleCancel} width='700'>
                {this.state.modalCon}
          </Modal>
          
      </div>
    );
  }
});

export default  DetailPage;
