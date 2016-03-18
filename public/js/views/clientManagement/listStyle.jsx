import React, { Component } from 'react'

import 'antd/style/index.less'
import '../../../css/base.less'
import '../../../css/clientManagement.less'
import { Menu, Icon,Button,Tabs,Alert,Table,Row, Col,Upload,Modal,Slider,InputNumber} from 'antd'
import PointTo from './pointTo'
import ListType from './listType'
import CONFIG from '../../config/API'

const ListStyle = React.createClass({
  getInitialState() {
    return {
      current: 'base',
      index : 0,
      visible: false,
      content_list : 'l',
      pointToLineWidth:{'user':0,'defPic':0,'comments':0},
      pointToAllWidth: {'user':0,'defPic':0,'comments':0},
      data : {
          "content_list_banner":'0',"content_list":"1"
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
          pointToLineWidth: {'sliderNum':100,'listType':105},
          pointToAllWidth:  {'sliderNum':135,'listType':130}
        })
      }.bind(this),1000)
     $.get(CONFIG.HOSTNAME+'/client/list',function(ajaxdata){
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
    var content_list = this.state.data.content_list;
        content_list = content_list=='1' ?  'list_l' : 'list_r'
    var bgColor = {
      backgroundColor:_this.props.bgColor,
      backgroundImage:"url(/images/"+content_list+".png)"
    }
    let sliderNum = parseInt( this.state.data.content_list_banner );
    return (
      <div>
        <div className="mt_30 allStyle" id="listStyle">

            <div style={{height:'120px'}} className="pointTo_1"> 
              <PointTo lineWidth={this.state.pointToLineWidth.sliderNum} allWidth={this.state.pointToAllWidth.sliderNum}  button="幻灯片数量 : " fun={this.pointToFun} name="defPic" />
            </div>
            
            <div style={{height:'120px'}} className="pointTo_2"> 
              <PointTo lineWidth={this.state.pointToLineWidth.listType} allWidth={this.state.pointToAllWidth.listType}  button="列表默认样式" fun={this.pointToFun} name="listType"/>
            </div>
            <div className="listStyle_r">
                <div className="listStyle_r_con" style={bgColor} >
                </div>
            </div>

            <div className="sliderNum">
              <div className="row">
                <div className="col-13" style={{marginTop:32}}>
                  <Slider min={1} max={5} onChange={this.onChange} value={sliderNum} step={1} />
                </div>
                <div className="col-2" style={{marginLeft:-10}}>
                  <InputNumber min={1} max={5} style={{ marginLeft: '10px' }}
                    value={this.state.data.content_list_banner} onChange={this.onChange} />
                </div>  
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

export default  ListStyle;
