const express = require("express")
const cors = require("cors")
require("dotenv").config()
var morgan = require("morgan")
//const mongoose = require("mongoose")
const Person = require("./models/person")

const app = express()

app.use(cors())
app.use(express.static("build"))
app.use(express.json())

// logging data even in the console can be dangerous
// since it can contain sensitive data and may violate local privacy law
morgan.token("body", (req) => JSON.stringify(req.body))
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" })
  }

  next(error)
}

app.use(errorHandler)

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons)
  })
})

app.get("/api/persons/:id", (request, response, next) => {
  const id = request.params.id

  Person.findById(id)
    .then((person) => {
      if (person) response.json(person)
      else response.status(404).end()
    })
    .catch((error) => next(error))
})

app.post("/api/persons", (request, response, next) => {
  const body = request.body

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person
    .save()
    .then((savedPerson) => savedPerson.toJSON())
    .then((savedPersonJson) => response.json(savedPersonJson))
    .catch((error) => next(error))
})

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body
  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedPerson) => {
      response.json(updatedPerson)
    })
    .catch((error) => next(error))
})

app.delete("/api/persons/:id", (request, response, next) => {
  const id = Number(request.params.id)
  Person.findByIdAndRemove(id)
    .then((result) => {
      console.log(result)
      response.status(204).end()
    })
    .catch((error) => next(error))
})

app.get("/info", (request, response) => {
  response.send(`<p>Phonebook has info for people</p>
  <p>${new Date()}<p>
  `)
})

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
