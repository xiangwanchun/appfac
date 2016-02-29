import React, { Component } from 'react'
import { render } from 'react-dom'

import 'antd/style/index.less'
/*import 'antd/style/themes/default/custom.less'*/
import '../css/base.less'
import '../css/clientManagement.less'
import { Row, Col} from 'antd'
import { Menu, Icon , Button } from 'antd'
import MainNav from './components/mainNav'
import LeftNav from './components/leftNav'
import VersionHistory from './views/clientManagement/VersionHistory'
import { Router, Route, Link, browserHistory,RouteHandler,IndexRoute} from 'react-router'
import Index from './index';
import About from './views/clientManagement/about';
import clientManagement from './views/clientManagement/index';
import Interactive from './views/interactive/index';
import Content from './views/content/index';

// etc.
const Main = React.createClass({
   render(){
      return (
        <div className="main">
            <MainNav></MainNav>
             {this.props.children}
        </div>
      )
  }
})

const MainRouter = React.createClass({
  render() {
    return (
      <div>
         <Router history={browserHistory}>
            <Route path="/" component={Main}>
              <IndexRoute name="index" component={Index}/>
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
            </Route>
        </Router>
      </div>
    )
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
