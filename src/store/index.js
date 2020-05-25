import { combineReducers } from 'redux';
import * as Constants from './constants';
import * as UtilConstants from '../util/Constants';


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

export const mapState = (state = {locationSuggestions: [], target: UtilConstants.EmptyGeoJSON}, action) => {
	switch(action.type) {
		case Constants.FETCH_LOCATION_SUGGESTIONS_SUCCESS:
			return {
				...state,
				locationSuggestions: action.payload.features
			}
		case Constants.FETCH_LOCATION_SUGGESTIONS_FAILURE:
		case Constants.CLEAR_LOCATION_SUGGESTIONS:
			return {
				...state,
				locationSuggestions: []
			}
		case Constants.SET_TARGET_LOCATION:
			return {
				...state,
				target: {
					...UtilConstants.EmptyGeoJSON,
					features: [action.payload]
				}
			}
		case Constants.CLEAR_TARGET_LOCATION:
			return {
				...state,
				target: UtilConstants.EmptyGeoJSON
			}
		default:
			return state;
	}
}

export default combineReducers({networkState, parkingState, mapState});