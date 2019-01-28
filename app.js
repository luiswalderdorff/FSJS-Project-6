const express = require("express");
const projects = require("./data.json").projects;

const app = express();

app.use("/static", express.static("public"));

app.set('view engine', 'pug');


app.get('/', (req, res) => {
    console.log(projects);
    res.render("index", { projects })
});

app.get('/about', (req, res) => {
    res.render("about")
});

app.get("/project/:id", (req, res) => {
  const { id } = req.params;
  res.render("project", { projects, id })
});

app.use((req, res, next) => {
  const err = new Error("Whoops! This page does not exist.");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status);
  res.render("error", { error: err });
  next(err);
});

app.listen(3000, () => {
    console.log('The application is running on localhost:3000!');
});
