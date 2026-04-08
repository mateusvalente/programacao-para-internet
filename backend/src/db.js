import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
  host: process.env.DB_HOST || 'mysql',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'crud_user',
  password: process.env.DB_PASSWORD || 'crud_pass',
  database: process.env.DB_NAME || 'crud_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
