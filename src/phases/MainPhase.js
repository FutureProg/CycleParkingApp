import * as React from 'react';
import {connect} from 'react-redux';

import * as Constants from '../util/Constants';
import {setPhase} from '../store/actions';

import '../css/phases.css';

class MainPhase extends React.Component {

	render() {
		const onAdd = () => {
			this.props.setPhase(Constants.PHASE_ADD_P1);
		}

		return (
			<div className='main-phase phase'>
				<div className='action-menu'>
					<button onClick={onAdd} className='add-button' type='button' title='add parking location' aria-label='add parking location' aria-pressed='false'>
						<span className='button-icon' aria-hidden='true'></span>
					</button>
				</div>
			</div>
		)
	}
}

const dstp = {
	setPhase
};

export default connect(null, dstp)(MainPhase);