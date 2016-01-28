import { combineReducers } from 'redux'
const { routeReducer } = require('react-router-redux');

import test from './test_reduce'

const rootReducer = combineReducers({
	routing: routeReducer,
	test: test,
})

export default rootReducer