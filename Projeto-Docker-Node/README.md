Versão do projeto, onde o Node.js e o MongoDB são executados em contêineres separados.


Para executar o Projeto siga os passos abaixo:

Passo 1: Configuração do projeto
- Crie uma nova pasta para o projeto.
- Navegue até a pasta do projeto no terminal.
- Execute `npm init` e siga as instruções para configurar um novo projeto Node.js. Isso criará um arquivo `package.json`.

Passo 2: Instalação das dependências
- Execute os seguintes comandos para instalar as dependências necessárias:
```shell
npm install express mongoose
```

Passo 3: Criação da estrutura de pastas
- Dentro da pasta do projeto, crie uma pasta chamada 'app'.
- Dentro da pasta 'app', crie um arquivo chamado 'server.js'.

Passo 4: Criação do arquivo 'server.js'
- Abra o arquivo 'server.js' dentro da pasta 'app' e adicione o seguinte código:
   Certifique-se de que a estrutura do arquivo `package.json` esteja correta, com vírgulas adequadas para separar os campos.

Passo 5: Atualização do arquivo 'package.json'
- Abra o arquivo 'package.json' na raiz do projeto e atualize a seção 'scripts' para incluir o comando 'start':
```json
"scripts": {
  "start": "node app/server.js"
}
```

Passo 6: Salve as alterações no arquivo `package.json`.


****
Agora para os containers:

Passo 1: Criação dos arquivos do projeto
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

# Copiar o restante dos arquivos do projeto para o diretório de trabalho
COPY . .

# Expor a porta 3000 para acesso externo
EXPOSE 3000

# Comando para iniciar a aplicação
CMD [ "npm", "start" ]

```

- Crie um arquivo chamado `docker-compose.yml` na raiz do projeto e adicione o seguinte conteúdo:

```yaml
version: '3'
services:
  node-docker:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: "node-docker"
    command: npm start
    volumes:
      - .:/app
    ports:
      - 3000:3000
    depends_on:
      - mongo-docker

  mongo-docker:
    image: mongo:latest
    container_name: "mongo-docker"
    volumes:
      - ./data:/data/db
      - ./:/app
    ports:
      - 27017:27017
    environment:
      - MONGO_HOST=mongo

```

Passo 2: Estrutura do projeto
- Dentro da pasta do projeto, crie uma pasta chamada `app`.
- Dentro da pasta `app`, crie um arquivo chamado `server.js` e adicione o seguinte código:

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

Passo 3: Iniciar os contêineres
- No terminal, execute o comando `docker-compose up` na raiz do projeto para iniciar os contêineres.

Agora, o Node.js será executado no contêiner `node`, enquanto o MongoDB será executado no contêiner `mongo`. Certifique-se de ter o Docker e o Docker Compose instalados em sua máquina.

Você pode acessar a API do Node.js através do `localhost:3000` em seu navegador ou usar outras ferramentas para fazer requisições para a API.