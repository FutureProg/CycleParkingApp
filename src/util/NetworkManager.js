import {connect} from 'react-redux';
import {debug} from './Logger';
import {makeNetworkRequest,networkRequestFailure,receiveNetworkRequest} from '../store/NetworkStore';


class NetworkManager {

	static instance;

	constructor(){
		if(this.instance != null){
			return this.instance;
		}
		this.makeRequest = this.makeRequest.bind(this);
		this.receiveResponse = this.receiveResponse.bind(this);
		this.handleError = this.handleError.bind(this);
		this.instance = connect(null,mdtp)(NetworkManager);
	}

	receiveResponse(httpResponse){		
		debug(httpResponse);		
		return httpResponse;
	}

	handleError(response, data) {
		debug("Error: ", data);		
	}

	makeRawRequest(url, data) {		
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