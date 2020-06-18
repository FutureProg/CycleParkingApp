import * as React from 'react';
import {connect} from 'react-redux';

import * as Constants from '../util/Constants';
import {setPhase} from '../store/actions';

import Crosshair from '../images/Crosshair.svg';

class AddParkingP1 extends React.Component {

	render() {
		const onCancel = () => {
			this.props.setPhase(Constants.PHASE_MAIN);
		}
		const onDone = () => {
			this.props.setPhase(Constants.PHASE_ADD_P2);
		}
		const minZoom = 18;
		return (
			<div className='phase add-parking-phase-p1'>				
				<img className='cross-hair' src={Crosshair} alt='crosshair' />			
				<div className='bottom-bar'>					
					<div className='prompt'>
						<p>{this.props.mapState.zoom >= minZoom ? "Place the crosshair over the parking location" : "Zoom further into the parking location"}</p>
					</div>
					<div className='button-container'>
						<button className='neutral' onClick={onCancel}>Cancel</button>
						<button className='primary' disabled={this.props.mapState.zoom < minZoom} onClick={onDone}>Done</button>
					</div>
				</div>
			</div>
		)
	}
}

const stp = (state) => ({
	mapState: state.mapState
})

const mdtp = {
	setPhase
}

export default connect(stp, mdtp)(AddParkingP1);