## Exercício 2. [Projeto-2-Node-MongoDB]()
Criar, pelo modo convencional, uma **API NodeJS** tipo **"Lista de Tarefas"** com instalação do **NodeJS** usando banco de dados **MongoDB**.

Para usar o **MongoDB**, primeiramente, é preciso instalar o próprio **servidor do MongoDB**:
- Para instalação do **MongoDB** consulte o link: [**instalacao-mongo.md**](instalacao-mongo.md)

Em seguida instalar ou verificar se o **NodeJS** está corretamente instalado:
- Para instalação do **NodeJS** e do gerenciador de pacotes **npm** em sistemas **Debian, Ubuntu, Linux Mint** e derivados:

```bash
sudo apt-get install nodejs npm
```

<br>

****

###  Criando a API básica para gerenciar uma lista de tarefas (to-do list) com MongoDB.

A base da estrutura do projeto a API estará dentro da pasta 'app' na raiz do projeto. 

Para executar o Projeto siga os passos abaixo:

***
**Passo 1:** Configuração do projeto
- Crie uma nova pasta para o projeto.
```shell
mkdir Projeto-2-Node-MongoDB
```
- Navegue até a pasta do projeto no terminal.
- Execute 
```shell
npm init
```
e siga as instruções para configurar um novo projeto Node.js. Isso criará um arquivo `package.json`.

***
**Passo 2:** Instalação das dependências
- Execute os seguintes comandos para instalar as dependências necessárias o **servidor web** `express` e o **banco de dados** `mongoose`:
```shell
npm install express mongoose
```

***
**Passo 3:** Criação da estrutura de pastas
- Dentro da pasta do projeto, crie uma pasta chamada `app`.
- Dentro da pasta `app`, crie um arquivo chamado `server.js`.

***
**Passo 4:** Criação do arquivo `server.js`
- Abra o arquivo `server.js` dentro da pasta `app` e adicione o seguinte código:

```javascript
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

```

***
**Passo 5:** Atualização do arquivo 'package.json'
- Abra o arquivo 'package.json' na raiz do projeto e atualize a seção 'scripts' para incluir o comando 'start':
```json
"scripts": {
  "start": "node app/server.js"
}
```

***
**Passo 6:** Iniciar o servidor
- No terminal, execute o comando `npm start` para iniciar o servidor.

Agora a API estará dentro da pasta 'app' na raiz do projeto. Você pode adicionar outras rotas e arquivos relacionados à API dentro dessa estrutura. Certifique-se de atualizar os caminhos dos arquivos e pastas, se necessário.

***
**Passo 7:** >> **Acessar a API**
- Para acessar a API do **NodeJS** siga 
o endereço `localhost` ou `0.0.0.0` na porta `3000` em seu navegador:
> **http://localhost:3000/** 

- Para visualizar as tarefas acesse:
> **http://localhost:3000/tasks**

***
**Passo 8:** >> **Alimentar a API**
- Para alimentar a **API** siga instruções do arquivo [**Como-alimentar-a-sua-API.md**](../Como-alimentar-a-sua-API.md)) na raiz geral do **Projeto-Aula-Node-Docker/**

****
**Para acessar as pastas via terminal use**

```bash
docker exec -it <ID> sh
```

<br>