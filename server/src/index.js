import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import dotenv from 'dotenv';
import db from '../models/index.js';
import allRoutes from './routes/router';

dotenv.config();

const { PORT , DB_NAME } = process.env;

const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());

app.use('/api/v1', allRoutes );

const server = app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

const dbCon = async () => {
  try {
    await db.sequelize.authenticate();
    console.log(`Database ${DB_NAME} connected successfully`);
  } catch (error) {
    console.log(error);
  }
};

Promise.all([server, dbCon()]).catch((error) => {
  console.log(`Server error: ${error.message}`);
});

export default app;