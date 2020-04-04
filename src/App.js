import React from 'react';
import {connect} from 'react-redux'
import {Marker} from 'google-maps-react';

import BikeMap from './pages/BikeMap';
import {fetchParking} from './api/overpass';
class App extends React.Component {
  render() {
    const markers = this.props.parking.map((value, index) => (
      <Marker key={index} position={{lat: value.lat, lng: value.lon}} title={value.tags.bicycle_parking} />
    ));



    return (
      <div className="App">
        <BikeMap>
          {markers}
        </BikeMap>
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
