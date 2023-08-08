## Exercício 4. [Projeto-4--Docker-Compose-Node-MongoDB](Projeto-4--Docker-Compose-Node-MongoDB)

Criar uma **API NodeJS** tipo **"Lista de Tarefas"** com banco de dados **MongoDB**, usando **containers Docker** com **NodeJS** e **MongoDB**, orquestrados e gerenciados pelo **Docker Compose**, dispensando a necessidade de intalação dos serviços localmente.

- Para Instalar o **Docker** e **Docker Compose** consulte o link: [**Como-Instalar-Docker-e-Docker-Compose.md**](Como-Instalar-Docker-e-Docker-Compose.md)

<br>

**********

###  Criando a API básica para gerenciar uma lista de tarefas (to-do list) com MongoDB usando Docker e Docker Compose.
A base da estrutura do projeto a API estará dentro da pasta 'app' na raiz do projeto. 

Para executar o Projeto siga os passos abaixo:

***
**Passo 1:** Configuração do projeto
- Crie uma nova pasta para o projeto.
```shell
mkdir Projeto-4--Docker-Compose-Node-MongoDB
```
- Navegue até a pasta do projeto no terminal.
- Execute 
```shell
npm init
```
e siga as instruções para configurar um novo projeto **NodeJS**. Isso criará um arquivo `package.json`.

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
const mongoHost = process.env.MONGO_HOST || 'mongo-docker';
const mongoPort = process.env.MONGO_PORT || '27017';

// Conectar ao MongoDB
  const mongoURI = `mongodb://${mongoHost}:${mongoPort}/todo`;
  
  mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('Conexão com o MongoDB estabelecida com sucesso!');
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
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node app/server.js"
  },
```

>Certifique-se de que a estrutura do arquivo `package.json` esteja correta, com vírgulas adequadas para separar os campos.

>Salve as alterações no arquivo `package.json`.

<br>

***************************************************
***************************************************
## Criando arquivos necessários para os containers:

***
**Passo 1:** Criação do **Dockerfile**
- Crie um arquivo chamado `Dockerfile` na raiz do projeto e adicione o seguinte conteúdo:

```Dockerfile
# Imagem base para o Node.js
FROM node:latest

# Diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiar o arquivo package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instalar as dependências do projeto
RUN npm install
#RUN npm install express mongoose

# Copiar o restante dos arquivos do projeto para o diretório de trabalho
COPY . .

# Expor a porta 3000 para acesso externo
EXPOSE 3000

## Usando JSON array para executar npm install e tail -f /dev/null

## Para Desenvolvimento usar:
# CMD ["sh", "-c", "npm install && tail -f /dev/null"]

## Para produção usar
CMD ["sh", "-c", "npm install && npm start"]

```

<br>

***
**Passo 2:** Criação do **docker-compose.yml**
- Crie um arquivo chamado `docker-compose.yml` na raiz do projeto e adicione o seguinte conteúdo:

```yaml
version: '3'
services:
  docker-compoose-node-app:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: "docker-compoose-node-app"
    command: npm start
    volumes:
      - .:/app
    ports:
      - 3000:3000
    depends_on:
      - mongo-docker

  mongo-docker:
    image: mongo:4.4.6
    container_name: "mongo-docker"
    volumes:
      - ./data:/data/db
      - ./:/app
    ports:
      - 27017:27017
    environment:
      - MONGO_HOST=mongo

```

***
**Passo 3:** Iniciar os **containers**
- No terminal, execute o comando 

```bash
docker-compose up
```
na raiz do projeto para iniciar os **containers**.

Agora, o **NodeJS** será executado no **container `node`**, enquanto o **MongoDB** será executado no **container `mongo`**. Certifique-se de ter o **Docker** e o **Docker Compose** instalados em sua máquina.

***
**Passo 4:** >> **Acessar a API**
- Para acessar a API do **NodeJS** siga 
o endereço `localhost` ou `0.0.0.0` na porta `3000` em seu navegador:
> **http://localhost:3000/** 

- Para visualizar as tarefas acesse:
> **http://localhost:3000/tasks**

***
**Passo 5:** >> **Alimentar a API**
- Para alimentar a **API** siga instruções do arquivo [**Como-alimentar-a-sua-API.md**](../Como-alimentar-a-sua-API.md)) na raiz geral do **Projeto-Aula-Node-Docker/**

****
**Para acessar as pastas via terminal use**

```bash
 docker exec -it <ID> sh
```

<br>