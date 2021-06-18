const mongoose = require("mongoose");

if (process.argv.length < 5) {
  console.log("Usage: node mongo.js yourpassword Anna 040-1234556");
  process.exit(1);
}

const password = process.argv[2];
const nameArg = process.argv[3];
const numberArg = String(process.argv[4]);

const url = `mongodb+srv://fullstack:${password}@cluster0.0hqej.mongodb.net/fullstack?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

Person.find({}).then((result) => {
  result.forEach((person) => {
    console.log(person);
  });
  mongoose.connection.close();
});

const addedPerson = new Person({
  name: nameArg,
  number: numberArg,
});

addedPerson.save().then((result) => {
  console.log(`added ${nameArg} number ${numberArg} to phonebook`);
  mongoose.connection.close();
});
