import * as React from 'react';
import {connect} from 'react-redux';

import {setPhase} from '../store/actions';
import * as Constants from '../util/Constants';

import Crosshair from '../images/Crosshair.svg';

class AddParkingP2 extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			center: null,
			loading: false
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
			const data = new FormData(evt.target);
			const parkingType = data.get('type');
			const parkingCapacity = data.get('capacity');			
			if (parkingType === null) {
				alert("Please select a parking type");
				return;
			}
			if (parkingCapacity < 0) {
				alert("Please enter a capacity that is 0 or greater");
				return;
			}			
			this.setState({
				loading: true
			})
			fetch('http://159.203.63.171:5001/create-parking',{
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify({
					lat: this.state.center.lat,
					lon: this.state.center.lng,
					type: parkingType,
					capacity: parkingCapacity === 0? null : parkingCapacity
				})
			})
			.then((response) => {
				if(!response.ok) {
					alert(`An error occured, please try again later. Error code: ${response.status}`);					
				} else {
					alert("Thank you for contributing! It should appear in a few hours.");
				}				
				this.setState({loading:true});
				this.props.setPhase(Constants.PHASE_MAIN);				
			})
		}
		const back = (evt) => {
			evt.preventDefault();
			this.props.setPhase(Constants.PHASE_ADD_P1);
		}
			
		return (
			<div className='phase add-parking-phase-p2'>
				<img className='cross-hair' src={Crosshair} alt='crosshair' />			
				<form className='bottom-form' onSubmit={submit}>
					<div className='form-title'>New Parking</div>
					<div className='form-item'>
						<label className='big' htmlFor='capacity'>Capacity (optional): </label>
						<input type='number' id='capacity' name='capacity' min="0"/>
					</div>
					<div className='form-item' style={{marginLeft: '0'}}>
						<label className='big' style={{marginLeft: '16px'}}>Type<span style={{color:'red'}}>*</span></label>		
						<div style={{marginTop: '8px'}} className='parking-option-list'>
							{parkingRender}
						</div>
					</div>
					<div className='button-row'>
						<button type='button' className='neutral' onClick={back} enabled={(!this.state.loading)+""}>Back</button>
						{this.state.loading? <p style={{fontWeight:'bold'}}>Submitting parking spot to servers...</p>:null}
						<input type='submit' className='primary' enabled={(!this.state.loading)+""}/>
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