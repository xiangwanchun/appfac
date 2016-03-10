import React, { Component } from 'react'

import 'antd/style/index.less'
import '../../../css/base.less'
import '../../../css/clientManagement.less'
import { Menu, Icon,Button,Tabs,Alert,Table,Row,Col,message,Modal} from 'antd'
import 'ztree'
import '../../plug/ztree/css/zTreeStyle/zTreeStyle.css'
import CONFIG from '../../config/API'
const TabPane = Tabs.TabPane;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const confirm = Modal.confirm;
var zNodes =[
  {id:1, name:"无右键菜单 1", open:true, 
    children:[
         {id:11, name:"节点 1-1", noR:true},
         {id:12, name:"节点 1-2", noR:true}

    ]},
  {id:2, name:"右键操作 2", open:true,
    children:[
         {id:21, name:"节点 2-1"},
         {id:22, name:"节点 2-2"},
         {id:23, name:"节点 2-3"},
         {id:24, name:"节点 2-4"}
    ]},
  {id:3, name:"右键操作 3", open:true,
    children:[
         {id:31, name:"节点 3-1"},
         {id:32, name:"节点 3-2"},
         {id:33, name:"节点 3-3"},
         {id:34, name:"节点 3-4"}
    ]}
  ];
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

const ClientManagementMenu = React.createClass({
  getInitialState() {
    return {
      current: 'base',
      visible: false,
      setting : {
                  view: {
                    dblClickExpand: false
                  },
                  callback: {
                    onRightClick: this.OnRightClick/*,
                    onClick: OnClick*/
                  }
                }
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
  addTreeNode() {//添加节点
    this.hideRMenu();

    this.setState({
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
    var newNode = {};
    if (zTree.getSelectedNodes()[0]) {

      if(curTreeNode.level == '0'){
        $.post(CONFIG.HOSTNAME+'/navigate',{category :1,pid:curTreeNode.nid},function(ajaxdata){
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
      
      $.post(CONFIG.HOSTNAME+'/navigate',{category :1},function(ajaxdata){
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
            <Col span="6">
                <ul id="treeDemo" className="ztree" style={{width:160,background:'#f8f8f8'}}></ul>
                <div id="rMenu">
                  <ul>
                    <li id="m_add" onClick={this.addTreeNode}>增加节点</li>
                    <li id="m_del" onClick={this.removeTreeNode}>删除节点</li>
                  </ul>
                </div>
            </Col>
            <Col span="18">
            </Col>
          </Row>
          <Modal title="第一个 Modal" visible={this.state.visible}
          onOk={this.handleOk} onCancel={this.handleCancel}>
            <p>对话框的内容</p>
            <p>对话框的内容</p>
            <p>对话框的内容</p>
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
