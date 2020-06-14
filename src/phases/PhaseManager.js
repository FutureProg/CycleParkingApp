import * as React from 'react';
import {connect} from 'react-redux';

import * as Constants from '../util/Constants';
import MainPhase from './MainPhase';
import AddParkingP1 from './AddParkingP1';
import AddParkingP2 from './AddParkingP2';

class PhaseManager extends React.Component {
	
	render() {		
		switch(this.props.phase) {
			case Constants.PHASE_MAIN:
				return (<MainPhase />);
			case Constants.PHASE_ADD_P1:
				return (<AddParkingP1 />);
			case Constants.PHASE_ADD_P2:
				return (<AddParkingP2 />);
			default: 
				return null;
		}				
	}
}

const stp = state => ({
	phase: state.appState.phase
});

export default connect(stp)(PhaseManager);
