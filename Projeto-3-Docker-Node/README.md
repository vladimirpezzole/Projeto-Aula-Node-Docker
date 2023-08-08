## Exercício 3. [Projeto-3-Docker-Node](Projeto-3-Docker-Node)
Criar uma **API NodeJS** que apenas retorna uma mensagem tipo **"Hello World!!!"** usando um **container Docker** com **NodeJS**, dispensando a necessidade de instalação do **NodeJS** localmente.

- Para Instalar o **Docker** consulte o link: [**Como-Instalar-Docker-e-Docker-Compose.md**](Como-Instalar-Docker-e-Docker-Compose.md)

<br>

****

###  Criando a API em um container individual apenas com Docker

Começando o projeto Node com o comando:

```bash
npm init -y
```

Que vai criar o `package.json`

Em seguida criar os arquivos `index.js` e `Dockerfile`:

```bash
touch index.js
touch Dockerfile
```

Instalar o servidor `Express`:

```bash
npm install express
```

Para desenvolvimento seria muito util instalar também o `nodemon`, esta ferramenta monitora os arquivos do seu aplicativo Node.js para mudanças e reiniciar automaticamente o servidor toda vez que detecta alguma alteração no código-fonte.

```bash
npm install nodemon
```
****

## Criando arquivos do projeto:

**Passo 1:** Criação do arquivo `index.js`

```js
const express = require("express");

const PORT = 3000;
const HOST = '0.0.0.0';

const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Hello World!!!</h1>");
});

app.listen(PORT, HOST);
```

***
**Passo 2:** Criação do **Dockerfile**
Editar `Dockerfile`

```Dockerfile
FROM node:alpine

WORKDIR /usr/app

## Copie apenas os arquivos relacionados ao npm
COPY package*.json ./
RUN npm install

## Copie o restante dos arquivos do projeto
COPY . .

EXPOSE 3000

## Usando JSON array para executar npm install e tail -f /dev/null

## Para Desenvolvimento usar:
# CMD ["sh", "-c", "npm install && tail -f /dev/null"]

## Para produção usar
CMD ["sh", "-c", "npm install && npm start"]
```

>> O comando `CMD ["sh", "-c", "npm install && npm start"]` repete o `"npm install"` para garantir que as dependências sejam instaladas e a pasta **node_modules** seja criada.

***
**Passo 3:** Editar `package.json` e atualizar a seção `scripts` para incluir o comando `start`:

```json
"start": "node index.js"
```

Para desenvolvimento utilize o `nodemon` no lugar de `node`

```json
"start": "nodemon index.js"
```

***
**Passo 4:** Criar o arquivo `.dockerignore`

```bash
touch .dockerignore
```

***
**Passo 3:** Acrescentar o diretorio  `node_modules` no `.dockerignore`

```bash
echo node_modules >> .dockerignore
```

***
**Passo 4:** Verificar as instalações do `Docker` e `Docker Compose`

```bash
docker -v
docker-compose -v

docker compose version
```
*** 

***
**Passo 5:** Construir o container com `build`, o `.` indica onde está o `DockerFile`

```bash
docker build -t <nome-usuario>/dockernode .
```

***
**Passo 6:** Após criar a `image <nome-usuario>/dockernode`,
rodar:

```bash
docker run -p 3000:3000 -d <nome-usuario>/dockernode
```

***
**Passo 7:** Verificar se o container está carregado:

```bash
docker ps
```

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
**Para acessar as pastas via terminal use**

```bash
docker exec -it <ID> sh
```

<br>

******
+++++++++++++++++++++++++++++++++++++++++++++++++++++
******
>**>>> CONTINUE SOMENTE após concluir o "Exercício 3."** 

## Exercício Extra: Usando Docker Compose

***
**Passo 1:** Criar o `docker-compose.yml`

```bash
touch docker-compose.yml
```

```yml
version: "3"

services:
  docker-node-app:
    build: .
    container_name: "docker-node-app"
    ports:
      - "3000:3000"
    volumes:
      - .:/usr/app
```

***
**Passo 2:** Montar o container com o comando:

```bash
docker compose up
```

***
**Passo 3:** >> **Acessar a API**
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


************************
********************