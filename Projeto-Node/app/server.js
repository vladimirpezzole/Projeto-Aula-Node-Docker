const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// Conectar ao MongoDB
mongoose.connect('mongodb://localhost/todo', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado ao MongoDB');
  })
  .catch((error) => {
    console.error('Erro ao conectar ao MongoDB:', error);
  });

// Middleware para fazer o parsing do corpo da requisição como JSON
app.use(express.json());

// Definir o modelo de tarefa
const Task = mongoose.model('Task', {
  title: String,
  description: String,
  completed: Boolean
});

// Rota para criar uma nova tarefa
app.post('/tasks', async (req, res) => {
  try {
    const taskData = req.body; // Dados da tarefa enviados no corpo da requisição
    const task = await Task.create(taskData);
    res.json(task); // Retorna a tarefa recém-criada
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar a tarefa' });
  }
});

// Rota para listar todas as tarefas
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar as tarefas' });
  }
});

// Rota raiz
app.get('/', (req, res) => {
  res.send('Bem-vindo à API de gerenciamento de tarefas');
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
