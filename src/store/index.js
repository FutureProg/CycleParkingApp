import { combineReducers } from 'redux';
import * as Constants from './constants';

import {networkState} from './NetworkStore';

export const parkingState = (state = {data:[]}, action) => {
	switch(action.type) {		
		case Constants.QUERY_PARKING_SUCCESS:
			return {
				data: [
					...state.data,
					...action.payload.elements
				]
			}		
		default: 
		return state;
	}
}

export default combineReducers({networkState, parkingState});