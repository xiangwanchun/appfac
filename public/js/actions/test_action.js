import { TEST_TYPE } from '../constants'
import fetch from 'isomorphic-fetch'
import {
	API_TEST
} from '../config/API'

// 同步
export function test(){
	return { type: TEST_TYPE.TEST }
}

// 异步
function requestPosts() {
  return {
    type: TEST_TYPE.REQUEST_POSTS,
    isFetching: true
  }
}

function receivePosts(json) {
  return {
    type: TEST_TYPE.RECEIVE_POSTS,
    isFetching: false,
    data: json
  }
}

export function fetchPosts(id) {
  return function (dispatch) {
  	dispatch(requestPosts())
		return fetch(API_TEST)
      .then(response => response.json())
      .then(json =>
        dispatch(receivePosts(json))
      )
  }
}

