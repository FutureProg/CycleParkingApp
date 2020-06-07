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

		return (
			<div className='phase add-parking-phase-p1'>
				<img className='cross-hair' src={Crosshair} alt='crosshair' /> 
				<div className='bottom-bar'>					
					<div className='prompt'>
						<p>Place the crosshair over the parking location</p>
					</div>
					<div className='button-container'>
						<button className='neutral' onClick={onCancel}>Cancel</button>
						<button className='primary'>Done</button>
					</div>
				</div>
			</div>
		)
	}
}

const mdtp = {
	setPhase
}

export default connect(null, mdtp)(AddParkingP1);