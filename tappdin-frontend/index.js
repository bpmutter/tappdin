const express = require("express");
const path = require("path");
const fetch = require('node-fetch');
const userRouter = require('./routes/users');
const cookieParser = require('cookie-parser')

// Create the Express app.
const app = express();

// Set the pug view engine.
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cookieParser());
app.use("/users", userRouter)

// Define a route.
app.get("/", async (req, res) => {
  const data = await fetch("http://localhost:8080/users/1");
  const {user, checkins} = await data.json();

  res.render("index", {user, checkins});
});

app.get(`/users/:id(\\d+)`, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const data = await fetch(`http://localhost:8080/users/${id}`);
  const {user, checkins} = await data.json();

  res.render("index", {user, checkins});
});

app.get("/beers/:id(\\d+)", async (req, res) => {
  const id = parseInt(req.params.id,10);
  const data = await fetch(`http://localhost:8080/beers/${id}`);
  const json = await data.json();
  const {beer, checkins} = json;

  res.render("beer", {beer, checkins})
});

app.get('/breweries/:id(\\d+)', async (req, res) => {
  const id = parseInt(req.params.id,10);
  const data = await fetch(`http://localhost:8080/breweries/${id}`);
  const json = await data.json();
  const {brewery, checkins} = json;
  res.render("brewery", {brewery, checkins})
})

app.get("/create", (req, res) => { res.render("create") });

app.get("/sign-up", (req, res) => {
  res.render("sign-up");
});

app.get("/log-in", (req, res) => {
  res.render("log-in")
})

app.get("/profile", (req, res) => {
  res.render("profile");
})

app.get("/review", (req, res) => {
  res.render("review");
})



// Define a port and start listening for connections.
const port = 4000;

app.listen(port, () => console.log(`Listening on port ${port}...`));
