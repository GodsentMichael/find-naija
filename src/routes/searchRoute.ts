/**
 * @swagger
 * tags:
 *   name: Search
 *   description: API endpoints for searching regions, states, and LGAs
 * securitySchemes:
 *   ApiKeyAuth:
 *     type: apiKey
 *     in: header
 *     name: X-API-KEY
 */

/**
 * @swagger
 * /api/search/regions:
 *   get:
 *     summary: Get all regions
 *     tags: [Search]
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */

/**
 * @swagger
 * /api/search/state-by-region/{region}:
 *   get:
 *     summary: Get states by region
 *     tags: [Search]
 *     parameters:
 *       - in: path
 *         name: region
 *         schema:
 *           type: string
 *         required: true
 *         description: The region name
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/State'
 */

/**
 * @swagger
 * /api/search/lga-by-state/{state}:
 *   get:
 *     summary: Get LGAs by state
 *     tags: [Search]
 *     parameters:
 *       - in: path
 *         name: state
 *         schema:
 *           type: string
 *         required: true
 *         description: The state name
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */

/**
 * @swagger
 * /api/search/states:
 *   get:
 *     summary: Get all states with pagination
 *     tags: [Search]
 *     parameters:
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Sort states by field(s) (comma-separated). Use "-" prefix for descending order.
 *       - in: query
 *         name: fields
 *         schema:
 *           type: string
 *         description: Specify fields to include (comma-separated)
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/State'
 */

/**
 * @swagger
 * /api/search/state/{state}:
 *   get:
 *     summary: Get information about a specific state
 *     tags: [Search]
 *     parameters:
 *       - in: path
 *         name: state
 *         schema:
 *           type: string
 *         required: true
 *         description: The state name
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/State'
 */

/**
 * @swagger
 * /api/search/lgas:
 *   get:
 *     summary: Get all LGAs with pagination, sorting, and filtering
 *     tags: [Search]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number for pagination
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: integer
 *         description: The number of items per page for pagination
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Sort LGAs by field(s) (comma-separated). Use "-" prefix for descending order.
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *         description: Filter LGAs by name (case-insensitive)
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */

/**
 * @swagger
 * /api/search/lgas/{lga}:
 *   get:
 *     summary: Get information about a specific LGA
 *     tags: [Search]
 *     parameters:
 *       - in: path
 *         name: lga
 *         schema:
 *           type: string
 *         required: true
 *         description: The LGA name
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 state:
 *                   type: string
 *                 lgas:
 *                   type: string
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     State:
 *       type: object
 *       required:
 *        - state
 *       
 * 
 *       properties:
 *         state:
 *           type: string
 *         lgas:
 *           type: array
 *           items:
 *             type: string
 */



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
