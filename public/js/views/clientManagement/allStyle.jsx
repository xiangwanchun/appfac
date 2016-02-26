import React, { Component } from 'react'

import 'antd/style/index.less'
import '../../../css/base.less'
import '../../../css/clientManagement.less'
import { Menu, Icon,Button,Tabs,Alert,Table,Row, Col,Upload,Modal} from 'antd'
import LeftDrawer from './leftDrawer'
import UpDownColumn from './upDownColumn'
import DoubleSideDrawer from './doubleSideDrawer'
import ChooseUser from './chooseUsers'
import '../../plug/jquery.SuperSlide.2.1.1.js'
const TabPane = Tabs.TabPane;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const AllStyle = React.createClass({
  getInitialState() {
    return {
      current: 'base',
      index : 0,
      colors :['#4546cd','#21ae37','#e60111','#000','#8a8a8a'],
      bgColor : this.props.bgColor || '#4546cd',
      pointToLineWidth :[0],
      pointToAllWidth :[0],
      title : '左抽屉',
      curPage : '',
      visible: false,
      //弹窗名
      modalTitle : '',
      //模型内容
      modalCon : ''
    };
  },
  //颜色切换处理函数
  handleClick(event) {

    this.setState({
      bgColor : event.target.style.backgroundColor
    })
    
  },
  componentWillMount(){
    this.setState({
      index : this.state.index++
    })
  },
  componentDidMount() {
    var _this = this;
    $(".focusBox_"+this.state.index).slide({ mainCell:".pic",effect:"left",delayTime:300,defaultIndex:0,startFun:function(i,c){
        var title = ['左抽屉','上下栏','左右抽屉'];
        _this.setState({
          title : title[i],
          curPage : (i+1)+"/"+c
        })
    } });
  },
  //箭头指向处理函数
  allPointToFun(name,expand){
    console.log(name)
    if(name == 'users'){
        this.setState({
          visible: true,
          modalTitle : '用户中心/基础设置',
          modalCon : <ChooseUser bgColor={this.state.bgColor} />
        })
    }else if(name == 'defPic'){
        this.setState({
          visible: true,
          modalTitle : '默认图片设置',
          modalCon : <ChooseUser bgColor={this.state.bgColor} />
        })
    }else if(name == 'title'){

    }

  },
  handleOk() {
    this.setState({
      visible: false
    });
  },
  handleCancel(e) {
    console.log(e);
    this.setState({
      visible: false
    });
  },
  render() {
    var name = "focusBox focusBox_"+this.state.index;
    var options = [];
      for (var option in this.state.colors) {
          options.push(
            <Col span="4" key={option}><span className="defColor_choose"  style={{backgroundColor:this.state.colors[option]}}  onClick={this.handleClick}></span></Col>
            )
      };
    return (

      <div className="mt_30">
        <Row>
          <Col span="14"><p className="styleName"> {this.state.title}<span className="ml_5">{this.state.curPage}</span> </p></Col>
          <Col span="10">
            <Row style={{width:220}} className="defColor" type="flex" justify="space-around">
              {options}
            </Row>
          </Col>
        </Row>
        <div className={name}>
            <ul className="pic">
                <li>
                  <LeftDrawer bgColor={this.state.bgColor} fun={this.allPointToFun}/>
                </li>
                <li>
                  <UpDownColumn bgColor={this.state.bgColor} fun={this.allPointToFun} />
                </li>
                <li>
                  <DoubleSideDrawer bgColor={this.state.bgColor} fun={this.allPointToFun} />
                </li>
            </ul>
            <a className="prev" href="javascript:void(0)"><Icon type="left"/></a>
            <a className="next" href="javascript:void(0)"><Icon type="right"/></a>
        </div>

         <Modal title={this.state.modalTitle} visible={this.state.visible}
          onOk={this.handleOk} onCancel={this.handleCancel} width='700'>
              {this.state.modalCon}
          </Modal>

      </div>
    );
  }
});

export default  AllStyle;

