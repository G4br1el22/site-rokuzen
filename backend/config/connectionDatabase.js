const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

// ✅ Configuração CORRETA para createPool
const pool = mysql.createPool({
    // Configurações básicas
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 60000 
});

// Teste de conexão
async function testarConexao() {
    try {
        const connection = await pool.getConnection();
        console.log("CONFIG(conexao banco de dados): Tudo certo")
        connection.release();
    } catch (err) {
        console.error("CONFIG(erro na conexão com o banco):", err.message);
    }
}

testarConexao();

module.exports = pool;