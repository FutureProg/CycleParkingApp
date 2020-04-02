import React from 'react';
import {connect} from 'react-redux'

import BikeMap from './pages/BikeMap';
import {queryOverpass} from './api/overpass';
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <BikeMap />
        <button style={{'zIndex':100, 'position': 'absolute', 'top': 0, 'left':0}} onClick={()=>this.props.queryOverpass()}>Fetch Parking</button>
      </div>
    );
  }
}

const mdtp = {queryOverpass};
export default connect(null, mdtp)(App);
