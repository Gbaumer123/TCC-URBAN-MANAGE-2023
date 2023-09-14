import mysql from 'mysql'

export const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root1234',
    database: 'sistema',
})
