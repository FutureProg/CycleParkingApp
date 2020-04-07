import React from 'react';
import {connect} from 'react-redux'

import BikeMap from './pages/BikeMap';
import {fetchParking} from './api/overpass';
import WindowProgressBar from './components/WindowProgressBar';
// import MarkerCluster from './components/MarkerCluster';

class App extends React.Component {
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
        <button style={{'zIndex':100, 'position': 'absolute', 'top': 0, 'left':0}} onClick={()=>this.props.queryOverpass()}>Fetch Parking</button>
      </div>
    );
  }
}

const stp = (state) => ({
  parking: state.parkingState.data
})
const mdtp = {queryOverpass: fetchParking};
export default connect(stp, mdtp)(App);
