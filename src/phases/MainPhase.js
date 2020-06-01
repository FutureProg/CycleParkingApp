import * as React from 'react';

import '../css/phases.css';

export default class MainPhase extends React.Component {

	render() {
		return (
			<div className='main-phase phase'>
				<div className='action-menu'>
					<button className='add-button' type='button' title='add parking location' aria-label='add parking location' aria-pressed='false'>
						<span className='button-icon' aria-hidden='true'></span>
					</button>
				</div>
			</div>
		)
	}

}