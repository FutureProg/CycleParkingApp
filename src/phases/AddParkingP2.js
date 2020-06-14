import * as React from 'react';

import {connect} from 'react-redux';
import {ParkingOptions} from '../util/Constants';

import Crosshair from '../images/Crosshair.svg';

class AddParkingP2 extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			center: null
		};
	}

	componentDidMount() {
		this.setState({
			center: this.props.mapState.center
		});
	}

	render() {
		const parkingRender = ParkingOptions.map((option, index) => (
			<div className='parking-option' key={index}>
				<input type='radio' name="type" id={option.value} value={option.value}/>
				<img src={option.image} alt={option.text}/>
				<label for={option.value}>{option.text}</label>
			</div>
		));	
		return (
			<div className='phase add-parking-phase-p2'>
				<img className='cross-hair' src={Crosshair} alt='crosshair' />			
				<form className='bottom-form'>
					<div className='form-title'>New Parking</div>
					<div className='form-item'>
						<label className='big' for='capacity'>Capacity</label>
						<input type='number' id='capacity'/>
					</div>
					<div className='form-item'>
						<label className='big'>Type</label>		
						<div style={{marginTop: '8px'}} className='parking-option-list'>
							{parkingRender}
						</div>
					</div>
					<div className='button-row'>
						<button className='neutral'>Back</button>
						<input type='submit' onClick={(e) => {e.preventDefault()}} />
					</div>
				</form>	
			</div>
		)
	}
}

const stp = (state) => ({
	mapState: state.mapState
})

export default connect(stp)(AddParkingP2);