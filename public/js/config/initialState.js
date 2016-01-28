import store from 'storejs';
let initialState = {
	
}

initialState = store.get('state') ? JSON.parse(store.get('state')) : initialState;

export default initialState;