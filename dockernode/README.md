# Projeto Lab Docker Node

## Criando container individual apenas com Docker

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

Editar `index.js`

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
Editar `Dockerfile`

```Dockerfile
FROM node:alpine

WORKDIR /usr/app

# Copie apenas os arquivos relacionados ao npm
COPY package*.json ./
RUN npm install

# Copie o restante dos arquivos do projeto
COPY . .

EXPOSE 3000

# Usando JSON array para executar npm install e tail -f /dev/null

# Para Desenvolvimento usar:
# CMD ["sh", "-c", "npm install && tail -f /dev/null"]

# Para produção usar
CMD ["sh", "-c", "npm install && npm start"]
```
>> O comando `CMD ["sh", "-c", "npm install && npm start"]` repete o `"npm install"` para garantir que as dependências sejam instaladas e a pasta **node_modules** seja criada.

Editar `package.json` atualizar a seção `scripts` para incluir o comando `start`:

```json
"start": "node index.js"
```

Para desenvolvimento utilize o `nodemon` no lugar de `node`

```json
"start": "nodemon index.js"
```


Criar o arquivo `.dockerignore`

```bash
touch .dockerignore
```

Acrescentar o diretorio  `node_modules` no `.dockerignore`

```bash
echo node_modules >> .dockerignore
```

Verificar as instalações do `Docker` e `Docker Compose`

```bash
docker -v
docker-compose -v

docker compose version
```
*** 

Construir o container com `build`, o `.` indica onde está o `DockerFile`

```bash
docker build -t <nome-usuario>/dockernode .
```

Após criar a `image <nome-usuario>/dockernode`,
rodar:

```bash
docker run -p 3000:3000 -d <nome-usuario>/dockernode
```

Verificar se o container está carregado:

```bash
docker ps
```

Acessar o endereço `localhost` ou `0.0.0.0` na porta `3000`:
>> **http://localhost:3000/**

Para acessar as pastas

```bash
docker docker exec -it <ID> sh
```

## Usando Docker Compose

Criar o `docker-compose.yml`

```bash
touch docker-compose.yml
```

```yml
version: "3"

services:
  dockernode-app:
    build: .
    container_name: "dockernode-app"
    ports:
      - "3000:3000"
    volumes:
      - .:/usr/app
```

********

Montar o container com o comando:

```bash
docker compose up
```

Acessar o endereço `localhost` ou `0.0.0.0` na porta `3000`:
>> **http://localhost:3000/**

```bash
```


************************
********************