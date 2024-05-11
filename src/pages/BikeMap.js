import React from 'react';
import {connect} from 'react-redux';
import mapboxgl from 'mapbox-gl';

import SearchBar from '../components/SearchBar';
import GeolocateButton from '../components/GeolocateButton';
import MapViewButton from '../components/MapViewButton';

import {fetchParking} from '../api/overpass';
import {updateMapState} from '../store/actions';
import * as UConstants from '../util/Constants'

import '../css/map.css';

import {KEY} from '../key';
mapboxgl.accessToken = KEY;
const BASE_MAP_STYLE = 'mapbox://styles/futureprog/ck8ntydhy13sh1ipr8hh0rbje';
const SATELLITE_MAP_STYLE = 'mapbox://styles/futureprog/ckdmn4me00c4j1iml9iu1yayf';

export class BikeMap extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			lat: 43.5103021,
			lng: -79.9638755,
			zoom: 11
		}
		this.map = null;
		this.geolocate = null;
		this.setMapCenter = this.setMapCenter.bind(this);
		this.setMapStyle = this.setMapStyle.bind(this);
		this.initMapContents = this.initMapContents.bind(this);
	}

	initMapContents() {
		console.log("draw map contents")
		const map = this.map;
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
	}

	setMapCenter(lng, lat, zoom=12) {
		this.map.flyTo({
			center: {lng, lat},
			zoom:zoom		
		})
	}
	
	setMapStyle(viewMode) {
		switch(viewMode) {
			case UConstants.MAP_VIEW_SATELLITE:
				this.map.setStyle(SATELLITE_MAP_STYLE);
				break;
			default:
				this.map.setStyle(BASE_MAP_STYLE);
				break;
		}		
		//this.map.getSource('parking').setData(this.props.markerGeoJson);
	}

	componentDidMount() {		
		this.map = new mapboxgl.Map({
			container: this.mapContainer,
			style: BASE_MAP_STYLE,			
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
				lng: this.map.getCenter().lng.toFixed(5),
				lat: this.map.getCenter().lat.toFixed(5),
				zoom: this.map.getZoom().toFixed(2)
			});
			this.props.updateReduxMapState({
				center: {lat: this.state.lat, lng: this.state.lng},
				zoom: this.state.zoom
			});
		});	
		this.map.on('load', function () {
			props.queryOverpass();							
		});	
		this.map.on('style.load', this.initMapContents);
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

	disable() {
		this.map.boxZoom.disable();
		this.map.scrollZoom.disable();
		this.map.dragPan.disable();
		this.map.dragRotate.disable();
		this.map.keyboard.disable();
		this.map.doubleClickZoom.disable();
		this.map.touchZoomRotate.disable();	
	}

	enable() {
		this.map.boxZoom.enable();
		this.map.scrollZoom.enable();
		this.map.dragPan.enable();
		this.map.dragRotate.enable();
		this.map.keyboard.enable();
		this.map.doubleClickZoom.enable();
		this.map.touchZoomRotate.enable();
	}

	render() {
		return (
			<div>
				{this.props.phase === UConstants.PHASE_ADD_P2? null : <SearchBar mapState={this.state} setMapCenter={this.setMapCenter}/>}
				<div className='map-control-container'>
					<MapViewButton setMapStyle={this.setMapStyle} />
					<GeolocateButton geolocate={this.geolocate}/>
				</div>				
				<div ref={el => this.mapContainer = el} className="mapContainer" />
			</div>
		)
	}
}

const stp = (state) => ({
	parking: state.parkingState.data,
	phase: state.appState.phase
})
const mdtp = {
	queryOverpass: fetchParking,
	updateReduxMapState: updateMapState
}
export default connect(stp, mdtp)(BikeMap);