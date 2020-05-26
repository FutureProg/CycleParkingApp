import React from 'react';


export default class GeolocateButton extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			active: false
		};
	}

	componentDidUpdate(prevProps) {
		if(!prevProps.geolocate && this.props.geolocate) {			
			this.props.geolocate.on('trackuserlocationstart', () => {
				this.setState({
					active: true
				});
			});
			this.props.geolocate.on('trackuserlocationend', () => {
				this.setState({
					active: false
				});
			});
		}
	}

	render() {		
		const cname = 'map-control-button geolocate-button' + (this.state.active? ' active': '');
		return this.props.geolocate? (
			<button onClick={() => this.props.geolocate.trigger()} className={cname} type='button' title='Find my location' aria-label='Find my location' aria-pressed='false'>
				<span className='control-icon' aria-hidden='true'></span>
			</button>
		) : null;
	}	
}