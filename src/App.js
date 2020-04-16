import React from 'react';
import {connect} from 'react-redux'

import BikeMap from './pages/BikeMap';
import {fetchParking} from './api/overpass';
import WindowProgressBar from './components/WindowProgressBar';
// import MarkerCluster from './components/MarkerCluster';

class App extends React.Component {

  componentDidMount() {
    setTimeout(this.props.queryOverpass, 1000);
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
    })

    

    return (
      <div className="App">               
        <WindowProgressBar/>
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
