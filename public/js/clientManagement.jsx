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
import { Router, Route, Link, browserHistory,RouteHandler} from 'react-router'

// etc.
const App = React.createClass({
   render(){
      return (
        <div className="main">
          <nav>
            <Link to="about">图书</Link>
            <Link to="user1">电影</Link>
          </nav>
             {this.props.children}
        </div>
      )
  }
})
const About = React.createClass({
  render() {
    return (
      <div>
        <h1>About</h1>
      </div>
    )
  }
})
const Users = React.createClass({
  render() {
    return (
      <div>
        <h1>Users</h1>
        <div className="master">
          测试成功
        </div>

      </div>
    )
  }
})

const User = React.createClass({

  render() {
    return (
      <div>
        <h2>22222233333333</h2>
      </div>
    )
  }
})

// Declarative route configuration (could also load this config lazily
// instead, all you really need is a single root route, you don't need to
// colocate the entire config).
render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="about" name="about" component={About}/>
      <Route path="users" name="users" component={Users}>
      </Route>
      <Route path="/users/:id" name="user1" component={User}/>
      
    </Route>
  </Router>
), document.getElementById('root'))



export default  App;
