const persons = require("./data.js")
console.log(persons)

const express = require('express')
const { response } = require('express')
const app = express();

app.use(express.json())

// gauti visus / konkretu

app.get("/users", (req, res) => {
    res.send(persons)
})

app.get("/users/:id", (req, res) => {
    const person = persons.find((person)=> person.id === parseInt(req.params.id))
    if(!person){
        res.status(404).send("person in data does not exist")
    } else {
        res.send(person)
    }
})

// irasyti nauja

app.post("/users", (req, res)=>{
    const newPerson = {
        id: 0,
        name: 'kestutis',
        lastname: 'admin',
        email: 'private',
        gender: 'unavailable',
    }
    persons.push(newPerson)
    res.send(persons)
})

// atnaujinti pagal id

app.put("/users/:id", (req, res)=>{
    const person = persons.find((person)=> person.id === parseInt(req.params.id))
    if (!person){
        res.status(404).send("person was not found")
    }
    person.gender = req.body.gender
    res.send(person)
})

// istrinti

app.delete("/users/:id", (req, res) => {
    const person = persons.find((person)=>person.id === parseInt(req.params.id))
    if (!person){
        res.status(404).send("person was not found")
    }

    const personIndex = persons.indexOf(person)
    persons.splice(personIndex, 1);
    res.send(person)
})








const PORT = 3000;
app.listen(PORT, ()=>{
    console.log("server is running on " + PORT)
})