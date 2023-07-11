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

