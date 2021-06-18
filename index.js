const express = require("express");
const cors = require("cors");
require("dotenv").config();
var morgan = require("morgan");
const mongoose = require("mongoose");
const Person = require("./models/Person");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("build"));

// logging data even in the console can be dangerous
// since it can contain sensitive data and may violate local privacy law
morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

var persons = [
  {
    id: 1,
    name: "etunimi sukunimi",
    number: 123123123,
  },
  {
    id: 2,
    name: "etunimi sukunimi",
    number: 123123123,
  },
  {
    id: 3,
    name: "etunimi sukunimi",
    number: 123123123,
  },
  {
    id: 4,
    name: "etunimi sukunimi",
    number: 123123123,
  },
];

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;

  Person.findById(id).then((person) => {
    response.json(person);
  });
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id != id);
  response.status(204).end();
});

app.get("/info", (request, response) => {
  response.send(`<p>Phonebook has info for ${persons.length} people</p>
  <p>${new Date()}<p>
  `);
});

const PORT = process.env.PORT || 80;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
