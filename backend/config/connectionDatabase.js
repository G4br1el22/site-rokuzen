const mysql = require('mysql2')
const dotenv = require('dotenv')

dotenv.config();

const conexao = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

conexao.connect((err) => {
    if (err){
        console.error(err);
        return;
    }
    console.log("Conexão bem sucedida");
});