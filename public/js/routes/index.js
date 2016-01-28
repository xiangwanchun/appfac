import React from 'react'
import { Router } from 'react-router'
const createHistory = require('history/lib/createHashHistory');

const history = createHistory();

const routeConfig = {
  path: '/',
  component: require('../App'),
  indexRoute: { component: require('../views/index/IndexPage') },
  childRoutes: [
  ]
}

export default <Router history={history} routes={routeConfig} />

