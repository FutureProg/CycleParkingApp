import React from 'react';
import {connect} from 'react-redux';
import mapboxgl from 'mapbox-gl';

import '../css/map.css';

import {KEY} from '../key';
mapboxgl.accessToken = KEY;

export class BikeMap extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			lat: 43.5890,
			lng: -79.6441,
			zoom: 10
		}
		this.map = null;
	}
	
	componentDidMount() {
		this.map = new mapboxgl.Map({
			container: this.mapContainer,
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [this.state.lng, this.state.lat],
			zoom: this.state.zoom
		});
		this.map.on('move', () => {
			this.setState({
				lng: this.map.getCenter().lng.toFixed(4),
				lat: this.map.getCenter().lat.toFixed(4),
				zoom: this.map.getZoom().toFixed(2)
			});
		});
	}	

	componentDidUpdate(prevProps) {
		const prevMarkerCount = prevProps.parking.length;
		const markerCount = this.props.parking.length;
		if (prevMarkerCount < markerCount && this.map) {			
			const idx = prevMarkerCount;
			// add markers to map
			const map = this.map;
			this.props.parking.slice(idx).forEach(function(marker) {

				// create a HTML element for each feature
				var el = document.createElement('div');
				el.className = 'marker';
			
				// make a marker for each feature and add to the map
				new mapboxgl.Marker(el)
					.setLngLat([marker.lon, marker.lat])
					.addTo(map);
			});
		}			
	}

	render() {
		return (
			<div>
				<div ref={el => this.mapContainer = el} className="mapContainer" />
			</div>
		)
	}
}

const stp = (state) => ({
	parking: state.parkingState.data
})
export default connect(stp)(BikeMap);