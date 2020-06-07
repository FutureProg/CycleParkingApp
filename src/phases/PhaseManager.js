import * as React from 'react';
import {connect} from 'react-redux';

import * as Constants from '../util/Constants';
import MainPhase from './MainPhase';
import AddParkingP1 from './AddParkingP1';

class PhaseManager extends React.Component {
	
	render() {		
		switch(this.props.phase) {
			case Constants.PHASE_MAIN:
				return (<MainPhase />);
			case Constants.PHASE_ADD_P1:
				return (<AddParkingP1 />);
			default: 
				return null;
		}				
	}
}

const stp = state => ({
	phase: state.appState.phase
});

export default connect(stp)(PhaseManager);
