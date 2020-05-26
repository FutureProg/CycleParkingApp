import React from 'react';
import {connect} from 'react-redux';
import mapboxgl from 'mapbox-gl';

import SearchBar from '../components/SearchBar';
import GeolocateButton from '../components/GeolocateButton';

import {fetchParking} from '../api/overpass';

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
		this.geolocate = null;
		this.setMapCenter = this.setMapCenter.bind(this);
	}

	setMapCenter(lng, lat, zoom=12) {
		this.map.flyTo({
			center: {lng, lat},
			zoom:zoom		
		})
	}
	
	componentDidMount() {		
		this.map = new mapboxgl.Map({
			container: this.mapContainer,
			style: 'mapbox://styles/futureprog/ck8ntydhy13sh1ipr8hh0rbje/draft?key='+KEY,			
			center: [this.state.lng, this.state.lat],
			zoom: this.state.zoom
		});
		this.geolocate = new mapboxgl.GeolocateControl({
			positionOptions: {
				enableHighAccuracy: true
			},
			trackUserLocation: true
		});
		this.map.addControl(this.geolocate);

		const map = this.map;
		const props = this.props;
		// this.map.showCollisionBoxes = true
		this.map.on('move', () => {
			this.setState({
				lng: this.map.getCenter().lng.toFixed(4),
				lat: this.map.getCenter().lat.toFixed(4),
				zoom: this.map.getZoom().toFixed(2)
			});
		});	
		this.map.on('load', function () {
			props.queryOverpass();
			map.addSource('target', {
				type: 'geojson',
				data: {
					type: 'FeatureCollection',
					features: []
				},
				cluster: false					
			});							
			map.addSource('parking', {
				type: 'geojson',
				data: props.markerGeoJson,
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
			map.addLayer({
				id: 'target-symbol',
				type: 'symbol',
				source: 'target',
				layout: {
					'icon-image': 'TargetRadar',
					'icon-size': 1.0,
					'icon-allow-overlap': true
				}	
			});	
		});			
	}	

	componentDidUpdate(prevProps) {
		if (prevProps.targetLocation !== this.props.targetLocation) {
			this.map.getSource('target').setData({
				type: 'FeatureCollection',
				features: [this.props.target]
			});
		}		
		const prevMarkerCount = prevProps.parking.length;
		const markerCount = this.props.parking.length;
		if (prevMarkerCount < markerCount && this.map) {								
			this.map.getSource('parking').setData(this.props.markerGeoJson);			
		}			
	}

	render() {
		return (
			<div>
				<SearchBar mapState={this.state} setMapCenter={this.setMapCenter}/>				
				<GeolocateButton geolocate={this.geolocate}/>
				<div ref={el => this.mapContainer = el} className="mapContainer" />
			</div>
		)
	}
}

const stp = (state) => ({
	parking: state.parkingState.data,
	map: state.mapState
})
const mdtp = {
	queryOverpass: fetchParking
}
export default connect(stp, mdtp)(BikeMap);