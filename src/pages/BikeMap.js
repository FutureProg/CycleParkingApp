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
				zoom={14}
				style={mapStyle}
			/>
		)
	}
}

export default GoogleApiWrapper({
	apiKey: KEY
})(BikeMap);