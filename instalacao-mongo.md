## Para instalar o MongoDB no Linux, você pode seguir as etapas abaixo, dependendo da distribuição que está usando:

#### Ubuntu
1. Abra o terminal.
2. Importe a chave pública do repositório MongoDB com o seguinte comando:
   ```
   wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
   ```

3. Adicione o repositório MongoDB ao sistema com o seguinte comando:
   ```
   echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
   ```

4. Atualize o sistema de pacotes com o seguinte comando:
   ```
   sudo apt update
   ```

5. Instale o pacote `mongodb-org` com o seguinte comando:
   ```
   sudo apt install mongodb-org
   ```

6. O MongoDB será instalado e iniciado automaticamente. Você pode verificar o status do serviço com o seguinte comando:
   ```
   sudo systemctl status mongod
   ```
7. Outros comandos úteis
   ```
   sudo systemctl status mongod

   sudo systemctl start mongod

   sudo systemctl stop mongod
   ```

Essas instruções são uma orientação geral e podem variar dependendo da versão específica do Linux que você está usando. Consulte a documentação oficial do MongoDB para obter mais informações e instruções detalhadas de instalação para sua distribuição Linux específica.


*************

## Instalar Mongo via Docker

### Procedimento
1. Baixe a imagem Docker do MongoDB
`docker pull mongodb/mongodb-community-server`

2. Execute a imagem como um contêiner
`docker run --name mongo -d mongodb/mongodb-community-server:latest`

3. Verifique se o contêiner está em execução
Para verificar o status do seu contêiner Docker, execute o seguinte comando:

`docker container ls`

A saída do comando ls lista os seguintes campos que descrevem o contêiner em execução:

- ID do contêiner
- Imagem
- Comando
- Criado
- Status
- Porta
- Nomes

```
CONTAINER ID   IMAGE                                       COMMAND                  CREATED         STATUS         PORTS       NAMES
c29db5687290   mongodb/mongodb-community-server:5.0-ubi8   "docker-entrypoint.s…"   4 seconds ago   Up 3 seconds   27017/tcp   mongo
```

4. Conecte-se à implantação do MongoDB com o mongosh
Abra uma instância interativa do contêiner mongo e conecte-se à implantação com o mongosh.

`docker exec -it mongo mongosh`

5. Valide sua implantação
Para confirmar se sua instância do MongoDB está em execução, execute o comando Hello:

```
db.runCommand(
   {
      hello: 1
   }
)
```

*********

### Testar uma conexão no MongoDB

Usando o comando `telnet` para testar se o MongoDB está conectado à porta padrão (27017). O `telnet` é uma ferramenta de linha de comando que permite a conexão com um servidor em uma determinada porta.

Aqui está um exemplo de como usar o comando `telnet` para testar a conexão com o MongoDB na porta padrão:

```
telnet localhost 27017
```

Isso tentará estabelecer uma conexão com o MongoDB na porta 27017 no seu computador local. Se a conexão for bem-sucedida, você verá uma mensagem semelhante a:

```
Trying 127.0.0.1...
Connected to localhost.
Escape character is '^]'.
```

Isso indica que o MongoDB está conectado à porta 27017 e pronto para aceitar conexões.

Se a conexão não for bem-sucedida, você verá uma mensagem de erro, como:

```
Trying 127.0.0.1...
telnet: Unable to connect to remote host: Connection refused
```

Isso significa que o MongoDB não está conectado à porta 27017 ou não está em execução.

Se `localhost` não funcionar, troque para o IP do contêiner, por exemplo:

```
telnet 172.17.0.2 27017

# Resultado
Trying 172.17.0.2...
Connected to 172.17.0.2.
Escape character is '^]'.
```

Lembre-se de que o comando `telnet` pode não estar disponível por padrão em todos os sistemas operacionais. Em alguns casos, você pode precisar instalá-lo ou usar uma ferramenta alternativa semelhante, como `nc` (netcat), para realizar o teste de conexão.