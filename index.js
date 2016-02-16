// require('es5-shim');
// require('es5-shim/es5-sham');
// require('console-polyfill');
require('es6-promise');
// require('fetch-ie8');
// require('core-js/fn/object/assign');
// require('html5shiv');
// require('html5shiv/dist/html5shiv-printshiv');
// var JSON = require('json3');

import React from 'react'
import ReactDOM from 'react-dom'

import  MainRouter from './public/js/app'

ReactDOM.render(
	<MainRouter/>
, document.getElementById('root') );