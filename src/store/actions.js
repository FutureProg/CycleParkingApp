import {createAction} from 'redux-actions';
import * as Constants from './constants';

export const queryRequest = createAction(Constants.QUERY_REQUEST);
export const querySuccess = createAction(Constants.QUERY_SUCCESS);
export const queryFailure = createAction(Constants.QUERY_FAILURE);

export const fetchParkingSuccess = createAction(Constants.QUERY_PARKING_SUCCESS);
export const fetchParkingFailure = createAction(Constants.QUERY_PARKING_FAILRUE);
export const fetchParkingRequest = createAction(Constants.QUERY_PARKING_REQUEST);

export const forwardGeocodingRequest = createAction(Constants.FORWARD_GEOCODING_REQUEST);
export const forwardGeocodingSuccess = createAction(Constants.FORWARD_GEOCODING_SUCCESS);
export const forwardGeocodingFailure = createAction(Constants.FORWARD_GEOCODING_FAILURE);

export const fetchLocationSuggestionsRequest = createAction(Constants.FETCH_LOCATION_SUGGESTIONS_REQUEST);
export const fetchLocationSuggestionsSuccess = createAction(Constants.FETCH_LOCATION_SUGGESTIONS_SUCCESS);
export const fetchLocationSuggestionsFailure = createAction(Constants.FETCH_LOCATION_SUGGESTIONS_FAILURE);
export const clearLocationSuggestions = createAction(Constants.CLEAR_LOCATION_SUGGESTIONS);

export const setTargetLocation = createAction(Constants.SET_TARGET_LOCATION);
export const clearTargetLocation = createAction(Constants.CLEAR_TARGET_LOCATION);

export const setPhase = createAction(Constants.SET_PHASE);

export const updateMapState = createAction(Constants.UPDATE_MAP_STATE);

export const openMessageModal = createAction(Constants.OPEN_MESSAGE_MODAL,(message, messageType) => ({message, messageType}));
export const closeMessageModal = createAction(Constants.CLOSE_MESSAGE_MODAL);