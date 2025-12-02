const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "senac",
    password: "123456",
    database: "api_usuarios"
});

connection.connect((err) => {
    if (err) {
        console.error("Erro ao conectar ao MySQL: ", err);
        return;
    }
    console.log("MySQL conectado com sucesso!");
});

module.exports = connection;