import React, { Component } from 'react'
import { render } from 'react-dom'

import 'antd/style/index.less'
/*import 'antd/style/themes/default/custom.less'*/
import '../css/base.less'
import '../css/clientManagement.less'
import { Row, Col} from 'antd'
import { Menu, Icon , Button ,Modal } from 'antd'
import MainNav from './components/mainNav'
import LeftNav from './components/leftNav'
import VersionHistory from './views/clientManagement/VersionHistory'
import { Router, Route, Link, browserHistory,RouteHandler,IndexRoute} from 'react-router'
import Index from './index'
import About from './views/clientManagement/about'
import clientManagement from './views/clientManagement/index'
import Interactive from './views/interactive/index'
import Content from './views/content/index'
import Statistics from './views/statistics/index'
import GuidePage from './views/guidePage/index'
import CONFIG from './config/API'  

// etc.
const Main = React.createClass({
   render(){
      return (
        <div className="main">
            <MainNav states="1"></MainNav>
            {this.props.children}
        </div>
      )
  }
})

const MainRouter = React.createClass({
  getInitialState() {
    return {
      current: 'index',
      UpdataTip : '',
      states: '0'
    }
  },
  componentDidMount(){
    var _this = this ;
    $(function(){
      let url = location.href.split('//')[1].split('.');   
      var urlparam = _this.GetRequest();
      if(!urlparam){
        Modal.error({
            title: '登陆失败',
            content: `请检查用户登陆信息`
          });
        return;
      }
      urlparam.tenant_id = url[0];   
      urlparam.rand = Math.random(); 

      $.get(CONFIG.HOSTNAME,urlparam,function(ajaxdata){
            let data = _this.state.data;
            ajaxdata = JSON.parse(ajaxdata);
            data = ajaxdata.data;
            if(ajaxdata.state){
              _this.setState({
                data,
                states : '1'
              })
            }else{
              Modal.error({
                title: '登陆失败',
                content: `请检查用户信息`
              });
              _this.setState({
                states : '0'
              })
            }  
      });
    })
  },//获取url中get参数的值
  GetRequest() {
    if(location.href.indexOf('?') == -1){
      return;
    }
    var url = location.href.split('?')[1].split('#')[0]; //获取url中"?"符后"#"前的字串 
    var theRequest = new Object();
    var str = url;
    var strs;
    if (str.indexOf("&") != -1) {
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    } else {
        theRequest[str.split("=")[0]] = unescape(str.split("=")[1]);
    }
    return theRequest;
  },
  render() {
      if(this.state.states == '1'){
        return (
          <div>
             <Router history={browserHistory}>
                <Route path="/" component={Main}>
                  <IndexRoute name="index" component={ this.state.data.status == 1  ?  GuidePage : Index }/>
                  <Route path="clientmanagement" name="clientmanagement" component={clientManagement}>
                      <Route path=":name" component={clientManagement}/>
                  </Route>
                  <Route path="appInformation" name="appInformation" component={clientManagement}>
                      <Route path=":name" component={clientManagement}/>
                  </Route>
                  <Route path="pushConfiguration" name="pushConfiguration" component={clientManagement}>
                      <Route path=":name" component={clientManagement}/>
                  </Route>
                  <Route path="shareConfiguration" name="shareConfiguration" component={clientManagement}>
                      <Route path=":name" component={clientManagement}/>
                  </Route>

                  <Route path="interactive" name="interactive" component={Interactive}>
                      <Route path=":name" component={Interactive}/>
                  </Route>
                  <Route path="content" name="content" component={Content}>
                      <Route path=":name" component={Content}/>
                  </Route>  
                  <Route path="statistics" name="statistics" component={Statistics}>
                      <Route path=":name" component={Statistics}/>
                  </Route>          
                </Route>
            </Router>
          </div>
        )
    }else{
      return(<div></div>);
    }
  }
})

  /*
  <Route path="/base" name="base" component={clientManagementBase}/>
  <Route path="/style" name="style" component={clientManagementStyle}/>
  <Route path="/menu" name="menu" component={clientManagementMenu}/>*/

/*<Menu onClick={this.handleClick}
        style={{ width: 170 ,marginTop : 30,paddingBottom:9999999999,marginBottom:-9999999999,overflow:'hidden'}}
        selectedKeys={[this.state.current]}
        mode="inline">
        <Menu.Item key="base">
          <Link to="clientManagement/base">基础配置</Link>
        </Menu.Item>
        <Menu.Item key="style">
          <Link to="clientManagement/style">风格配置</Link>
        </Menu.Item>
        <Menu.Item key="menu">
          <Link to="clientManagement/menu">菜单配置</Link>
        </Menu.Item>
        <Menu.Item key="about">
          <Link to="clientManagement/about">关于</Link>
        </Menu.Item>
        <Menu.Item key="version">
          <Link to="clientManagement/version">版本管理</Link>
        </Menu.Item>
      </Menu>*/

  /*<Route path="content" name="content" component={Content}/>
            
            <Route path="statistics" name="statistics" component={statistics}/>*/

// Declarative route configuration (could also load this config lazily
// instead, all you really need is a single root route, you don't need to
// colocate the entire config).
/*render((
    <Router history={browserHistory}>
        <Route path="/" component={Main}>
          <Route path="index" name="index" component={App}/>
          <Route path="clientManagement" name="clientManagement" component={ClientManagement}/>
          <Route path="content" name="content" component={Content}/></Route>
          <Route path="interactive" name="interactive" component={Content}/>
          <Route path="statistics" name="statistics" component={Content}/>
        </Route>
    </Router>
), document.getElementById('root'))*/

export default  MainRouter;
