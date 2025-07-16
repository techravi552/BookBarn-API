const express = require("express")
const mongoose = require("mongoose")
const Author = require("./models/Author")

const app = express()
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/BookDB")
  .then(() => console.log("Mongo DB connected"))
  .catch((err) => console.log(" error:", err))

app.get("/", (req, res) => {
  res.send(" Book & Author Management API ");
})

app.post("/authors", (req, res) => {
  const author = new Author(req.body);
  author.save()
    .then((data) => res.status(201).send(data))
    .catch((err) => res.status(400).send({ error: err.message }));
})

app.get("/authors", (req, res) => {
  Author.find()
    .then((authors) => res.send(authors))
    .catch((err) => res.status(500).send({ error: err.message }));
});

app.put("/authors/:id", (req, res) => {
  Author.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updated) => {
      if (!updated) return res.status(404).send({ message: "Not found" })
      res.send(updated)
    })
    .catch((err) => res.status(400).send({ error: err.message }))
});

app.delete("/authors/:id", (req, res) => {
  Author.findByIdAndDelete(req.params.id)
    .then((deleted) => {
      if (!deleted) return res.status(404).send({ message: "books not found" })
      res.send({ message: "deleted" })
    })
    .catch((err) => res.status(400).send({ error: err.message }))
});

app.listen(5000, () => {
  console.log("server.js is running")
});
