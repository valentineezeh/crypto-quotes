import  pkg from 'pg';
import dotenv from 'dotenv';
import { logger } from '../logger';
dotenv.config()
const {  Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.connect((err) => {
  if(err) {
    console.error('Error acquiring client', err.stack)
  }
  logger.info('Connected to PostgreSQL database');

})

export default pool;