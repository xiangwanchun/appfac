import React, { Component } from 'react'
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import * as actions from './actions'
import { Link } from 'react-router'
import { QueueAnim } from 'antd'
import 'antd/style/index.less'
import '../css/base.less'

class App extends Component {
  constructor(props){
    super(props);
  }
  componentWillMount(){

  }
  componentDidMount(){
    
  }
  render() {    
    const { 
      ReduxState, 
      actions, 
      children,
      routeActions,
      location
    } = this.props;
		return <QueueAnim type={['top', 'bottom']}>
              {
                React.cloneElement(children, {
                  ReduxState,
                  actions,
                  routeActions,
                  location
                })
              }
           </QueueAnim>
  }
  componentWillReceiveProps(nextProps){
    
  }
}

function mapStateToProps(state) {
  return {
    ReduxState: state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
    routeActions: bindActionCreators(routeActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
