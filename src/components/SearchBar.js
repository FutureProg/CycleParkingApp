import React from 'react';
import {connect} from 'react-redux';

import {fetchLocationCoordinates} from '../api/mapbox';

import '../css/components.css';

class SearchBar extends React.Component {

	constructor(props) {
		super(props);
		this.onSearch = this.onSearch.bind(this);
	}

	onSearch() {
		const searchText = this.inputfield.value;
		this.props.fetchLocationCoordinates(searchText, this.props.mapState)
			.then(data => {
				const location = data.features[0].center;
				this.props.setMapCenter(location[0], location[1], 16);
			}, null)
	}

	render() {
		const formSubmit = e => {
			e.preventDefault();
			this.onSearch()				
		}

		return (
			<div className="search-bar">
				<form onSubmit={formSubmit}><input type="text" placeholder="find bike parking" ref={el => this.inputfield = el}/></form>
				<button onClick={this.onSearch}>GO</button>
			</div>
		);
	}

}

const mdtp = {
	fetchLocationCoordinates
};

export default connect(null, mdtp)(SearchBar);