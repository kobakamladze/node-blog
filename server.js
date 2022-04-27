
const mongoose = require("mongoose");
const express = require("express");
const createPath = require("./helpers/create-path");

const { create } = require("./models/post");

const methodOverride = require("method-override");
const postRoutes = require("./routes/post-routes");
const contactRoutes = require("./routes/contact-routes");

const app = express();

app.set('view engine', 'ejs');

const PORT = 3000;

// MongoDB data
const dbName = "node-blog";
const pass = "pass123";
const db = `mongodb+srv://pizzauser:${pass}@cluster0.0x19c.mongodb.net/${dbName}?retryWrites=true&w=majority`;

// Mongoose

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(res => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

app.use(express.static('styles'));

app.use(express.urlencoded({ extended: false }));

app.use(methodOverride("_method"));

// Main page redirect
app.get("/", (req, res) => {
    const title = "Main page";
    res.render(createPath("index"), { title });
});

app.use(postRoutes);
app.use(contactRoutes);

// Error handling
app.use((req, res) => {
    res
        .status(404)
        .render(createPath("error"));
});

app.listen(PORT, (error) => error ? console.log(error) : console.log(`Server has been started on PORT: ${PORT}`));
