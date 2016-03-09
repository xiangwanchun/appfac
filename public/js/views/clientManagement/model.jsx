import React, { Component } from 'react'

import 'antd/style/index.less'
import '../../../css/base.less'
import '../../../css/clientManagement.less'
import { Menu, Icon,Button,Tabs,Alert,Table,Row, Col,Upload,Modal,Slider,InputNumber} from 'antd'
import PointTo from './pointTo'
import ModelType from './model/ModelType'
import CONFIG from '../../config/API'

const Model = React.createClass({
  getInitialState() {
    return {
      current: 'base',
      index : 0,
      visible: false,
      content_list : 'l',
      allPointToType : '',
      pos :  '',
      pointToLineWidth:{'user':0,'defPic':0,'comments':0},
      pointToAllWidth: {'user':0,'defPic':0,'comments':0},
      data : {

      },
      styles : {}
    };
  },
  handleClick(e) {
        clientManagement
  },
  ModelTypeFun(type){
    let pos = this.state.pos;
    let data = this.state.data;
    let  index = 'content_list_' + this.state.allPointToType;
    data[index].id= type;
    data[index].img[pos]= this.state.styles[this.state.allPointToType][type].img[pos];
    this.setState({
        data
    })

  },
  pointToFun(name,expand){
    var styles = this.state.styles[name];
    
    if(name == 'images'){
      this.setState({
        visible: true,
        allPointToType:name,
        modalTitle : '图集样式',
        modalCon : <ModelType bgColor={this.props.bgColor} fun={this.ModelTypeFun} content_list={this.state.data.content_list} {this.state} />
      })
    }else if(name == 'img_text'){
      this.setState({
        visible: true,
        allPointToType:name,
        modalTitle : '图文样式',
        modalCon : <ModelType bgColor={this.props.bgColor} fun={this.ModelTypeFun} content_list={this.state.data.content_list} {this.state}/>
      })
    }else if(name == 'link'){
      this.setState({
        visible: true,
        allPointToType:name,
        modalTitle : '链接样式',
        modalCon : <ModelType bgColor={this.props.bgColor} fun={this.ModelTypeFun} content_list={this.state.data.content_list} {this.state}/>
      })
    }else if(name == 'live'){
      this.setState({
        visible: true,
        allPointToType:name,
        modalTitle : '直播样式',
        modalCon : <ModelType bgColor={this.props.bgColor} fun={this.ModelTypeFun} content_list={this.state.data.content_list} {this.state}/>
      })
    }else if(name == 'special'){
      this.setState({
        visible: true,
        allPointToType:name,
        modalTitle : '专题样式',
        modalCon : <ModelType bgColor={this.props.bgColor} fun={this.ModelTypeFun} content_list={this.state.data.content_list} {this.state}/>
      })
    }else if(name == 'video'){
      this.setState({
        visible: true,
        allPointToType:name,
        modalTitle : '直播样式',
        modalCon : <ModelType bgColor={this.props.bgColor} fun={this.ModelTypeFun} content_list={this.state.data.content_list} {this.state}/>
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
    this.setState({
      visible: false
    });
  },
  onChange(value) {
    let data = this.state.data;
    data.content_list_banner = value ;
    this.setState({
      data : data
    });
  },
  ajaxhandSubmit(){
    $.post(CONFIG.HOSTNAME+'/client/model',this.state.data,function(ajaxdata){
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
    let data = this.state.data;
    let pos = data.content_list;
    let bgPics = {
      content_list_special : '',
      content_list_video : '',
      content_list_link : '',
      content_list_img_text : '',
      content_list_live : '',
      content_list_images : '',
    };
    let bgPic;
    let url;
    for( let key in data){
      if( key == 'content_list'){
        continue;
      }else if(key == ''){
        break;
      }
      url = "url("+ CONFIG.DONAME +data[key].img[pos] +")";
      bgPic = {
                    backgroundImage: url
                  }
      bgPics[key] = {};
      bgPics[key].img= bgPic;
      bgPics[key].name= data[key].name;
    }    
    return (
      <div>
        <Alert message="这里设置的是内容模型的默认样式,您可以在导航配置中,对各导航页面内容呈现进行自定义设置" type="info" showIcon />
        <div className="mt_30 allStyle" id="modelStyle">

            <div style={{height:'90px'}} className="pointTo_1"> 
              <PointTo lineWidth={this.state.pointToLineWidth.specialStyle} allWidth={this.state.pointToAllWidth.specialStyle}  button={'专题样式 : '+ bgPics.content_list_special.name} fun={this.pointToFun} name="special"  pos="right"/>
              <div className="stylePic" style={bgPics.content_list_special.img}></div>
            </div>
            
            <div style={{height:'90px'}} className="pointTo_2"> 
              <PointTo lineWidth={this.state.pointToLineWidth.videoStyle} allWidth={this.state.pointToAllWidth.videoStyle}  button={'视屏样式 : '+ bgPics.content_list_video.name} fun={this.pointToFun} name="video" pos="right"/>
              <div className="stylePic" style={bgPics.content_list_video.img}></div>
            </div>
            <div style={{height:'90px'}} className="pointTo_3"> 
              <PointTo lineWidth={this.state.pointToLineWidth.linkStyle} allWidth={this.state.pointToAllWidth.linkStyle}  button={'链接样式 : '+ bgPics.content_list_link.name} fun={this.pointToFun} name="link"  pos="right"/>
              <div className="stylePic" style={bgPics.content_list_link.img}></div>
            </div>
            
            <div style={{height:'90px'}} className="pointTo_4"> 
              <PointTo lineWidth={this.state.pointToLineWidth.graphicStyle} allWidth={this.state.pointToAllWidth.graphicStyle}  button={'图文样式 : '+ bgPics.content_list_img_text.name} fun={this.pointToFun} name="img_text"/>
              <div className="stylePicl" style={bgPics.content_list_img_text.img}></div>
            </div>
            <div style={{height:'90px'}} className="pointTo_5"> 
              <PointTo lineWidth={this.state.pointToLineWidth.liveStyle} allWidth={this.state.pointToAllWidth.liveStyle}  button={'直播样式 : '+ bgPics.content_list_live.name} fun={this.pointToFun} name="live" />
              <div className="stylePicl stylePicl_1" style={bgPics.content_list_live.img}></div>
            </div>
            
            <div style={{height:'90px'}} className="pointTo_6"> 
              <PointTo lineWidth={this.state.pointToLineWidth.atlasStyle} allWidth={this.state.pointToAllWidth.atlasStyle}  button={'图集样式 : '+ bgPics.content_list_images.name} fun={this.pointToFun} name="images"/>
              <div className="stylePicl" style={bgPics.content_list_images.img}></div>
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
  },
  componentDidMount(){
     setTimeout(function(){
        this.setState({
          pointToLineWidth: {'specialStyle':280,'videoStyle':255,'linkStyle':250,'graphicStyle':230,'liveStyle':270,'atlasStyle':230},
          pointToAllWidth:  {'specialStyle':340,'videoStyle':315,'linkStyle':310,'graphicStyle':290,'liveStyle':330,'atlasStyle':290}
        })
      }.bind(this),1000);
     $.get(CONFIG.HOSTNAME+'/client/model',function(ajaxdata){
          /*console.log(ajaxdata);*/
          let data = this.state.data;
          ajaxdata = JSON.parse(ajaxdata);
          if(ajaxdata.state){
            data = ajaxdata.data.meta;
            this.setState({
              data,
              styles : ajaxdata.data.styles,
              pos : ajaxdata.data.meta.content_list
            })
          }  
      }.bind(this));

      
  },
});

export default  Model;
