## Projeto Lab Docker Node

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

Editar `Dockerfile`

```Dockerfile
FROM node:alpine

WORKDIR /usr/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
```

Editar `package.json` atualizar a seção `scripts` para incluir o comando `start`:

```json
"start": "node index.js"
```

Criar o arquivo `.dockerignore`

```bash
touch .dockerignore
```

Verificar as instalações do `Docker` e `Docker Compose`

```bash
docker -v
docker-compose -v

docker compose version
```

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

Criar o `docker-compose.yml`

```bash
touch docker-compose.yml
```

```yml
version: "3"

services:
  app:
    build: .
    command: npm start
    ports:
      - "3000:3000"
    volumes:
      - .:/usr/app
```

********

Instalar o `nodemon` e atualizar o nodemon 

```bash
npm install nodemon
```

Editar `package.json` atualizar a seção `scripts` para incluir o `nodemon` no comando `start`:

```json
"start": "nodemon index.js"
```

Montar o container com o comando:

```bash
docker compose down
```

Acessar o endereço `localhost` ou `0.0.0.0` na porta `3000`:
>> **http://localhost:3000/**

```bash
```


************************
********************