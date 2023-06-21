import express from 'express';
import rateLimit from 'express-rate-limit'
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import swaggerjsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import authRoutes from './src/routes/authRoute'
import errorHandler from './src/middlewares/errorHandler';
import db from './src/configs/dbConfig';
import searchRoutes from './src/routes/searchRoute';
dotenv.config();

const app = express();

// Defaults to in-memory store.
// You can use redis or any other store.
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: 'Too many requests, please try again later.',
})

// Apply the rate limiting middleware to all requests
app.use(limiter)
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Find Naija API Documentation',
			version: '1.0.0',
			description: 'This is a capstone project from AltSchool Africa, the project was carried out using typescript and express both running on Nodejs',
			contact: {
				name: 'Gosent Michael',
				email: 'godsentpaulyerobiri@gmail.com',
				url: 'https://github.com/godsentmichael',
            },
		},
		servers: [
			{
				url: 'http://localhost:5050',
			},
		],
	},
	apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerjsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));

	
app.get('/', (req, res) => res.send('Welcome to the API'));

db()
authRoutes(app)
searchRoutes(app)
app.use( errorHandler );

export default app
