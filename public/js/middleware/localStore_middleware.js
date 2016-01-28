import store from 'storejs';
export default function callTraceMiddleware ({dispatch,getState}){
    return next=> action =>{
        next(action);
        let state = getState();
        
        store('state', JSON.stringify(state));
    }
}