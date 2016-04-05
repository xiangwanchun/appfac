import React, { Component } from 'react'

import 'antd/style/index.less'
import '../../../../css/base.less'
import '../../../../css/clientManagement.less'
import { Menu, Icon,Button,Tabs,Alert,Table,Row, Col,Modal} from 'antd'
import PointTo from '../pointTo'
import SloganSet from './sloganSet'
import CONFIG from '../../../config/API'

const AboutUs = React.createClass({
  getInitialState() {
    return {
      current: 'base',
      index : 0,
      content_show : 1,
      pointToLineWidth:{'detailPage':0},
      pointToAllWidth: {'detailPage':0},
      loading: false,
      data : {
                content_show : ''
             }
    };
  },
  pageTypeFun(type){
      let data = this.state.data;
      data.content_show = type ;
      this.setState({
          data
      })
  },
  //标题图片处理函数
  titleFun(val){
    let data = this.state.data;
    data.slogan = val;
    this.setState({ 
      "visible": false,
      "data": data,
    });
  },
  childComponentsThis: '',
  //弹窗子组件this
  childComponentsThisFun(childrenThis){
    this.childComponentsThis = childrenThis;
  },
  handleClick(e) {
        clientManagement
  },
  pointToFun(name,expand){  
    if(name == 'slogan'){
        this.setState({
          visible: true,
          allPointToType:name,
          modalTitle : '宣传口号设置',
          modalCon : <SloganSet bgColor={this.props.bgColor} childComponentsThis={this.childComponentsThisFun} />
        })
    }
  },
  handleCancel(e) {
    this.setState({
      visible: false
    });
  },
  //提交弹窗时验证表单
  handleSubmit() {

    let _this = this.childComponentsThis;
    let data = this.state.data;
    
    _this.props.form.validateFields((errors, values) => {

        if (!!errors) {
          return;
        }
        this.titleFun(values.slogan);
    });

  },
  //向后台提交数据
  ajaxhandSubmit(){
    //处理数据content_list_title 如果是json处理成逗号分隔
    this.setState({ loading: true });
    let data = this.state.data;
    
    $.post(CONFIG.HOSTNAME+'/client/slogan',data,function(ajaxdata){
      ajaxdata = JSON.parse(ajaxdata);
      this.setState({ loading: false });
      if(!ajaxdata.state){
          Modal.error({
            title: '错误提示',
            content: '保存失败'
          });
      }else{
          Modal.success({
            title: '成功提示',
            content: '详细页样式设置成功'
          });
      }
      
    }.bind(this))
  },    
  render() {
    var _this = this;
    var content_show = this.state.data.content_show;
        content_show = content_show == '1' ?  'page_1' : 'page_2'
    var bgColor = {
      backgroundColor:'red'
    }
    console.log(this.state.data);
    return (
      <div className="mt_30 allStyle" id="aboutSet">          
          <div style={{height:'120px'}} className="pointTo_1"> 
            <PointTo lineWidth={this.state.pointToLineWidth.detailPage} allWidth={this.state.pointToAllWidth.detailPage}  button="设置宣传口号" fun={this.pointToFun} name="slogan"/>
          </div>
          <div className="aboutSet_r">
              <div className="aboutSet_r_con" style={bgColor} >
              </div>
              <div className="slogan">{this.state.data.slogan}</div>
          </div>

          <div>
            <Row type="flex" justify="center" style={{marginTop:15}}>
              <Col span="5">
                <div className="">
                    <Button type="primary" size="large" onClick={this.ajaxhandSubmit}>确认修改</Button>
                </div>
              </Col>
            </Row>
          </div>
          <Modal title={this.state.modalTitle} visible={this.state.visible}
            onOk={this.handleSubmit} onCancel={this.handleCancel} width='700'>
                {this.state.modalCon}
          </Modal>
          
      </div>
    );
  },
  componentDidMount() {
    setTimeout(function(){
        this.setState({
          pointToLineWidth: {'detailPage':130},
          pointToAllWidth:  {'detailPage':165}
        })
      }.bind(this),1000)
    var _this = this;
    $.get(CONFIG.HOSTNAME+'/client/slogan',function(ajaxdata){
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

export default  AboutUs;
