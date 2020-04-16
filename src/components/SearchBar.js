import React from 'react';

import '../css/components.css';

export default class SearchBar extends React.Component {

	render() {
		return (
			<div className="search-bar">
				<input type="text" placeholder="find bike parking"/>
				<button>GO</button>
			</div>
		);
	}

}