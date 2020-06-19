const express = require('express');
const fetch = require('node-fetch');
const Headers = fetch.Headers;
const credentials = require('./credentials');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

const port = 5001;

app.get('/', (req, res) => res.send('Hey, what are you doing here?'));

app.post('/test', (req, res) => {
	console.log(req.body)
	res.send(200);	
})

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
		const lat = req.body['lat']
		const lon = req.body['lon']
		const type = req.body['type']
		const capacity = req.body['capacity']
		console.log(`
		<osm>
			<node changeset="${changeset}" lat="${lat}" lon="${lon}">
				<tag k='bicycle_parking' v='${type}' />
				<tag k='amenity' v='bicycle_parking' />
				${!capacity? '' : `<tag k='capacity' v='${capacity}'/>`}
			</node>
		</osm>
		`)		
		fetch('https://api.openstreetmap.org/api/0.6/node/create', {	 
			headers: new Headers({
				'Authorization': `Basic ${Buffer.from(`${credentials.user}:${credentials.pass}`).toString('base64')}`,
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
			'Authorization': `Basic ${Buffer.from(`${credentials.user}:${credentials.pass}`).toString('base64')}`,
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