const express = require("express");
const cors = require("cors");
const db = require("./config/db");

const app = express();
app.use(cors());
app.use(express.json());

// Rota inicial
app.get("/", (req, res) => {
    res.send("API de Usuários está funcionando!");
});

// Listar usuários
app.get("/usuarios", (req, res) => {
    db.query("SELECT * FROM usuarios", (err, results) => {
        if (err) return res.status(500).json({ erro: err });
        res.json(results);
    });
});

// Criar usuário
app.post("/usuarios", (req, res) => {
    const { nome, email } = req.body;

    db.query("INSERT INTO usuarios (nome, email) VALUES (?, ?)",
        [nome, email],
        (err, result) => {
            if (err) return res.status(500).json({ erro: err });
            res.json({ id: result.insertId, nome, email });
        });
});

// Atualizar usuário
app.put("/usuarios/:id", (req, res) => {
    const { nome, email } = req.body;
    const { id } = req.params;

    db.query("UPDATE usuarios SET nome=?, email=? WHERE id=?",
        [nome, email, id],
        (err) => {
            if (err) return res.status(500).json({ erro: err });
            res.json({ mensagem: "Usuário atualizado!" });
        });
});

// Deletar usuário
app.delete("/usuarios/:id", (req, res) => {
    const { id } = req.params;

    db.query("DELETE FROM usuarios WHERE id=?", [id], (err) => {
        if (err) return res.status(500).json({ erro: err });
        res.json({ mensagem: "Usuário deletado!" });
    });
});

// Iniciar servidor
app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});