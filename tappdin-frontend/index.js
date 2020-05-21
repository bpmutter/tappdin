const express = require("express");
const path = require("path");
const fetch = require('node-fetch');
const userRouter = require('./routes/users');
const checkinRouter = require('./routes/checkins')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');

// Create the Express app.
const app = express();

// Set the pug view engine.
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/users", userRouter);
app.use("/checkins", checkinRouter);

// Define a route.
app.get("/", async (req, res) => {

  const id = parseInt(req.cookies[`TAPPDIN_CURRENT_USER_ID`], 10);
  if (id) {
    const data = await fetch(`http://localhost:8080/users/${id}`);
    const { user, checkins } = await data.json();
    const sessionUser = req.cookies["TAPPDIN_CURRENT_USER_ID"];
    checkins.forEach((checkin) => {
      if (sessionUser === checkin.userId) checkin.isSessionUser = true;
      else checkin.isSessionUser = true;
      let displayRating = "";
      for(let i =1; i <=checkin.rating; i++){
        displayRating+="🍺";
      }
      checkin.displayRating = displayRating;
    });
    console.log(checkins)
    res.render("index", { user, checkins });
  } else {
    res.render("log-in");
  }

});

app.get(`/users/:id(\\d+)`, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const data = await fetch(`http://localhost:8080/users/${id}`);
  const { user, checkins } = await data.json();
  if (checkins.length) {
    const sessionUser = parseInt(req.cookies["TAPPDIN_CURRENT_USER_ID"], 10);
    checkins.forEach(checkin => {
      if (sessionUser === checkin.userId) checkin.isSessionUser = true;
      else checkin.isSessionUser = false;
      let displayRating = "";
      for (let i = 1; i <= checkin.rating; i++) {
        displayRating += "🍺";
      }
      checkin.displayRating = displayRating;
      
    })
  }
  res.render("index", { user, checkins });
});

app.get("/beers/:id(\\d+)", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const data = await fetch(`http://localhost:8080/beers/${id}`);
  const json = await data.json();
  const { beer, checkins } = json;
  beer.numCheckins = checkins.length;

  if (checkins.length) {
    const checkinsScores = checkins.map((checkin) => checkin.rating);
    beer.avgRating =
      checkinsScores.reduce((sum, rating) => {
        sum += rating;
      }) / checkins.length;
    const sessionUser = parseInt(req.cookies["TAPPDIN_CURRENT_USER_ID"], 10);
    checkins.forEach((checkin) => {
      if (sessionUser === checkin.userId) checkin.isSessionUser = true;
      else checkin.isSessionUser = false;
      let displayRating = "";
      for (let i = 1; i <= checkin.rating; i++) {
        displayRating += "🍺";
      }
      checkin.displayRating = displayRating;
    });
  }

  res.render("beer", { beer, checkins });
});

app.get('/breweries/:id(\\d+)', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const data = await fetch(`http://localhost:8080/breweries/${id}`);
  const json = await data.json();
  const { brewery, checkins } = json;

  if (checkins.length) {
    const sessionUser = parseInt(req.cookies["TAPPDIN_CURRENT_USER_ID"], 10);
    checkins.forEach((checkin) => {
      if (sessionUser === checkin.userId) checkin.isSessionUser = true;
      else checkin.isSessionUser = false;
      let displayRating = "";
      for (let i = 1; i <= checkin.rating; i++) {
        displayRating += "🍺";
      }
      checkin.displayRating = displayRating;
    });
    
  }
  res.render("brewery", { brewery, checkins })
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

// settings page added for testing needs to be editted later

app.get("/settings", (req, res) => {
  res.render('settings');
})

// Define a port and start listening for connections.
const port = 4000;

app.listen(port, () => console.log(`Listening on port ${port}...`));
