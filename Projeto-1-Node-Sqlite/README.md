# Exercício 1. [Projeto-1-Node-Sqlite]()
Criar, pelo modo convencional, uma **API NodeJS** tipo **"Lista de Tarefas"** com instalação do **NodeJS** usando banco de dados **SQLite**.

**SQLite** é um banco de dados embutido e não requer um servidor separado para ser executado, apenas a **instalação** do **NodeJS** e a dependência **sqlite3**.

- Para instalação do **NodeJS** e do gerenciador de pacotes **npm** em sistemas **Debian, Ubuntu, Linux Mint** e derivados:

```bash
sudo apt-get install nodejs npm
```

<br>

**********
  
##  Criando a API básica para gerenciar uma "Lista de Tarefas" >> (to-do list) com SQLite.

A base da estrutura do projeto a **API** estará dentro da pasta `app` na raiz do projeto. 

Para executar o Projeto siga os passos abaixo:

***
**Passo 1:** Configuração do projeto
- Acesse a pasta do projeto `Projeto-1-Node-Sqlite` pelo terminal, ou crie caso não exista.

- Execute:
```shell
npm init
```
Siga as instruções para configurar um novo projeto Node.js. 

Isso criará arquivos e pastas necessários para o NodeJS: `package.json`, `package-lock.json` e a pasta `node_modules`.

***
**Passo 2:** Instalação das dependências
- Execute os seguintes comandos para instalar as dependências necessárias o **servidor web** `express` e o **banco de dados** `sqlite3`:
```shell
npm install express sqlite3
```

***
**Passo 3:** Criação da estrutura de pastas
- Dentro da pasta do projeto, crie uma pasta chamada `db` para o `SQLite`.
```shell
mkdir db
```
- Dentro da pasta do projeto, crie uma pasta chamada `app`.
```shell
mkdir app
```
- Dentro da pasta `app`, crie um arquivo chamado `server.js`.
```shell
touch server.js
```
***
**Passo 4:** Criação do arquivo `server.js`
- Abra o arquivo `server.js` dentro da pasta `app` e adicione o seguinte código:

```javascript
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


```

***
**Passo 5:** Atualização do arquivo 'package.json'
- Abra o arquivo `package.json` na raiz do projeto e atualize a seção `scripts` para incluir o comando `start`:
```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node app/server.js"
  },
```

***
**Passo 6:** Iniciar o servidor
- No terminal, execute o comando 

```bash
npm start
``` 
para iniciar o servidor.

Agora a **API** estará dentro da pasta `app` na raiz do projeto. Você pode adicionar outras rotas e arquivos relacionados à API dentro dessa estrutura. Certifique-se de atualizar os caminhos dos arquivos e pastas, se necessário.

***
**Passo 7:** >> **Acessar a API**
- Para acessar a API do **NodeJS** siga 
o endereço `localhost` ou `0.0.0.0` na porta `3000` em seu navegador:
> **http://localhost:3000/** 

- Para visualizar as tarefas acesse:
> **http://localhost:3000/tasks**

***
**Passo 8:** >> **Alimentar a API**
- Para alimentar a **API** siga instruções do arquivo [**Como-alimentar-a-sua-API.md**](../Como-alimentar-a-sua-API.md) na raiz geral do **Projeto-Aula-Node-Docker/**

****

<br>