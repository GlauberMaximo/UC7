// Importa o módulo express
const express = require("express");

// Inicializa a app
const app = express();

// Middleware para tratar JSON
app.use(express.json());

// Porta do servidor
const PORT = 3000;

// Banco de dados temporário
let usuarios = [
  { id: 1, nome: "Maria" },
  { id: 2, nome: "João" },
];

// Rota GET - Listar usuários
app.get("/usuarios", (req, res) => {
  res.status(200).json(usuarios);
});

// Rota POST - adicionar novo usuário
app.post("/usuarios", (req, res) => {
  const { nome } = req.body;

  if (!nome) {
    return res.status(400).json({ erro: "O campo 'nome' é obrigatório." });
  }

  const novoUsuario = {
    id: usuarios.length + 1,
    nome
  };

  usuarios.push(novoUsuario);
  res.status(201).json({ mensagem: "Usuário adicionado com sucesso!", usuario: novoUsuario });
});

// nicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});