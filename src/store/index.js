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

export const mapState = (state = {locationSuggestions: [], target: UtilConstants.EmptyGeoJSON, center: {lat: null, lng: null}, zoom: null}, action) => {
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
		case Constants.UPDATE_MAP_STATE:
			return {
				...state,
				...action.payload
			}
		default:
			return state;
	}
}

export const appState = (state = {phase: UtilConstants.PHASE_MAIN}, action) => {
	switch(action.type) {
		case Constants.SET_PHASE:
			return {
				...state,
				phase: action.payload
			}
		default:
			return state;
	}
} 

const messageModalDefault = {
	message: null,
	visible: false,
	messageType: null
}
export const messageModalState = (state = messageModalDefault, action) => {
	switch(action.type) {	
		case Constants.OPEN_MESSAGE_MODAL:
			return {
				...state,
				...action.payload,
				visible: true				
			}
		case Constants.CLOSE_MESSAGE_MODAL:
			return {
				...state,
				visible: false
			}
		default:
			return state;			
	}
}

export default combineReducers({networkState, parkingState, mapState, appState, messageModalState});