# Projeto Aula Node com Docker

>> A intenção deste projeto é oferecer **exercícios didáticos** para compreender a diferença entre um projeto **sem uso** de **containers** e **com uso** de **containers** utilizando **Docker** e **Docker Compose**.
Para cada exercício será criada uma **API** simples com **NodeJS** para demonstrar esses conceitos.

***
- **Para iniciar o projeto acesse a pasta  `Projeto-Aula-Node-Docker` pelo terminal, ou crie a pasta caso não exista com o comando.**

  ```shell
  mkdir Projeto-Aula-Node-Docker
  ```

- Em seguinda inicie o versionamento de arquivos **Git**.

<br>

***
## Instalando e iniciando gerenciamento de versões "Git"
Antes de iniciar os exercícios, verifique se o **Git** está instalado:

```bash
git --version
```

Caso precise instalar o **Git** execute:

```bash
sudo apt install git
```

***
### Comandos básicos do "Git" pra versionamento:
Cria um nova Branch >> $   `git checkout -b 'Nome-da-Branch'`

Verifica em qual branch está >> $   `git branch`

Adiciona todos os arquivos >> $   `git add -A` 

Adiciona um ou mais arquivos arquivos >> $   `git add 'nome-do-arquivo'`

Verifica o status >> $   `git status`

Faz um Commit >> $ `git commit -m 'descrição-do-Commit'`

Faz o Push pro repositório >> $ `git push origin nome-da-branch`

Troca de Branch  >> $ `git checkout nome-da-branch`

Faz Merge da Branch na Main >> $ `git push origin nome-da-branch`
***
## Criando repositório no "GitHub"
O repositório pode ser criado no início ou no final dos exercícios.

```bash
git --version
```

***
---
****

# Exercícios:
## >> Exercício 1. [Projeto-1-Node-Sqlite](Projeto-1-Node-Sqlite)
Criar, pelo modo convencional, uma **API NodeJS** tipo **"Lista de Tarefas"** com instalação do **NodeJS** usando banco de dados **SQLite**.

**SQLite** é um banco de dados embutido e não requer um servidor separado para ser executado, apenas a **instalação** do **NodeJS** e a dependência **sqlite3**.

- Para instalação do **NodeJS** e do gerenciador de pacotes **npm** em sistemas **Debian, Ubuntu, Linux Mint** e derivados:

```bash
sudo apt-get install nodejs npm
```

<br>

> **Para este execício basta seguir as instruções em:** 
[**Projeto-1-Node-Sqlite/README.md**](Projeto-1-Node-Sqlite/README.md).

<br>

****
## >> Exercício 2. [Projeto-2-Node-MongoDB](Projeto-2-Node-MongoDB)
Criar, pelo modo convencional, uma **API NodeJS** tipo **"Lista de Tarefas"** com instalação do **NodeJS** usando banco de dados **MongoDB**.

Para usar o **MongoDB**, primeiramente, é preciso instalar o próprio **servidor do MongoDB**:
- Para instalação do **MongoDB** consulte o link: [**instalacao-mongo.md**](instalacao-mongo.md)

Em seguida instalar ou verificar se o **NodeJS** está corretamente instalado:
```bash
node --version //verifica versão NodeJS
npm --version //verifica versão Gerenciador de pacotes Npm
```
- Para instalação do **NodeJS** e do gerenciador de pacotes **npm** em sistemas **Debian, Ubuntu, Linux Mint** e derivados:

```bash
sudo apt-get install nodejs npm
```

<br>

> **Para este execício basta seguir as instruções em** [**Projeto-2-Node-MongoDB/README.md**](Projeto-2-Node-MongoDB/README.md).

<br>

****
## >> Exercício 3. [Projeto-3-Docker-Node](Projeto-3-Docker-Node)
Criar uma **API NodeJS** que apenas retorna uma mensagem tipo **"Hello World!!!"** usando um **container Docker** com **NodeJS**, dispensando a necessidade de instalação do **NodeJS** localmente.

- Para Instalar o **Docker** consulte o link: [**Como-Instalar-Docker-e-Docker-Compose.md**](Como-Instalar-Docker-e-Docker-Compose.md)

<br>

>**Para este execício basta seguir as instruções em** [**Projeto-3-Docker-Node/README.md**](Projeto-3-Docker-Node/README.md).

<br>


****
## >> Exercício 4. [Projeto-4--Docker-Compose-Node-MongoDB](Projeto-4--Docker-Compose-Node-MongoDB)

Criar uma **API NodeJS** tipo **"Lista de Tarefas"** com banco de dados **MongoDB**, usando **containers Docker** com **NodeJS** e **MongoDB**, orquestrados e gerenciados pelo **Docker Compose**, dispensando a necessidade de intalação dos serviços localmente.

- Para Instalar o **Docker** e **Docker Compose** consulte o link: [**Como-Instalar-Docker-e-Docker-Compose.md**](Como-Instalar-Docker-e-Docker-Compose.md)

<br>

>**Para este execício basta seguir as instruções em** [**Projeto-4--Docker-Compose-Node-MongoDB/README.md**](Projeto-4--Docker-Compose-Node-MongoDB/README.md).

<br>

