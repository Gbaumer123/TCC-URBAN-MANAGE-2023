import mysql from 'mysql2';

export const Conection =mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'root1234',
  database: 'usuarios',
});