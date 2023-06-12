import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import authRoutes from './src/routes/authRoute'
import errorHandler from './src/middlewares/errorHandler';
import db from './src/configs/dbConfig';
import searchRoutes from './src/routes/searchRoute';
dotenv.config();

const app = express();
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
