const express = require("express");
const cors = require("cors");
const { uuid, isUuid } = require("uuidv4");

// const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  const { id, title, url, techs, likes } = request.query;

  const results = { title }
    ? repositories.filter(project => project.title.includes(title))
    : repositories
  return response.json(results);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs, likes } = request.body;

  const project = { id: uuid(), title, url, techs, likes };

  repositories.push(project);

  return response.json(project);
});

app.put("/repositories/:id", (request, response) => {
  // TODO
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

module.exports = app;
