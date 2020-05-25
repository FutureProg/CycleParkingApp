export const osmElementsToGeoJSON = (elements) => ({      
	type: 'FeatureCollection',
	features: elements.map((value, index) => ({
		type: 'Feature',
		geometry: {
		type: 'Point',
		coordinates: [value.lon, value.lat]
		},
		properties: value.tags
	}))
});