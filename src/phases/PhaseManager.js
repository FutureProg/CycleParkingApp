import * as React from 'react';
import {connect} from 'react-redux';

import * as Constants from '../util/Constants';
import MainPhase from './MainPhase';

class PhaseManager extends React.Component {
	
	render() {		
		switch(this.props.phase) {
			case Constants.PHASE_MAIN:
				return (<MainPhase />) 
			default: 
				return null;
		}				
	}
}

const stp = state => ({
	phase: state.appState.phase
});

export default connect(stp)(PhaseManager);
