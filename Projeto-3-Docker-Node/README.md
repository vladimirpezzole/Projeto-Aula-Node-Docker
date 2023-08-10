# Exercício 3. [Projeto-3-Docker-Node](Projeto-3-Docker-Node)
Criar uma **API NodeJS** que apenas retorna uma mensagem tipo **"Hello World!!!"** usando um **container Docker** com **NodeJS**, dispensando a necessidade de instalação do **NodeJS** localmente.

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

- Acesse a pasta do projeto `Projeto-3-Docker-Node` pelo terminal, ou crie caso não exista.

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
**Passo 2:** 
Instalar o servidor `Express`:

```bash
npm install express
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
  "name": "dockernode",
  "version": "1.0.0",
  "description": "Projeto Lab Docker Node",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node app/index.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.18.2",
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
- Acesse a pasta do projeto `Projeto-3-Docker-Node` pelo terminal.

**Passo 2:**  
- Dentro da pasta do projeto, crie uma pasta chamada `app`.
- Dentro da pasta `app`, crie um arquivo chamado `index.js`.

***
**Passo 3:** 
- Abra o arquivo `index.js` dentro da pasta `app` e adicione o seguinte código:

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
**Passo 4:** Criação do **Dockerfile**

- Na raiz do projeto crie um arquivo `Dockerfile` e adicione o seguinte código:

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
**Passo 6:** Construir o container com `build`, o "`.`" indica onde está o `DockerFile`

```bash
docker build -t <nome-usuario>/dockernode .
```
- Comando `build` constrói uma imagem.
- `<nome-usuario>/` é o nome cadastrado no **Docker Hub** >> [hub.docker.com](https://hub.docker.com/), caso não tenha, não precisa colocar.
- `dockernode` nome do Container.
- "`.`" local onde o `Dockerfile` está.

***
**Passo 7:** Após criar a `image <nome-usuario>/dockernode`,
rodar:

```bash
docker run -p 3000:3000 -d <nome-usuario>/dockernode
```

***
**Passo 8:** Verificar se o container está carregado:

```bash
docker ps
```

***
**Passo 9:** >> **Acessar a API**
- Para acessar a API do **NodeJS** siga 
o endereço `localhost` ou `0.0.0.0` na porta `3000` em seu navegador:
> **http://localhost:3000/** 

- Para visualizar as tarefas acesse:
> **http://localhost:3000/tasks**

***
**Passo 10:** >> **Alimentar a API**
- Para alimentar a **API** siga instruções do arquivo [**Como-alimentar-a-sua-API.md**](../Como-alimentar-a-sua-API.md)) na raiz geral do **Projeto-Aula-Node-Docker/**

****
## Comandos básicos Docker
- **Visualizar Containers**
  ```bash
  docker ps -a
  ```
- **Para acessar as pastas via terminal use:**
  ```bash
  docker exec -it <ID> sh
  ```
- **Para acessar as pastas via terminal use:**
  ```bash
  docker exec -it <ID> sh
  ```

<br>

******
+++++++++++++++++++++++++++++++++++++++++++++++++++++
******
>**>>> CONTINUE SOMENTE após concluir o "Exercício 3."** 

## >> Exercício Extra _(opcional)_: Acrescentando Docker Compose

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
**Passo 4:** >> **Alimentar a API**
- Para alimentar a **API** siga instruções do arquivo [**Como-alimentar-a-sua-API.md**](../Como-alimentar-a-sua-API.md)) na raiz geral do **Projeto-Aula-Node-Docker/**

****
**Para acessar as pastas via terminal use:**

```bash
 docker exec -it <ID> sh
```

<br>


************************
********************