import * as React from 'react';
import {connect} from 'react-redux';

import IconSuccess from '../images/IconSuccess.svg';
import IconError from '../images/IconError.svg';
import { MESSAGE_TYPE_ERROR } from '../util/Constants';

class MessageModal extends React.Component {

	render() {
		const icon = this.props.messageType === MESSAGE_TYPE_ERROR? IconError : IconSuccess;
		const message = this.props.message;
		return (
			<div className='modal-container'>
				<div className='modal'>
					<div className='content'>
						<img src={icon} alt=""/>
						<p>{message}</p>
					</div>
					<button className='neutral'>Close</button>
				</div>
			</div>			
		)
	}

}

export default connect()(MessageModal);