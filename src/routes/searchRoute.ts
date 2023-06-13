import { Express } from 'express';
import {
	searchLGAsByState,
	searchRegions,
	searchStatesByRegion,
	getAllStates,
	getOneState,
	getAllLGAs,
	getOneLGA,
} from '../controller/searchAPI';
import { authenticateApiKey } from '../middlewares/authApiKey';

const searchRoutes = (app: Express) => {
	app.get('/api/search/regions', authenticateApiKey, searchRegions);
	app.get(
		'/api/search/lga-by-state/:state',
		authenticateApiKey,
		searchLGAsByState
	);
	app.get(
		'/api/search/state-by-region/:region',
		authenticateApiKey,
		searchStatesByRegion
	);
	app.get('/api/search/states', authenticateApiKey, getAllStates);
	app.get('/api/search/state/:state', authenticateApiKey, getOneState);
	app.get('/api/search/lgas', authenticateApiKey, getAllLGAs);
	app.get('/api/search/lgas/:lga', authenticateApiKey, getOneLGA);
};

export default searchRoutes;
