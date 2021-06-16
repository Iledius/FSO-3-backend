const express = require("express");
const app = express();

app.use(express.json());

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
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  // Sometimes id in data and id in request are not same format.
  // => change string to Number if they don't match.
  let person = persons.find((person) => person.id === id);
  if (!person) {
    person = persons.find((person) => person.id === Number(id));
  }
  if (person) response.json(person);
  else response.status(404).end();
});

app.post("/api/persons", (request, response) => {
  const person = request.body;
  const newId = getRandomInt(50000);
  person.id = newId;

  if (!person.name || !person.number) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  if (persons.find((findPerson) => findPerson.name == person.name)) {
    return response.status(400).json({
      error: "name already exists",
    });
  }

  persons = persons.concat(person);
  response.json(person);
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

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
