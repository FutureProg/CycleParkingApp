import React from 'react';
import {connect} from 'react-redux'

import BikeMap from './pages/BikeMap';
import {fetchParking} from './api/overpass';
import WindowProgressBar from './components/WindowProgressBar';
import PhaseManager from './phases/PhaseManager';

import './App.css';

class App extends React.Component {

  componentDidMount() {
    
  }

  render() {
    const getMarkers = () => ({      
      type: 'FeatureCollection',
      features: this.props.parking.map((value, index) => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [value.lon, value.lat]
        },
        properties: value.tags
      }))
    });

    return (
      <div className="App">               
        <WindowProgressBar/>
        <PhaseManager />
        <BikeMap markerGeoJson={getMarkers()} />        
      </div>
    );
  }
}

const stp = (state) => ({
  parking: state.parkingState.data
})
const mdtp = {queryOverpass: fetchParking};
export default connect(stp, mdtp)(App);
