import React from 'react'
import { Link } from 'react-router'
import { Row, Col, Button, Icon } from 'antd'

import './indexPage.less'

const IndexPage = React.createClass({
	getInitialState() {
    return {
      loading: false,
      iconLoading: false,
    };
  },
	componentWillReceiveProps(nextProps){

	},
  render() {
  	const {
  		ReduxState,
  		actions
  	} = this.props;
		return <div className="sobey-layout-index">
                  <Button type="primary" size="large" loading={false} onClick={actions.test}>
                    test
                  </Button>
                  {ReduxState ? ReduxState.test.msg : null}
			    </div>
  }
});

export default IndexPage;