import React from 'react';
import {connect} from 'react-redux';

import {fetchLocationCoordinates, fetchLocationSuggestions} from '../api/mapbox';
import {clearLocationSuggestions} from '../store/actions';

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
			} else {
				this.props.clearLocationSuggestions()
			}
		}

		const suggestions = this.props.suggestions.map((value, index) => (
			<div className='item' key={index} tabIndex={0}>{value.place_name}</div>
		))
		return (
			<div className="search-bar">
				<form onSubmit={formSubmit}><input type="text" onChange={onKeyPress} placeholder="find bike parking" ref={el => this.inputfield = el}/></form>
				<button onClick={this.onSearch}>GO</button>
				<div className='suggestions'>		
					{suggestions}				
				</div>
			</div>
		);
	}

}

const mdtp = {
	fetchLocationCoordinates,
	fetchLocationSuggestions,
	clearLocationSuggestions
};

const stp = (state) => ({
	suggestions: state.mapState.locationSuggestions
});

export default connect(stp, mdtp)(SearchBar);