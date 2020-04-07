import {debug} from './Logger';
import {makeNetworkRequest,networkRequestFailure,receiveNetworkRequest} from '../store/NetworkStore';


class NetworkManager {

	static _instance;

	constructor(){		
		if(NetworkManager.instance != null){
			return NetworkManager.instance;
		}
		console.log(this);
		this.setDispatch = this.setDispatch.bind(this);
		this.makeRequest = this.makeRequest.bind(this);
		this.receiveResponse = this.receiveResponse.bind(this);
		this.handleError = this.handleError.bind(this);		
		this.dispatch = null;
		NetworkManager.instance = this;		
	}

	setDispatch(dispatch) {
		this.dispatch = dispatch;
		console.log(this.dispatch);
	}

	receiveResponse(httpResponse){		
		debug(httpResponse);
		this.dispatch(receiveNetworkRequest())		
		return httpResponse;
	}

	handleError(response, data) {
		debug("Error: ", data);	
		this.dispatch(networkRequestFailure());		
	}

	makeRawRequest(url, data) {		
		console.log(this.dispatch);
		this.dispatch(makeNetworkRequest());
		return fetch(url,{			
			...data
		})		
		.catch(x => {
			console.log(x);			
		})	
		.then(response => {			
			var dataPromise = response.json();
			dataPromise.then( data => {
				if (!response.ok) {					
					this.handleError(response, data);
				} else {
					this.receiveResponse(data);			
				}
			});			
			return dataPromise;
		});
	}

	makeRequest(url,data){					
		// TODO: add base URL to whatever URL is passed in
	}

}

const mdtp = {
	makeNetworkRequest, networkRequestFailure, receiveNetworkRequest
}

export default NetworkManager;