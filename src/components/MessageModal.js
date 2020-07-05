import * as React from 'react';
import {connect} from 'react-redux';

import { MESSAGE_TYPE_ERROR, MESSAGE_TYPE_SUCCESS } from '../util/Constants';
import {closeMessageModal} from '../store/actions';

import IconSuccess from '../images/IconSuccess.svg';
import IconError from '../images/IconError.svg';

class MessageModal extends React.Component {

	render() {
		const icon = this.props.messageType === MESSAGE_TYPE_ERROR? IconError:
					 (this.props.messageType === MESSAGE_TYPE_SUCCESS? IconSuccess : null);
		const message = this.props.message;
		return (
			<div className='modal-container'>
				<div className='modal'>
					<div className='content'>
						{icon === null? null : <img src={icon} alt=""/>}
						<p>{message}</p>
					</div>
					<button className='neutral' onClick={this.props.closeMessageModal}>Close</button>
				</div>
			</div>			
		)
	}

}
const stp = (state) => ({
	...state.messageModalState
});
const dtp = {
	closeMessageModal
};
export default connect(stp, dtp)(MessageModal);