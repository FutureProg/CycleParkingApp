import React from 'react';
import {connect} from 'react-redux';

import {fetchLocationCoordinates, fetchLocationSuggestions} from '../api/mapbox';

import '../css/components.css';

class SearchBar extends React.Component {

	constructor(props) {
		super(props);
		this.onSearch = this.onSearch.bind(this);
		this.getSuggestions = this.getSuggestions.bind(this);
		this.suggestionTimer = null;
	}

	onSearch() {
		const searchText = this.inputfield.value;
		this.props.fetchLocationCoordinates(searchText, this.props.mapState)
			.then(data => {
				const location = data.features[0].center;
				this.props.setMapCenter(location[0], location[1], 16);
			}, null)
	}

	getSuggestions() {
		const searchText = this.inputfield.value;
		this.props.fetchLocationSuggestions(searchText, this.props.mapState);		
	}

	render() {
		const formSubmit = e => {
			e.preventDefault();
			this.onSearch()				
		}
		
		const onKeyPress = e => {
			if (e.target.value.length >= 4){
				if (this.suggestionTimer != null) {
					clearTimeout(this.suggestionTimer);
				}
				this.suggestionTimer = setTimeout(this.getSuggestions, 750);				
			}
		}

		return (
			<div className="search-bar">
				<form onSubmit={formSubmit}><input type="text" onKeyPress={onKeyPress} placeholder="find bike parking" ref={el => this.inputfield = el}/></form>
				<button onClick={this.onSearch}>GO</button>
			</div>
		);
	}

}

const mdtp = {
	fetchLocationCoordinates,
	fetchLocationSuggestions
};

const stp = (state) => ({
	suggestions: state.mapState.locationSuggestions
});

export default connect(stp, mdtp)(SearchBar);