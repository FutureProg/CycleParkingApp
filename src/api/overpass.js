import {createAction} from 'redux-actions'
import NetworkManager from '../util/NetworkManager';
import * as Constants from '../store/constants';

import bikeParkingQuery from '../queries/bike_parking_query';
const endpoint = 'https://overpass.kumi.systems/api/interpreter';

const queryRequest = createAction(Constants.QUERY_REQUEST);
const querySuccess = createAction(Constants.QUERY_SUCCESS);
const queryFailure = createAction(Constants.QUERY_FAILURE);

export const queryOverpass = (query) => (dispatch) => {	
	dispatch(queryRequest());	
	const network = new NetworkManager();
	const pkg = {
		body: bikeParkingQuery,
		method: 'post'
	}
	network
		.makeRawRequest(endpoint, pkg)
		.catch((x) => { 
			console.log(x);
			return dispatch(queryFailure());
		})
		.then((data) => {
			dispatch(querySuccess())
			console.log(data)
		})
}