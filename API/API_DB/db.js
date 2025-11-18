const mysql = require('mysql2/promise');

const dbConfig = {
    host: 'localhost',      
    user: 'root',           
    password: 'senac',           
    database: 'api_usuarios', // Nome do banco de dados criado
    port: 3307,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

// Cria o pool de conexões.
const pool = mysql.createPool(dbConfig);

// Testar a conexão ao iniciar
pool.getConnection()
    .then(connection => {
        console.log("Conexão com MySQL estabelecida com sucesso! 💾");
        connection.release(); 
    })
    .catch(err => {
        console.error("❌ ERRO: Falha ao conectar ao MySQL. Verifique o XAMPP e as credenciais.");
        console.error(err.message);
    });

module.exports = pool;