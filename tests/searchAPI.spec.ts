import request from 'supertest';
import { connect } from './database';
import app from '../public/app';
import State from '.././src/model/stateLgaModel';

describe('Search API Routes', () => {
	let connectDB: any;

	beforeAll(async (): Promise<void> => {
		console.log('Starting the server...');
		const API_KEY = process.env.API_KEY;

		connectDB = await connect();
	});

	afterEach(async () => {
		await connectDB.cleanup();
	});

	afterAll(async () => {
		await connectDB.disconnect();
	});

	// Test for searching regions
	it('Should search regions', async () => {
		const res = await request(app).get('/api/search/regions');

		expect(res.status).toBe(200);
		expect(res.body).toEqual(
			expect.arrayContaining([
				'North Central',
				'North East',
				'North West',
				'South East',
				'South South',
				'South West',
			])
		);
	});

	// Test for searching states by region
	it('Should search states by region', async () => {
		const region = 'South East';
		const res = await request(app).get(`/api/search/state-by-region/${region}`);

		expect(res.status).toBe(200);
		expect(res.body).toEqual(
			expect.arrayContaining(['Abia', 'Anambra', 'Ebonyi', 'Enugu', 'Imo'])
		);
	});

	// Test for searching LGAs by state
	it('Should search LGAs by state', async () => {
		const state = 'Imo';
		const res = await request(app).get(`/api/search/lga-by-state/${state}`);

		expect(res.status).toBe(200);
		expect(res.body).toEqual(
			expect.arrayContaining(['Aboh-Mbaise', 'Ahiazu-Mbaise', 'Ehime-Mbano'])
		);
	});

	// Test for getting all states
	it('Should get all states', async () => {
		const res = await request(app).get('/api/search/states');

		expect(res.status).toBe(200);
		expect(res.body).toHaveLength(36);
	});

	// Test for getting information about a specific state
	it('Should get information about a specific state', async () => {
		const state = 'Imo';
		const res = await request(app).get(`/api/search/state/${state}`);

		expect(res.status).toBe(200);
		expect(res.body).toHaveProperty('state', 'Imo');
	});

	// Test for getting all LGAs
	it('Should get all LGAs', async () => {
		const res = await request(app).get('/api/search/lgas');

		expect(res.status).toBe(200);
		expect(res.body).toHaveLength(774); // Replace with the expected number of LGAs
	});

	// Test for getting information about a specific LGA
	it('Should get information about a specific LGA', async () => {
		const lga = 'Aboh-Mbaise';
		const res = await request(app).get(`/api/search/lgas/${lga}`);

		expect(res.status).toBe(200);
		expect(res.body).toHaveProperty('state', 'Imo');
		expect(res.body).toHaveProperty('lgas', 'Aboh-Mbaise');
	});
});
