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
			zoom: 12
		}
		this.map = null;
	}
	
	componentDidMount() {
		this.map = new mapboxgl.Map({
			container: this.mapContainer,
			style: 'mapbox://styles/futureprog/ck8ntydhy13sh1ipr8hh0rbje/draft?key='+KEY,
			center: [this.state.lng, this.state.lat],
			zoom: this.state.zoom
		});
		// this.map.showCollisionBoxes = true
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
			if (prevMarkerCount > 0) {
				map.removeSource('parking');
				map.removeLayer('clusters');
				map.removeLayer('cluster-count');
				map.removeLayer('unclustered-point');				
			}			
			map.addSource('parking', {
				type: 'geojson',
				data: this.props.markerGeoJson,
				cluster: true,
				clusterMaxZoom:18,
				clusterRadius: 50
			});
			map.addLayer({
				id: 'clusters',
				type: 'symbol',
				source: 'parking',
				filter: ['has','point_count'],
				layout: {
					'icon-image': 'ClusterCircle',
					'icon-size': 0.5,
					'icon-allow-overlap': true
				}				
			});
			map.addLayer({
				id: 'cluster-count',
				type: 'symbol',
				source: 'parking',
				filter: ['has','point_count'],
				layout: {
					'text-field': '{point_count_abbreviated}',
					'text-font': ['Open Sans Bold'],
					'text-size': 14,
					'text-allow-overlap': true
				},
				paint: {
					'text-color': '#fff'
				}
			});
			map.addLayer({
				id: 'unclustered-point',
				type: 'symbol',
				source: 'parking',
				filter: ['!', ['has', 'point_count']],
				layout: {
					'icon-image': 'ParkingPin',
					'icon-size': 0.5,
					'icon-allow-overlap': true,
					'icon-anchor': 'bottom'
				}	
			});

			// this.props.parking.slice(idx).forEach(function(marker) {

			// 	// create a HTML element for each feature
			// 	var el = document.createElement('div');
			// 	el.className = 'marker';
			
			// 	// make a marker for each feature and add to the map
			// 	new mapboxgl.Marker(el)
			// 		.setLngLat([marker.lon, marker.lat])
			// 		.addTo(map);
			// });
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