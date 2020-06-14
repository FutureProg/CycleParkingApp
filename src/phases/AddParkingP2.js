import * as React from 'react';
import {connect} from 'react-redux';

import {setPhase} from '../store/actions';
import * as Constants from '../util/Constants';

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
		const parkingRender = Constants.ParkingOptions.map((option, index) => (
			<div className='parking-option' key={index}>
				<input type='radio' name="type" id={option.value} value={option.value}/>				
				<label htmlFor={option.value}>
					<img src={option.image} alt={option.text}/>
					<div>{option.text}</div>
				</label>
			</div>
		));	

		const submit = (evt) => {
			evt.preventDefault();
		}
		const back = (evt) => {
			evt.preventDefault();
			this.props.setPhase(Constants.PHASE_ADD_P1);
		}
			
		return (
			<div className='phase add-parking-phase-p2'>
				<img className='cross-hair' src={Crosshair} alt='crosshair' />			
				<form className='bottom-form'>
					<div className='form-title'>New Parking</div>
					<div className='form-item'>
						<label className='big' htmlFor='capacity'>Capacity</label>
						<input type='number' id='capacity'/>
					</div>
					<div className='form-item' style={{marginLeft: '0'}}>
						<label className='big' style={{marginLeft: '16px'}}>Type</label>		
						<div style={{marginTop: '8px'}} className='parking-option-list'>
							{parkingRender}
						</div>
					</div>
					<div className='button-row'>
						<button className='neutral' onClick={back}>Back</button>
						<input type='submit' className='primary' onClick={submit} />
					</div>
				</form>	
			</div>
		)
	}
}

const stp = (state) => ({
	mapState: state.mapState
});
const dtp = {
	setPhase
}

export default connect(stp, dtp)(AddParkingP2);