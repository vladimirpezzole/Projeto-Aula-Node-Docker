Para alimentar a sua API de demonstração e criar algumas tarefas para teste, você pode seguir os seguintes passos:

1. Use uma ferramenta de API client, como o Postman (https://www.postman.com/) ou o cURL (https://curl.se/), para fazer requisições HTTP para a sua API.

2. Envie uma requisição POST para a rota `/tasks` para criar uma nova tarefa. Por exemplo, usando o cURL, você pode executar o seguinte comando no terminal:

   ```bash
   curl -X POST -H "Content-Type: application/json" -d '{"title": "Tarefa 1", "description": "Descrição da Tarefa 1", "completed": false}' http://localhost:3000/tasks
   ```

   Isso enviará uma requisição POST com um corpo JSON contendo os detalhes da tarefa. A resposta da API deve retornar os detalhes da tarefa recém-criada.

3. Repita o passo anterior para criar mais tarefas, modificando os dados no corpo JSON para cada requisição.

4. Para listar todas as tarefas, você pode fazer uma requisição GET para a rota `/tasks`. Por exemplo, usando o cURL:

   ```bash
   curl http://localhost:3000/tasks
   ```

   Isso retornará um array JSON contendo todas as tarefas existentes na sua lista.

Dessa forma, você pode usar o cliente de API de sua escolha para enviar requisições POST para criar tarefas e requisições GET para recuperar as tarefas existentes. Isso permitirá que você alimente e teste a sua API de demonstração.

Lembre-se de adaptar os comandos para a ferramenta de API client que você estiver utilizando, seja o Postman, cURL ou qualquer outra.