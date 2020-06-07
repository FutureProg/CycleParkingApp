import * as React from 'react';
import {connect} from 'react-redux';

import Constants from '../util/Constants';

export default class AddParkingP1 extends React.Component {

	render() {
		return (
			<div className='phase add-parking-phase-p1'>
				<div className='bottom-bar'>
					<div className='prompt'>
						<p>Place the crosshair over the parking location</p>
					</div>
					<div className='button-container'>
						<button className='neutral'>Cancel</button>
						<button className='primary'>Done</button>
					</div>
				</div>
			</div>
		)
	}
}