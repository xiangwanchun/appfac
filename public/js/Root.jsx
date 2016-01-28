import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import routes from './routes'

import store from './store/configureStore'


const Root = (
	<div>
	    <Provider store={store}>
	      {routes}
	    </Provider>
	<div>
  );

export default Root;