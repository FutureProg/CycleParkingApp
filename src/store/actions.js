import {createAction} from 'redux-actions';
import * as Constants from './constants';

export const queryRequest = createAction(Constants.QUERY_REQUEST);
export const querySuccess = createAction(Constants.QUERY_SUCCESS);
export const queryFailure = createAction(Constants.QUERY_FAILURE);

export const fetchParkingSuccess = createAction(Constants.QUERY_PARKING_SUCCESS);
export const fetchParkingFailure = createAction(Constants.QUERY_PARKING_FAILRUE);
export const fetchParkingRequest = createAction(Constants.QUERY_PARKING_REQUEST);