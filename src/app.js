const express = require("express");
const cors = require("cors");

//Biblioteca que gera um ID unico Universal
const { uuid } = require("uuidv4");

const app = express();

//Faz com que o express entenda 'Json'
app.use(express.json());
//Permite que você faça solicitações de um site para outro no navegador
app.use(cors());

const repositories = [];

//GET /repositories: Rota que lista todos os repositórios;
app.get("/repositories", (request, response) => {

  return response.json(repositories);

});

//POST /repositories: A rota deve receber title, url e techs dentro do corpo da requisição, sendo a URL o link para o github desse repositório. Ao cadastrar um novo projeto, ele deve ser armazenado dentro de um objeto no seguinte formato: { id: "uuid", title: 'Desafio Node.js', url: 'http://github.com/...', techs: ["Node.js", "..."], likes: 0 }; Certifique-se que o ID seja um UUID, e de sempre iniciar os likes como 0.
app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = { id: uuid(), title, url, techs, likes: 0, };

  repositories.push(repository);

  return response.json(repository);
});

//PUT /repositories/:id: A rota deve alterar apenas o title, a url e as techs do repositório que possua o id igual ao id presente nos parâmetros da rota;
app.put("/repositories/:id", (request, response) => {
  const { title, url, techs } = request.body;
  const { id } = request.params;

  const findRepositoryIndex = repositories.findIndex(repository =>
    repository.id === id
  );

  if (findRepositoryIndex === -1) {
    return response.status(400).json({ error: 'Repository does not exists.' })
  }

  const repository = {
    id,
    title,
    url,
    techs,
    likes: repositories[findRepositoryIndex].likes,
  };

  repositories[findRepositoryIndex] = repository

  return response.json(repository)
});

//DELETE /repositories/:id: A rota deve deletar o repositório com o id presente nos parâmetros da rota;
app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const findRepositoryIndex = repositories.findIndex(repository =>
    repository.id === id
  );

  if (findRepositoryIndex >= 0) {
    repositories.splice(findRepositoryIndex, 1);
  } else {
    return response.status(400).json({ error: 'Repository does not exists' });
  }

  return response.status(204).send();
});

//POST /repositories/:id/like: A rota deve aumentar o número de likes do repositório específico escolhido através do id presente nos parâmetros da rota, a cada chamada dessa rota, o número de likes deve ser aumentado em 1;
app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const findRepositoryIndex = repositories.findIndex(repository =>
    repository.id === id
  );

  if (findRepositoryIndex === -1) {
    return response.status(400).json({ error: 'Repository does not exists' });
  }

  repositories[findRepositoryIndex].likes++;

  return response.json(repositories[findRepositoryIndex]);

});
// yarn test
module.exports = app;
