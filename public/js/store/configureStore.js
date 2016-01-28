const React = require('react');
const { applyMiddleware, compose, createStore, combineReducers } = require('redux');
const { Router, Route, IndexRoute } = require('react-router');
const createHistory = require('history/lib/createHashHistory');
const { syncHistory, routeReducer } = require('react-router-redux');
const reactThunk = require('redux-thunk');
const reducer = require('../reducers');
const localStore_middleware = require('../middleware/localStore_middleware');
const createLogger = require('redux-logger');
const logger = createLogger();

// let initialState = window.__INITIAL_STATE__ ? window.__INITIAL_STATE__ : {};
let initialState = require('../config/initialState');

const history = createHistory();

const reduxRouterMiddleware = syncHistory(history);


const finalCreateStore = compose(
  applyMiddleware(reduxRouterMiddleware),
  applyMiddleware(reactThunk),
  applyMiddleware(localStore_middleware),
  // applyMiddleware(logger),
)(createStore);
const store = finalCreateStore(reducer, initialState);
reduxRouterMiddleware.listenForReplays(store);


export default store








