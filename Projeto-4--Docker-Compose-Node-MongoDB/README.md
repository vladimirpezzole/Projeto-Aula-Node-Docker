# Exercício 4. [Projeto-4--Docker-Compose-Node-MongoDB](Projeto-4--Docker-Compose-Node-MongoDB)

Criar uma **API NodeJS** tipo **"Lista de Tarefas"** com banco de dados **MongoDB**, usando **containers Docker** com **NodeJS** e **MongoDB**, orquestrados e gerenciados pelo **Docker Compose**, dispensando a necessidade de intalação dos serviços localmente.

- Verifique se já possui as instalações do `Docker` e `Docker Compose`:

```bash
docker -v
```

```bash
docker-compose -v
//ou
docker compose version
```

- Verifique se o Docker foi instalado corretamente executando o comando:

```bash
sudo docker run hello-world
```

- Caso não tenha ou precise reinstalar o `Docker` e `Docker Compose` consulte o link: [**Como-Instalar-Docker-e-Docker-Compose.md**](Como-Instalar-Docker-e-Docker-Compose.md)
*** 
<br>

****

##  >> Criando a API em um container individual apenas com Docker

- Acesse a pasta do projeto `Projeto-4--Docker-Compose-Node-MongoDB` pelo terminal, ou crie caso não exista.

Siga abaixo caso queira **criar o projeto COM instalação do NodeJS**, caso queira **criar o projeto SEM instalação do NodeJS** siga para **Opção 2**
***
### Opção 1. Configurando projeto COM instalação do NodeJS
> Esta opção é a mais indicada para um **projeto inicial**, mas precisa ter o **NodeJS**  e o gerenciado de pacotes **npm** instalados.

> Após concluir o projeto poderá utilizar sem a necessidade do **NodeJS**  e o gerenciado de pacotes **npm** instalados.

- Para instalação do **NodeJS** e do gerenciador de pacotes **npm** em sistemas **Debian, Ubuntu, Linux Mint** e derivados:

```bash
sudo apt-get install nodejs npm
```


***
**Passo 1:** 
- Execute o comando abaixo para inicializar o projeto e criar o arquivo `package.json` e os outros necessários.
```shell
npm init -y
```
_*Para ignorar as perguntas acrescente `-y`._

***
**Passo 2:** Instalação das dependências
- Execute os seguintes comandos para instalar as dependências necessárias o **servidor web** `express` e o **banco de dados** `mongoose`:
```shell
npm install express mongoose
```

Para desenvolvimento seria muito util instalar também o `nodemon`, esta ferramenta monitora os arquivos do seu aplicativo Node.js para mudanças e reiniciar automaticamente o servidor toda vez que detecta alguma alteração no código-fonte.

```bash
npm install nodemon
```


***
**Passo 3:** 
- Editar `package.json` e atualizar a seção `scripts` para incluir o comando `start`:

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node app/index.js"
  },
```

Para desenvolvimento utilize o `nodemon` no lugar de `node`

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon app/index.js"
  },
```
***
***
### Opção 2. Configurando projeto SEM instalação do NodeJS
> Esta opção dispensa a necessidade de ter o **NodeJS**  e o gerenciado de pacotes **npm** previamente instalados.

> Após finalizar e rodar o projeto certifique-se que o `Dockerfile` tenha criado corretamente na **imagem Docker** os arquivos necessários para o `NodeJS` possa rodar.

***
**Passo 1:** 
- Na raiz do projeto crie o arquivo `package.json`

```json
{
  "name": "projeto-docker-node",
  "version": "1.0.0",
  "description": "Versão do projeto, onde o Node.js e o MongoDB são executados em contêineres separados.",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node app/server.js"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.3.2",
    "nodemon": "^3.0.1"
  }
}
```
- Para desenvolvimento utilize o `nodemon` no lugar de `node`

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon app/index.js"
  },
```

***
***
## >> Criando arquivos estrutura de pastas do projeto:
**Passo 1:** 
- Acesse a pasta do projeto `Projeto-4--Docker-Compose-Node-MongoDB` pelo terminal.

**Passo 2:**  
- Dentro da pasta do projeto, crie uma pasta chamada `app`.
- Dentro da pasta `app`, crie um arquivo chamado `server.js`.

***
**Passo 3:** 
- Abra o arquivo `server.js` dentro da pasta `app` e adicione o seguinte código:

```js
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
**Passo 4:** Criação do **Dockerfile**

- Na raiz do projeto crie um arquivo `Dockerfile` e adicione o seguinte código:

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

> O comando `CMD ["sh", "-c", "npm install && npm start"]` repete o `"npm install"` para garantir que as dependências sejam instaladas e a pasta **node_modules** seja criada.


***
**Passo 5:** 
- Criar arquivo `.dockerignore` para ignorar arquivos e pastas que não deseje incluir na imagem que o  `Dockerfile` irá construir.

```bash
touch .dockerignore
```
- Acrescente o diretório `node_modules` no `.dockerignore`

```bash
echo node_modules >> .dockerignore
```
***
**Passo 6:** Criação do **docker-compose.yml**
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
**Passo 7:** Iniciar os **containers**
- No terminal, execute o comando 

```bash
docker-compose up
```
na raiz do projeto para iniciar os **containers**.

Agora, o **NodeJS** será executado no **container `node`**, enquanto o **MongoDB** será executado no **container `mongo`**. Certifique-se de ter o **Docker** e o **Docker Compose** instalados em sua máquina.


***
**Passo 8:** >> **Acessar a API**
- Para acessar a API do **NodeJS** siga 
o endereço `localhost` ou `0.0.0.0` na porta `3000` em seu navegador:
> **http://localhost:3000/** 

- Para visualizar as tarefas acesse:
> **http://localhost:3000/tasks**

***
**Passo 9:** >> **Alimentar a API**
- Para alimentar a **API** siga instruções do arquivo [**Como-alimentar-a-sua-API.md**](../Como-alimentar-a-sua-API.md)) na raiz geral do **Projeto-Aula-Node-Docker/**

****
**Para acessar as pastas via terminal use:**

```bash
docker exec -it <ID> sh
```
****
## Comandos básicos Docker


1. **docker pull \<imagem>**: Baixa uma imagem do Docker Hub ou de um registro especificado.
   
2. **docker run \<opções> \<imagem>**: Cria e executa um novo container com base na imagem fornecida.

3. **docker ps**: Lista os containers em execução no momento.

4. **docker ps -a**: Lista todos os containers, incluindo os que não estão em execução.
    ```bash
    docker ps -a
    ```

5. **docker stop \<container>**: Para um container em execução de forma ordenada.

6. **docker start \<container>**: Inicia um container que foi parado.

7. **docker restart \<container>**: Para e, em seguida, inicia novamente um container.

8. **docker exec -it \<container> \<comando>**: Executa um comando dentro de um container em execução.
    ```bash
    docker exec -it <ID> sh
    ```

9. **docker rm \<container>**: Remove um container que não está em execução.

10. **docker rmi \<imagem>**: Remove uma imagem local.

11. **docker build -t \<nome_da_imagem> \<caminho_do_Dockerfile>**: Constrói uma nova imagem a partir de um Dockerfile.

12. **docker-compose up**: Inicia serviços definidos em um arquivo `docker-compose.yml`.

13. **docker-compose down**: Para e remove os serviços definidos no arquivo `docker-compose.yml`.

14. **docker network ls**: Lista as redes Docker.

15. **docker volume ls**: Lista os volumes Docker.

Estes são apenas alguns dos comandos básicos. O Docker oferece uma ampla gama de opções para ajudar no gerenciamento de containers e imagens. 

> Acesse a documentação oficial do Docker para obter informações detalhadas sobre cada comando e suas opções.
[>> **https://docs.docker.com/**](https://docs.docker.com/)

<br>
<br>

******
********************