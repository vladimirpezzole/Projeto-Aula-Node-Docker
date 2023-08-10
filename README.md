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
sudo apt-get install git-all
```



***
## Criando repositório no "GitHub"
Abaixo está uma lista resumida dos comandos Git para subir um projeto existente para um novo repositório no GitHub:

1. **Crie um novo repositório no GitHub**: Vá para o GitHub, faça login e crie um novo repositório vazio.

2. **No seu terminal, dentro da pasta do projeto existente**:

   a. `git init`: Inicializa um repositório Git local.

   b. `git add .`: Adiciona todas as alterações ao índice (staging area).

   c. `git commit -m "Primeiro commit"`: Confirma as alterações adicionadas com uma mensagem descritiva.

   d. `git branch -M main`: Renomeia o ramo padrão para "main" (ou outro nome de sua preferência).

   e. `git remote add origin <URL_do_seu_repositório_no_GitHub>`: Conecta o repositório local ao repositório remoto no GitHub.

   f. `git push -u origin main`: Envia as alterações locais para o repositório remoto.

3. **Atualize o repositório no GitHub**:

   Após executar o comando `git push`, as alterações do seu projeto estarão no repositório remoto do GitHub.

Lembre-se de substituir `<URL_do_seu_repositório_no_GitHub>` pela URL real do repositório que você criou no GitHub. Certifique-se também de que possui as credenciais corretas configuradas para autenticação.

Este é um fluxo básico para subir um projeto existente para um novo repositório no GitHub. Dependendo das configurações específicas do seu projeto e das preferências de fluxo de trabalho, você pode precisar de comandos adicionais ou opções específicas.
***
***
### Comandos básicos do "Git":

1. **git init**: Inicializa um novo repositório Git local.

2. **git clone \<URL>**: Clona um repositório remoto para o seu sistema local.

3. **git add \<arquivo(s)>**: Adiciona alterações de arquivos ao índice (staging area) para prepará-las para o commit.

4. **git commit -m "\<mensagem>"**: Confirma as alterações adicionadas com uma mensagem de commit descritiva.

5. **git status**: Mostra o status das alterações nos arquivos do seu repositório.

6. **git log**: Exibe o histórico de commits.

7. **git pull**: Puxa as alterações do repositório remoto para o ramo atual.

8. **git push**: Envia os commits locais para o repositório remoto.

9. **git branch**: Lista os ramos presentes no repositório.

10. **git checkout \<ramo>**: Alterna para um ramo específico.

11. **git merge \<ramo>**: Mescla as alterações de um ramo em outro.

12. **git remote add \<nome> \<URL>**: Adiciona um repositório remoto com um nome especificado.

13. **git remote -v**: Lista os repositórios remotos configurados.

14. **git diff**: Mostra as diferenças entre os arquivos modificados e o estado mais recente commit.

15. **git reset \<arquivo>**: Remove um arquivo do índice (staging area).

****
---
****
<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
# Exercícios:
>> **Lembre-se de commitar sempre as principais alterações.**
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

