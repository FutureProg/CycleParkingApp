const express = require('express');
const credentials = require('./credentials');
const app = express();
const port = 5001;

app.get('/', (req, res) => res.send('Hey, what are you doing here?'));

/**
 * Route to create parking. Creates a changeset and a node for the specified
 * changeset on OSM. 
 * Requires the following:
 * lat: latitude of the node
 * lon: longitude of the node
 * type: the type of bicycle parking
 * capacity: (optional) the number of bicycles that can fit in the parking facility
 */
app.post('/create-parking', (req, res)=>{

	const makeNode = (changeset) => {
		const lat = req.params['lat']
		const lon = req.params['lon']
		const type = req.params['type']
		const capacity = req.params['capacity']
		fetch('https://api.openstreetmap.org/api/0.6/node/create', {	 
			headers: new Headers({
				'Authorization': `Basic ${new Buffer(`${credentials.user}:${credentials.pass}`).toString('base64')}`,
				'Content-Type': 'application/xml'
			}),
			method: 'PUT',
			body: `
			<osm>
				<node changeset="${changeset}" lat="${lat}" lon="${lon}">
					<tag k='bicycle_parking' v='${type}' />
					<tag k='amenity' v='bicycle_parking' />
					${!capacity? '' : `<tag k='capacity' v='${capacity}'/>`}
				</node>
			</osm>
			`
		})
		.then((response) => {
			if(!response.ok) {
				res.sendStatus(response.status);
				throw new Error(response.status);
			}			
			return response.text();
		})
		.then((nodeID) => {			
			res.sendStatus(200);
		})
	}

	fetch('https://api.openstreetmap.org/api/0.6/changeset/create', {	 
		headers: new Headers({
			'Authorization': `Basic ${new Buffer(`${credentials.user}:${credentials.pass}`).toString('base64')}`,
			'Content-Type': 'application/xml'
		}),
		method: 'PUT',
		body: `
			<osm>
				<changeset>
					<tag k='created_by' v='Cycle Map' />
					<tag k='comment' v='Adding bicycle parking'/>
				</changeset>
			</osm>`
	})
	.then((response) => {
		if (!response.ok) {
			res.sendStatus(response.status);
			throw new Error(response.status);
		}
		return response.text();
	})
	.then((changesetID) => makeNode(changesetID));
});

app.listen(port, () => console.log(`Listening on port ${port}`));