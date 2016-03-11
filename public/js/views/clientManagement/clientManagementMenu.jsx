import React, { Component } from 'react'

import 'antd/style/index.less'
import '../../../css/base.less'
import '../../../css/clientManagement.less'
import { Menu, Icon,Button,Tabs,Alert,Table,Row,Col,message,Modal} from 'antd'
import 'ztree'
import '../../plug/ztree/css/zTreeStyle/zTreeStyle.css'
import CONFIG from '../../config/API'
import MenuType from './menu/menuType'
import Menuall from './MenuMangement/Menuall';
const TabPane = Tabs.TabPane;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const confirm = Modal.confirm;

var curTreeNode;

function checkTreeNode(checked) {
  var nodes = zTree.getSelectedNodes();
  if (nodes && nodes.length>0) {
    zTree.checkNode(nodes[0], checked, true);
  }
  hideRMenu();
}
function resetTree() {
  hideRMenu();
  $.fn.zTree.init($("#treeDemo"), setting, zNodes);
}

var zTree, rMenu, addCount;

var menuprops={
        "id": "",
        "admin_id": "",
        "version": "",
        "name": "",
        "sname": "",
        "icon": [
            "/upload/icon/navigate/default.png",
            "/upload/icon/navigate/default_on.png"
        ],
        "children": "3,4",
        "pid": "0",
        "category": "2",
        "catid": "1635",
        "model": "0",
        "end_time": "0",
        "navigate_id": "7,3",
        "banner": "",
        "tip": "",
        "order_by": "0",
        "created_at": "2016-02-03 11:37:17",
        "updated_at": "2016-02-26 17:27:45",
        "modelName": [
            "所有"
        ],
        "catname": [],
        "categoryName": "精华",
        "navigate_id_name": [
            "纪录",
            "海报大图"
        ],
        "style": [],
        "catalog_selected": [
            {
                "id": "30469",
                "name": "单位简介1"
            },
            {
                "id": "31025",
                "name": "广播专栏2"
            },

        ],
        "catalog_unselected": [
            {
                "id": "3046",
                "name": "单位简介"
            },
            {
                "id": "3102",
                "name": "广播专栏"
            },
            {
                "id": "3103",
                "name": "广播栏目"
            }
            
        ],
        "model_unselected": [
          {
                "id": "31",
                "name": "海报大图"
            },
            {
                "id": "7",
                "name": "纪录"
            }
        ],
        "model_selected": [
          {
                "id": "3",
                "name": "海报大图1"
            },
            {
                "id": "72",
                "name": "纪录2"
            }
        ],
        "navigate_selected": [
            {
                "id": "3",
                "name": "海报大图"
            },
            {
                "id": "7",
                "name": "纪录"
            }
        ],
        "navigate_unselected": {
            "id": "6",
            "name": "新闻"
        },
        "app_navigate_style": null
}

const ClientManagementMenu = React.createClass({
  getInitialState() {
    return {
      current: 'base',
      visible: false,
      modelId : '',
      menuType : <MenuType fun={this.menuTypeFun}/>,
      setting : {
                  view: {
                    dblClickExpand: false
                  },
                  callback: {
                    onRightClick: this.OnRightClick,
                    onClick: this.OnClick
                  }
                },
      navigateData : ''

    };
  },
  hideRMenu() {
    if (rMenu) rMenu.css({"visibility": "hidden"});
    $("body").unbind("mousedown", this.onBodyMouseDown);
  },
  OnRightClick(event, treeId, treeNode){
    curTreeNode = treeNode;

    if (!treeNode && event.target.tagName.toLowerCase() != "button" && $(event.target).parents("a").length == 0) {
      zTree.cancelSelectedNode();

      this.showRMenu("root", 50, 200);
    } else if (treeNode && !treeNode.noR) {
       var position = $("#"+treeNode.tId).position()
      zTree.selectNode(treeNode);
      this.showRMenu("node", position.left+50, position.top);
    }
  },
  showRMenu(type, x, y) {
    /* message.info('这是一条普通的提醒');
    console.log('#######################');
    console.log(type);*/
    $("#rMenu ul").show();
    if (type=="root") {
      $("#m_del").hide();
      $("#m_check").hide();
      $("#m_unCheck").hide();
    } else {
      $("#m_del").show();
      $("#m_check").show();
      $("#m_unCheck").show();
    }
    rMenu.css({"top":y+"px", "left":x+"px", "visibility":"visible"});

    $("body").bind("mousedown", this.onBodyMouseDown);
  },
  onBodyMouseDown(event){
    if (!(event.target.id == "rMenu" || $(event.target).parents("#rMenu").length>0)) {
      rMenu.css({"visibility" : "hidden"});
    }
  },
  menuTypeFun(modelId){
      this.setState({
        modelId
      })
  },
  OnClick(event, treeId, treeNode){

    $.get(CONFIG.HOSTNAME+'/navigate/'+treeNode.nid,function(ajaxdata){
       
          let navigateData = this.state.navigateData;
          ajaxdata = JSON.parse(ajaxdata);
          if(ajaxdata.state){
            navigateData = ajaxdata.data;
            this.setState({
              navigateData
            })
          }  
      }.bind(this));

  },
  addTreeNode() {//添加节点
    this.hideRMenu();
    this.setState({
      modelId : '',
      visible: true
    });
    
  },
  removeTreeNode() {//删除菜单
    this.hideRMenu();
    var nodes = zTree.getSelectedNodes();
    
    
    if (nodes && nodes.length>0) {
      
      if (nodes[0].children && nodes[0].children.length > 0) {
        
        var msg = "要删除的节点是父节点，如果删除将连同子节点一起删掉。\n\n请确认！";

        confirm({
            title: '删除导航',
            content: '真的需要删除该父导航吗?如果删除将连同子节点一起删掉',
            onOk() {
              $.ajax({
                  type: "delete",
                  url: CONFIG.HOSTNAME+'/navigate/'+nodes[0].nid,
                  success: function(ajaxdata){
                    ajaxdata = JSON.parse(ajaxdata);
                    if(ajaxdata.state){
                      zTree.removeNode(nodes[0]);
                     }else{
                        Modal.error({
                          title: '错误提示',
                          content: '删除导航失败'
                        });
                     }
                   }
                })
            },
            onCancel() {}
          });

      } else {
        confirm({
            title: '删除导航',
            content: '真的需要删除该导航吗?',
            onOk() {
              $.ajax({
                  type: "delete",
                  url: CONFIG.HOSTNAME+'/navigate/'+nodes[0].nid,
                  success: function(ajaxdata){
                    ajaxdata = JSON.parse(ajaxdata);
                    if(ajaxdata.state){
                      zTree.removeNode(nodes[0]);
                     }else{
                        Modal.error({
                          title: '错误提示',
                          content: '删除导航失败'
                        });
                     }
                   }
                })
            },
            onCancel() {}
          });
      }

    }
  },
  handleOk(){
    console.log(this.state.modelId);
    if(!this.state.modelId){
      Modal.error({
        title: '错误提示',
        content: '请选择导航分类'
      });
      return;
    }

    var newNode = {};
    if (zTree.getSelectedNodes()[0]) {

      if(curTreeNode.level == '0'){
        $.post(CONFIG.HOSTNAME+'/navigate',{category : this.state.modelId,pid:curTreeNode.nid},function(ajaxdata){
            ajaxdata = JSON.parse(ajaxdata);
            if(ajaxdata.state){
              newNode.name = ajaxdata.data.meta.name;
              newNode.nid = ajaxdata.data.meta.id;
              zTree.addNodes(curTreeNode, newNode);
            }else{
              Modal.error({
                title: '错误提示',
                content: '添加导航失败'
              });
            }  
        }.bind(this));
      }else{
         Modal.error({
          title: '错误提示',
          content: 'APP菜单最多为2级'
        });
      }

    } else {  
      
      $.post(CONFIG.HOSTNAME+'/navigate',{category :this.state.modelId},function(ajaxdata){
            ajaxdata = JSON.parse(ajaxdata);
            if(ajaxdata.state){
              newNode.name = ajaxdata.data.meta.name;
              newNode.nid = ajaxdata.data.meta.id;
              zTree.addNodes(null, newNode);
            }  
        }.bind(this));
    }
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

    return (

      <div className="contentBlocks mt_30" id="clientMenuCon">
          <Row>
            <Col span="5">
                <ul id="treeDemo" className="ztree" style={{width:180,background:'#f8f8f8'}}></ul>
                <div id="rMenu">
                  <ul>
                    <li id="m_add" onClick={this.addTreeNode}>增加节点</li>
                    <li id="m_del" onClick={this.removeTreeNode}>删除节点</li>
                  </ul>
                </div>
            </Col>
            <Col span="18">
              <div style={{width:400}}>
                <Menuall data = {menuprops/*this.state.navigateData == '' ? menuprops :  this.state.navigateData*/}/>
              </div>
            </Col>
          </Row>
          <Modal title="选择导航类型" visible={this.state.visible} 
          onOk={this.handleOk} onCancel={this.handleCancel} width="1000">
            {this.state.menuType}
          </Modal>
      </div>
    );
  },
  componentDidMount(){
    $.get(CONFIG.HOSTNAME+'/navigate',function(ajaxdata){

          ajaxdata = JSON.parse(ajaxdata);
          if(ajaxdata.state){

            $.fn.zTree.init($("#treeDemo"), this.state.setting, ajaxdata.data.navigate);
            zTree = $.fn.zTree.getZTreeObj("treeDemo");
            rMenu = $("#rMenu");
            var bodyHeight = $(window).outerHeight();
            $('#treeDemo').css('height',bodyHeight-112);

          }  

      }.bind(this));
   
  }
});

export default  ClientManagementMenu;
