import React, { Component } from 'react'

import 'antd/style/index.less'
import '../../../css/base.less'
import '../../../css/clientManagement.less'
import { Menu, Icon,Button,Tabs,Alert,Table,Row,Col,message} from 'antd'
import 'ztree'
import '../../plug/ztree/css/zTreeStyle/zTreeStyle.css'
const TabPane = Tabs.TabPane;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
var setting = {
      view: {
        dblClickExpand: false
      },
      callback: {
        onRightClick: OnRightClick
      }
    };

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
function OnRightClick(event, treeId, treeNode) {
    curTreeNode = treeNode;
   
  if (!treeNode && event.target.tagName.toLowerCase() != "button" && $(event.target).parents("a").length == 0) {
    zTree.cancelSelectedNode();

    showRMenu("root", 150, 200);
  } else if (treeNode && !treeNode.noR) {
     var position = $("#"+treeNode.tId).position()
    zTree.selectNode(treeNode);
    showRMenu("node", position.left+100, position.top);
  }
}

function showRMenu(type, x, y) {
   message.info('这是一条普通的提醒');
  console.log('#######################');
  console.log(type);
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

  $("body").bind("mousedown", onBodyMouseDown);
}
function hideRMenu() {
  if (rMenu) rMenu.css({"visibility": "hidden"});
  $("body").unbind("mousedown", onBodyMouseDown);
}
function onBodyMouseDown(event){
  if (!(event.target.id == "rMenu" || $(event.target).parents("#rMenu").length>0)) {
    rMenu.css({"visibility" : "hidden"});
  }
}
var addCount = 1;
function addTreeNode() {
  console.log(curTreeNode);
  hideRMenu();
  var newNode = { name:"增加" + (addCount++)};
  if (zTree.getSelectedNodes()[0]) {
    alert(111);
    newNode.checked = zTree.getSelectedNodes()[0].checked;
    zTree.addNodes(zTree.getSelectedNodes()[0], newNode);
  } else {

    zTree.addNodes(null, newNode);
  }
}
function removeTreeNode() {
  hideRMenu();
  var nodes = zTree.getSelectedNodes();
  if (nodes && nodes.length>0) {
    if (nodes[0].children && nodes[0].children.length > 0) {
      var msg = "要删除的节点是父节点，如果删除将连同子节点一起删掉。\n\n请确认！";
      if (confirm(msg)==true){
        zTree.removeNode(nodes[0]);
      }
    } else {
      zTree.removeNode(nodes[0]);
    }
  }
}
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

var zTree, rMenu;

const ClientManagementMenu = React.createClass({
  getInitialState() {
    return {
      current: 'base'
    };
  },
  componentDidMount(){   

     $(document).ready(function(){
      $.fn.zTree.init($("#treeDemo"), setting, zNodes);
      zTree = $.fn.zTree.getZTreeObj("treeDemo");
      rMenu = $("#rMenu");
      var bodyHeight = $(window).outerHeight();
      $('#treeDemo').css('height',bodyHeight-112);
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
                    <li id="m_add" onClick={addTreeNode}>增加节点</li>
                    <li id="m_del" onClick={removeTreeNode}>删除节点</li>
                  </ul>
                </div>
            </Col>
            <Col span="18">
            </Col>
          </Row>
      </div>
    );
  }
});

export default  ClientManagementMenu;
