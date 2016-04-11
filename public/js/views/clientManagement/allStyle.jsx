import React, { Component } from 'react'

import 'antd/style/index.less'
import '../../../css/base.less'
import '../../../css/clientManagement.less'
import { Menu, Icon,Button,Tabs,Alert,Table,Row, Col,Upload,Modal,message} from 'antd'
import LeftDrawer from './leftDrawer'
import UpDownColumn from './upDownColumn'
import DoubleSideDrawer from './doubleSideDrawer'
import ChooseUserSet from './chooseUsersSet'
import DefPicSet from './defPicSet'
import TitleSet from './titleSet'
import '../../plug/jquery.SuperSlide.2.1.1.js'
import CONFIG from '../../config/API'
const TabPane = Tabs.TabPane;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const AllStyle = React.createClass({
  getInitialState() {
    return {
      current: 'base',
      index : 0,
      colors :['#c90505','#ff6633','#37ab31','#2ebdab','#0bb8f4','#0a78cd','#000'],
      pointToLineWidth :[0],
      pointToAllWidth :[0],
      title : '左抽屉',
      //当前页
      curPage : '',
      //总页数
      allPage : 3,
      visible: false,
      is_member : '',
      menberType : '0',
      //弹窗名
      modalTitle : '',
      //模型内容
      modalCon : '',
      //判断是哪个箭头函数触发的
      allPointToType : '',
      content_title : '',
      config : CONFIG,
      loading: false,
      data :{
              "color":"red","content_list_title":{'type':1,'content':'标题'},"frame":1,"is_member":0,'is_comment': 0,'loading_img' :''
            }

    };
  },
  //RGB 转换成 #开头的16进制
  RGBToHex(rgb){ 
     var regexp = /[0-9]{0,3}/g;  
     var re = rgb.match(regexp);//利用正则表达式去掉多余的部分，将rgb中的数字提取
     var hexColor = "#"; 
     var hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];  
     for (var i = 0; i < re.length; i++) {
          var r = null, c = re[i], l = c; 
          var hexAr = [];
          while (c > 16){  
                r = c % 16;  
                c = (c / 16) >> 0; 
                hexAr.push(hex[r]);  
           } hexAr.push(hex[c]);
           if(l < 16&&l != ""){        
               hexAr.push(0)
           }
         hexColor += hexAr.reverse().join(''); 
      }  
     //alert(hexColor)  
     return hexColor;  
  },
  //颜色切换处理函数
  handleClick(event) {
    let data = this.state.data;
    data.color = this.RGBToHex( event.target.style.backgroundColor ); 
    this.setState({
      data  : data
    })    
  },
  componentWillMount(){
    this.setState({
      index : this.state.index++
    })
  },
  componentDidMount() {
    var _this = this;

    $.get(CONFIG.HOSTNAME+'/client/frame',{'tenantid':tenantid[0]},function(ajaxdata){
          /*console.log(ajaxdata);*/
          let data = this.state.data;
          ajaxdata = JSON.parse(ajaxdata);
          if(ajaxdata.state){
            data = ajaxdata.data.meta;
            this.setState({
              data
            })
          }  

          setTimeout(function(){
            $(".focusBox_"+_this.state.index).slide({ mainCell:".pic",effect:"left",delayTime:300,defaultIndex:_this.state.data.frame-1,endFun:function(i,c){
              var title = ['上下栏','左抽屉','左右抽屉'];
              let data = _this.state.data;
              data.frame = i+1;
              //设置名字,当前页,和选择的类型
              _this.setState({
                title : title[i],
                curPage : (i+1),
                allPage : c,
                /*data : data,*/
                content_title : data.content_list_title
              })

          } });
          },500);
          
      }.bind(this));
      

    

  },
  //箭头指向处理函数
  allPointToFun(name,expand){
    if(name == 'member'){
        this.setState({
          visible: true,
          allPointToType:name,
          modalTitle : '用户中心/基础设置',
          modalCon : <ChooseUserSet {...this.state.data} memberFun={this.memberFun} />
        })
    }else if(name == 'defPic'){
        this.setState({
          visible: true,
          allPointToType:name,
          modalTitle : '默认图片设置',
          modalCon : <DefPicSet {...this.state.data} childComponentsThis={this.childComponentsThisFun} fun={this.defPicFun}/>
        })
    }else if(name == 'title'){
        this.setState({
          visible: true,
          allPointToType:name,
          modalTitle : '标题样式',
          modalCon : <TitleSet {...this.state} childComponentsThis={this.childComponentsThisFun} titleFun ={this.titleFun} />
        })
    }else if(name == 'comments'){
      var data = this.state.data;

      data.is_comment = expand.val ? '1' : '0';
      this.setState({ 
        "data":data
      });
    }
  },
  handleCancel(e) {
    this.setState({
      visible: false
    });
  },
  //用户中心处理函数
  memberFun(type){
    this.setState({
        "is_member" : type
    })
  },
  //默认图处理函数
  defPicFun(src){
    let data = this.state.data;
    data.loading_img = src;
    this.setState({
      loading_img : src
    })
  },
  //标题图片处理函数
  titleFun(obj){
    let data = this.state.data;
    data.content_list_title = obj;
    this.setState({ 
      "visible": false,
      "data": data,
       content_title : obj
    });
  },
  childComponentsThis: '',
  //弹窗子组件this
  childComponentsThisFun(childrenThis){
      this.childComponentsThis = childrenThis;
  },
  //提交弹窗时验证表单
  handleSubmit() {
    let name = this.state.allPointToType;//取出时哪个箭头函数触发的
    let _this = this.childComponentsThis;
    let data = this.state.data;
    
    if(name == 'member'){//用户中心
      data.is_member = this.state.is_member;
      this.setState({ 
        "visible": false,
        "data":data
      });

    }else if(name == 'defPic'){//默认图片
      this.setState({ 
        "visible": false,
      });
    }else if(name == 'title'){//标题
      _this.props.form.validateFields((errors, values) => {

          if (!!errors) {
            return;
          }
          this.titleFun({type:1,content:values.title});
      });

      
    }
  }, 
  //向后台提交数据
  handleSubmitAjax(){
    //处理数据content_list_title 如果是json处理成逗号分隔
    this.setState({ loading: true });
    let data = this.state.data;
     if(typeof data.content_list_title == 'object' ){
        data.content_list_title = data.content_list_title.type+','+data.content_list_title.content;
     }

     data.tenantid = tenantid[0];
     
    $.post(CONFIG.HOSTNAME+'/client/frame',data,function(ajaxdata){
      ajaxdata = JSON.parse(ajaxdata);
      this.setState({ loading: false });
      if(!ajaxdata.state){
          Modal.error({
            title: '错误提示',
            content: '请检查相关信息是否填完整'
          });
      }else{
          Modal.success({
            title: '成功提示',
            content: '总体样式设置成功'
          });
      }
      
    }.bind(this))
  },    
  render(){
    var name = "focusBox focusBox_"+this.state.index;
    var options = [];
      for (var option in this.state.colors) {
          options.push(
            <Col span="3" key={option}><span className="defColor_choose"  style={{backgroundColor:this.state.colors[option]}}  onClick={this.handleClick}></span></Col>
            )
      };
    return (

      <div className="mt_30">
        <Row>
          <Col span="14"><p className="styleName"> {this.state.title}<span className="ml_5">{this.state.curPage} / {this.state.allPage}</span> </p></Col>
          <Col span="10">
            <Row style={{width:280}} className="defColor" type="flex" justify="space-around">
              {options}
            </Row>
          </Col>
        </Row>
        <div className={name}>
            <ul className="pic">
                <li>
                  <UpDownColumn {...this.state.data} fun={this.allPointToFun} content_title={this.state.content_title} />
                </li>
                <li>
                  <LeftDrawer {...this.state.data} fun={this.allPointToFun}/>
                </li>
                <li>
                  <DoubleSideDrawer {...this.state.data} fun={this.allPointToFun} />
                </li>
            </ul>
            <a className="prev" href="javascript:void(0)"><Icon type="left"/></a>
            <a className="next" href="javascript:void(0)"><Icon type="right"/></a>
        </div>
        <Row type="flex" justify="center" style={{marginTop:15}}>
          <Col span="5">
            <div className="">
                <Button type="primary" size="large" onClick={this.handleSubmitAjax} loading={this.state.loading} >确认选择样式</Button>
            </div>
          </Col>
        </Row>

         <Modal title={this.state.modalTitle} visible={this.state.visible}
          onOk={this.handleSubmit} onCancel={this.handleCancel} width='700'>
              {this.state.modalCon}
          </Modal>

      </div>
    );
  }
});

export default  AllStyle;

