import React, { Component } from 'react'

import 'antd/style/index.less'
import '../../../css/base.less'
import '../../../css/clientManagement.less'
import { Menu, Icon,Button,Tabs,Alert,Table,Row, Col,Upload,Modal,Slider,InputNumber} from 'antd'
import PointTo from './pointTo'
import ListType from './listType'
import CONFIG from '../../config/API'

const Model = React.createClass({
  getInitialState() {
    return {
      current: 'base',
      index : 0,
      visible: false,
      content_list : 'l',
      pointToLineWidth:{'user':0,'defPic':0,'comments':0},
      pointToAllWidth: {'user':0,'defPic':0,'comments':0},
      data : {
          "content_list_banner":5,"content_list":"1"
       }
    };
  },
  handleClick(e) {
        clientManagement
  },
  listTypeFun(type){
      this.setState({
          content_list : type
      })
  },
  pointToFun(name,expand){
    
    if(name == 'listType'){
        this.setState({
          visible: true,
          allPointToType:name,
          modalTitle : '总体列表样式',
          modalCon : <ListType bgColor={this.props.bgColor} fun={this.listTypeFun} content_list={this.state.data.content_list} />
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
    let name = this.state.allPointToType;
    let data = this.state.data;
    if(name == 'listType'){
      data.content_list = this.state.content_list;
      this.setState({ 
        "visible": false,
        "data":data
      });
    }
  },
  onChange(value) {
    let data = this.state.data;
    data.content_list_banner = value ;
    this.setState({
      data : data
    });
  },
  componentDidMount() {
     setTimeout(function(){
        this.setState({
          pointToLineWidth: {'specialStyle':280,'vedioStyle':255,'linkStyle':250,'graphicStyle':230,'liveStyle':270,'atlasStyle':230},
          pointToAllWidth:  {'specialStyle':340,'vedioStyle':315,'linkStyle':310,'graphicStyle':290,'liveStyle':330,'atlasStyle':290}
        })
      }.bind(this),1000)
  },
  ajaxhandSubmit(){
    $.post(CONFIG.HOSTNAME+'/client/list',this.state.data,function(ajaxdata){
          /*console.log(ajaxdata);*/
          let data = this.state.data;
          ajaxdata = JSON.parse(ajaxdata);
          if(ajaxdata.state){
              Modal.success({
                title: '成功信息',
                content: `恭喜您!列表样式设置成功。`
              });
          }else{
              Modal.error({
                title: '失败消息',
                content: `列表样式保存失败`
              });
          }  
      }.bind(this));
  },
  render() {

    console.log(this.state.data);
    var _this = this;
    var bgColor = {
      backgroundColor:_this.props.bgColor
    }
    return (
      <div>
        <Alert message="这里设置的是内容模型的默认样式,您可以在导航配置中,对各导航页面内容呈现进行自定义设置" type="info" showIcon />
        <div className="mt_30 allStyle" id="modelStyle">

            <div style={{height:'90px'}} className="pointTo_1"> 
              <PointTo lineWidth={this.state.pointToLineWidth.specialStyle} allWidth={this.state.pointToAllWidth.specialStyle}  button="专题样式" fun={this.pointToFun} name="specialStyle"  pos="right"/>
              <div className="stylePic"></div>
            </div>
            
            <div style={{height:'90px'}} className="pointTo_2"> 
              <PointTo lineWidth={this.state.pointToLineWidth.vedioStyle} allWidth={this.state.pointToAllWidth.vedioStyle}  button="视屏样式" fun={this.pointToFun} name="vedioStyle" pos="right"/>
              <div className="stylePic"></div>
            </div>
            <div style={{height:'90px'}} className="pointTo_3"> 
              <PointTo lineWidth={this.state.pointToLineWidth.linkStyle} allWidth={this.state.pointToAllWidth.linkStyle}  button="链接样式" fun={this.pointToFun} name="linkStyle"  pos="right"/>
              <div className="stylePic"></div>
            </div>
            
            <div style={{height:'90px'}} className="pointTo_4"> 
              <PointTo lineWidth={this.state.pointToLineWidth.graphicStyle} allWidth={this.state.pointToAllWidth.graphicStyle}  button="图文样式" fun={this.pointToFun} name="graphicStyle"/>
              <div className="stylePicl"></div>
            </div>
            <div style={{height:'90px'}} className="pointTo_5"> 
              <PointTo lineWidth={this.state.pointToLineWidth.liveStyle} allWidth={this.state.pointToAllWidth.liveStyle}  button="直播样式" fun={this.pointToFun} name="liveStyle" />
              <div className="stylePicl" style={{right:'-329px' }}></div>
            </div>
            
            <div style={{height:'90px'}} className="pointTo_6"> 
              <PointTo lineWidth={this.state.pointToLineWidth.atlasStyle} allWidth={this.state.pointToAllWidth.atlasStyle}  button="图集样式" fun={this.pointToFun} name="atlasStyle"/>
              <div className="stylePicl"></div>
            </div>
            <div className="modelStyle_r">
                <div className="modelStyle_r_con" style={bgColor} >
                </div>
            </div>
            

            <Modal title={this.state.modalTitle} visible={this.state.visible}
            onOk={this.handleSubmit} onCancel={this.handleCancel} width='700'>
                {this.state.modalCon}
            </Modal>
            
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
      </div>
    );
  }
});

export default  Model;
