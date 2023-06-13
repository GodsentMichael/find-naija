import express from 'express';
import rateLimit from 'express-rate-limit'
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
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

db()
authRoutes(app)
searchRoutes(app)
app.use( errorHandler );

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

export default app
