import {Express} from 'express';
import {
    searchLGAsByState, searchRegions, searchStatesByRegion, getAllStates, getOneState
} from '../controller/searchAPI';
import { authenticateApiKey } from '../middlewares/authApiKey';


const searchRoutes = (app: Express) => {
    app.get('/api/search/regions', authenticateApiKey,searchRegions)
    app.get('/api/search/lga-by-state/:state', authenticateApiKey,searchLGAsByState)
    app.get('/api/search/state-by-region/:region', authenticateApiKey,searchStatesByRegion)
    app.get('/api/search/all-states', authenticateApiKey,getAllStates)
    app.get('/api/search/one-state/:state', authenticateApiKey,getOneState)
}

export default searchRoutes