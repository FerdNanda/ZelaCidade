//IMPORTAÇÕES

const express = require("express"); //framework para criar o servidor e as rotas
const { criarBanco } = require("./database"); //chave que abri a conexão com o banco de dados

const app = express(); //inicilização:ligando o motor do servidor

app.use(express.json()); //configuração para o servidor entender requisições em formato JSON

//ROTA PRINCIPAL

app.get("/", (req, res) => {
  //rota para listar os produtos
  //resposta da requisição: retorna uma mensagem TEXTO, JSON, HTML
  res.send(`
    <body>
        <h1>Zela Cidade</h1>
        <h2>Gestão de Problemas Urbanos</h2>
        <p>Endpoint que leva aos incidentes cadastrados: /incidentes </p>
    </body>

    `);
});

//PORTA DO SERVIDOR
const PORT = 3000; //porta onde o servidor vai rodar

//listagem do servidor: o servidor começa a rodar e fica escutando as requisições
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

//ROTA PARA LISTAR OS INCIDENTES registrados
app.get("/incidentes", async (req, res) => {
  const db = await criarBanco(); //chama a função para criar a conexão com o banco de dados

  const listaIncidentes = await db.all("SELECT * FROM incidentes"); //consulta SQL para selecionar todos os incidentes da tabela

  res.json(listaIncidentes); //resposta da requisição: retorna os incidentes em formato JSON
});
