import NetworkManager from '../util/NetworkManager';


import {querySuccess, queryRequest, queryFailure,
	 fetchParkingSuccess, fetchParkingRequest, fetchParkingFailure} from '../store/actions';
import bikeParkingQuery from '../queries/bike_parking_query';

const endpoint = 'https://overpass.kumi.systems/api/interpreter';
const network = new NetworkManager();

export const fetchParking = () => (dispatch) => {	
	dispatch(queryRequest());			
	const pkg = {
		body: bikeParkingQuery,
		method: 'post'
	}
	dispatch(fetchParkingRequest());
	network
		.makeRawRequest(endpoint, pkg)
		.catch((x) => { 			
			dispatch(queryFailure());
		})			
		.then((data) => {
			dispatch(querySuccess())
			dispatch(fetchParkingSuccess(data))			
		}, ()=>{fetchParkingFailure()})
}