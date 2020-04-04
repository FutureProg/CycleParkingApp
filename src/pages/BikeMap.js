import React from 'react';
import {Map, GoogleApiWrapper} from 'google-maps-react';

import {KEY} from '../key';

export class BikeMap extends React.Component {
	render() {
		const mapStyle = {
			width: '100%',
			height: '100%'
		};
		return (
			<Map
				google={this.props.google}
				initialCenter={{
					lat: 43.5890,
					lng: -79.6441
				}}
				zoom={13}
				style={mapStyle}
			>
				{this.props.children}
			</Map>
		)
	}
}

export default GoogleApiWrapper({
	apiKey: KEY
})(BikeMap);