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