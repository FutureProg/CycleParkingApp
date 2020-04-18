import NetworkManager from '../util/NetworkManager';
import {forwardGeocodingRequest, forwardGeocodingSuccess, forwardGeocodingFailure} from '../store/actions';
import {fetchLocationSuggestionsRequest, fetchLocationSuggestionsSuccess, fetchLocationSuggestionsFailure} from '../store/actions';
import {KEY} from '../key';

const network = new NetworkManager();

const geocodingUrl = (searchText, focalPoint, autocomplete=false, endpoint='mapbox.places') => 
	`https://api.mapbox.com/geocoding/v5/${endpoint}/${searchText}.json?access_token=${KEY}&autocomplete=${autocomplete}&proximity=${focalPoint['lng']}%2C${focalPoint['lat']}`

export const fetchLocationCoordinates = (searchText, focalPoint) => (dispatch) => {
	dispatch(forwardGeocodingRequest());
	const url = geocodingUrl(searchText, focalPoint);
	return network
	.makeRawRequest(url,null)
	.then(
		value => {
			dispatch(forwardGeocodingSuccess())
			console.log(value);
			return value;
		},
		value => {
			dispatch(forwardGeocodingFailure());
		}
	)
}

export const fetchLocationSuggestions = (searchText, focalPoint) => (dispatch) => {
	dispatch(fetchLocationSuggestionsRequest());
	const url = geocodingUrl(searchText, focalPoint, true);
	return network
	.makeRawRequest(url,null)
	.then(
		data => {
			dispatch(fetchLocationSuggestionsSuccess(data))			
			return data;
		},
		value => {
			dispatch(fetchLocationSuggestionsFailure());
		}
	)
}