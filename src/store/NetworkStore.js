import {createAction} from 'redux-actions'

const MAKE_NETWORK_REQUEST = "MAKE_NETWORK_REQUEST";
const NETWORK_REQUEST_SUCCESS = "RECEIVE_NETWORK_REQUEST";
const NETWORK_REQUEST_FAILURE = "NETWORK_REQUEST_FAILURE";

export const makeNetworkRequest = createAction(MAKE_NETWORK_REQUEST);
export const receiveNetworkRequest = createAction(NETWORK_REQUEST_SUCCESS);
export const networkRequestFailure = createAction(NETWORK_REQUEST_FAILURE, (error)=>error)

export const networkState = (state, action) => {
	switch(action.type){		
		case MAKE_NETWORK_REQUEST:
		return {
			...state,
			loading: true
		}
		case NETWORK_REQUEST_SUCCESS:
		return {
			...state,
			loading: false
		}
		case NETWORK_REQUEST_FAILURE:
		return {
			...state,
			loading: false,
			error: action.payload
		}
		default:
		return {
			error: null,
			loading: false			
		}		
	}
};