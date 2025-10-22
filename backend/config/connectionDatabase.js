import mysql from "mysql2";
import dotenv from "dotenv";

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