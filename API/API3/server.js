const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Bem-vindo à API de Tarefas!');
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});

app.use(express.json()); // Middleware para parsear JSON

let tarefas = [];

// rota para criar tarefas

app.post('/tarefas', (req, res) => {
  const { nome } = req.body;
  const novaTarefa = { id: tarefas.length + 1, nome };
  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
});

app.use(express.json()); // Middleware para parsear JSON

// rota que lista todas as tarefas criadas

app.post('/tarefas', (req, res) => {
  const { nome } = req.body;
  const novaTarefa = { id: tarefas.length + 1, nome };
  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
});

// rota para atualizar tarefa
app.put('/tarefas/:id', (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;

  let tarefa = tarefas.find(t => t.id == id);
  if (!tarefa) return res.status(404).json({ mensagem: 'Tarefa não encontrada' });

  tarefa.nome = nome;
  res.json(tarefa);
});

// exclusãod de tarefas

app.delete('/tarefas/:id', (req, res) => {
  const { id } = req.params;
  tarefas = tarefas.filter(t => t.id != id);
  res.status(204).send();
});

// criando login e gerando token 

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const users = [{ id: 1, username: 'usuario', password: 'senha123' }];

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ mensagem: 'Credenciais inválidas' });
  }
  
  const token = jwt.sign({ id: user.id }, 'segredo', { expiresIn: '1h' });
  res.json({ token });
});

// Protegendo rotas com o Jaosn Web Token

const autenticar = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ mensagem: 'Token não encontrado' });

  jwt.verify(token, 'segredo', (err, decoded) => {
    if (err) return res.status(401).json({ mensagem: 'Token inválido' });
    req.userId = decoded.id;
    next();
  });
};

app.delete('/tarefas/:id', autenticar, (req, res) => {
  // Excluir tarefa aqui
});