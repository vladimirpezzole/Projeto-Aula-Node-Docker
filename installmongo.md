Para instalar o MongoDB no Linux, você pode seguir as etapas abaixo, dependendo da distribuição que está usando:

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
7. Outros comandos uteis
   ```
   sudo systemctl status mongod

   sudo systemctl start mongod

   sudo systemctl stop mongod
   ```

Essas instruções são uma orientação geral e podem variar dependendo da versão específica do Linux que você está usando. Consulte a documentação oficial do MongoDB para obter mais informações e instruções detalhadas de instalação para sua distribuição Linux específica.