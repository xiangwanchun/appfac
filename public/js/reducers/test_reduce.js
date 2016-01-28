import { TEST_TYPE } from '../constants'

export default function test(state={}, action) {
    switch (action.type){
        case TEST_TYPE.TEST:
           return Object.assign({}, state, {
            msg: '测试'
          })
        case TEST_TYPE.REQUEST_POSTS:
           return Object.assign({}, state, {
            isFetching: action.isFetching
          })
        case TEST_TYPE.RECEIVE_POSTS:
           return Object.assign({}, state, {
            isFetching: action.isFetching,
            data: action.data
          })

        default:
            return state
    }
}