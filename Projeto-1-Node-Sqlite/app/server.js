const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 3000;

// Conectar ao banco de dados SQLite
const db = new sqlite3.Database('./db/todo.db', (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
  } else {
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
  }
});

// Middleware para fazer o parsing do corpo da requisição como JSON
app.use(express.json());

// Rota para criar uma nova tarefa
app.post('/tasks', (req, res) => {
  const taskData = req.body; // Dados da tarefa enviados no corpo da requisição
  const insertQuery = 'INSERT INTO tasks (title, description, completed) VALUES (?, ?, ?)';
  const values = [taskData.title, taskData.description, taskData.completed];

  db.run(insertQuery, values, function (err) {
    if (err) {
      console.error('Erro ao criar a tarefa:', err.message);
      res.status(500).json({ error: 'Erro ao criar a tarefa' });
      return;
    }
    res.json({ id: this.lastID, ...taskData });
  });
});

// Rota para listar todas as tarefas
app.get('/tasks', (req, res) => {
  const selectQuery = 'SELECT * FROM tasks';

  db.all(selectQuery, [], (err, rows) => {
    if (err) {
      console.error('Erro ao buscar as tarefas:', err.message);
      res.status(500).json({ error: 'Erro ao buscar as tarefas' });
      return;
    }
    res.json(rows);
  });
});

// Rota raiz
app.get('/', (req, res) => {
  res.send('Bem-vindo à API de gerenciamento de tarefas');
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
