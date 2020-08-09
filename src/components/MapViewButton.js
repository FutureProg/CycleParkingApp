import * as React from 'react';

import * as Constants from '../util/Constants';

export default class MapViewButton extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			activeMode: Constants.MAP_VIEW_MAP
		};
	}

	render() {
		const toggleMapView = () => {
			if (this.state.activeMode === Constants.MAP_VIEW_MAP) {
				this.props.setMapStyle(Constants.MAP_VIEW_SATELLITE);
				this.setState({activeMode:Constants.MAP_VIEW_SATELLITE});
			} else {
				this.props.setMapStyle(Constants.MAP_VIEW_MAP);
				this.setState({activeMode:Constants.MAP_VIEW_MAP});
			}		
		}
		const title = this.state.activeMode === Constants.MAP_VIEW_MAP? 'Satellite View' : 'Map View';
		const cname = 'map-control-button map-view-button ' + (this.state.activeMode === Constants.MAP_VIEW_MAP? 'satellite' : 'map');
		return (
			<button onClick={() => toggleMapView()} className={cname} type='button' title={title} aria-label={title} aria-pressed='false'>
				<span className='control-icon' aria-hidden='true'></span>
			</button>			
		)
	}

}