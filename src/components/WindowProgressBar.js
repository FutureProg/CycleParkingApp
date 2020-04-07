import React from 'react';
import {connect} from 'react-redux';

class WindowProgressBar extends React.Component {

	constructor(props) {
		super(props);
		this.interval = null;				
		this.state = {
			barWidth: 0
		};
	}	

	componentDidUpdate(prevProps) {
		if (this.props.loading && !prevProps.loading) {
			const updateWidth = () => {
				const barWidth = Math.min(this.state.barWidth + 0.5, 80);
				this.setState({barWidth});
			}
			this.interval = setInterval(updateWidth, 50);
			this.setState({
				barWidth: 30
			})
		}
		else if (!this.props.loading && prevProps.loading && this.interval) {
			this.setState({
				barWidth: 100
			});
			clearInterval(this.interval);
			this.interval = null;
			const clearBarWidth = () => {
				this.setState({barWidth: 0});
			}
			setTimeout(clearBarWidth, 1000);
		}
	}

	render() {
		const cname = "window-progress-bar " + (this.props.loading? "" : "complete"); 			
		return (
			<div className={cname} style={{width: this.state.barWidth + "%"}}></div>
		)
	}

}

const stp = (state) => ({
	loading: state.networkState.loading
});

export default connect(stp)(WindowProgressBar);