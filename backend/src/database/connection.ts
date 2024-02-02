import  pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config()
const {  Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT, // Default PostgreSQL port
});

pool.connect((err, client, release) => {
  if(err) {
    console.error('Error acquiring client', err.stack)
  }
  console.log('Connected to PostgreSQL database');

  release()
})

export default pool;