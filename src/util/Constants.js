import BikeStands from '../images/BikeStands.png';
import BikeRack from '../images/BikeRack.png';
import BikeWave from '../images/BikeWave.png';
import BikeWallLoops from '../images/BikeWallLoops.png';
import BikeAnchor from '../images/BikeAnchor.jpg';
import BikeLocker from '../images/BikeLocker.jpg';
import BikeShed from '../images/BikeShed.jpeg';
import BikeBollard from '../images/BikeBollard.jpeg';
import BikeGroundSlot from '../images/BikeGroundSlot.png';
import BikeBuilding from '../images/BikeBuilding.jpg';

export const EmptyGeoJSON = {
	type: 'FeatureCollection',
	features: []
};

export const PHASE_MAIN = 'PHASE_MAIN';
export const PHASE_ADD_P1 = 'PHASE_ADD_P1';
export const PHASE_ADD_P2 = 'PHASE_ADD_P2';

export const MESSAGE_TYPE_ERROR = "MSG_TYPE_ERROR";
export const MESSAGE_TYPE_SUCCESS = "MSG_TYPE_SUCCESS";
export const MESSAGE_TYPE_NEUTRAL = "MSG_TYPE_NEUTRAL";

export const ParkingOptions = [
	{
		value: 'stands',
		text: 'stands',
		image: BikeStands
	},
	{
		value: 'bollard',
		text: 'bollard',
		image: BikeBollard
	},
	{
		value: 'rack',
		text: 'rack',
		image: BikeRack
	},
	{
		value: 'wave',
		text: 'wave',
		image: BikeWave
	},
	{
		value: 'shed',
		text: 'shed',
		image: BikeShed
	},
	{
		value: 'building',
		text: 'building',
		image: BikeBuilding
	},
	{
		value: 'wall_loops',
		text: 'wall loops',
		image: BikeWallLoops
	},
	{
		value: 'anchors',
		text: 'anchors',
		image: BikeAnchor
	},
	{
		value: 'lockers',
		text: 'lockers',
		image: BikeLocker
	},		
	{
		value: 'ground_slots',
		text: 'ground slots',
		image: BikeGroundSlot
	}	
];	