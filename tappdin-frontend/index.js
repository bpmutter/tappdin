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
    const id = parseInt(req.cookies[`TAPPDIN_CURRENT_USER_ID`],10);
    if(!id) return res.redirect("/log-in");
   const data = await fetch(`http://localhost:8080/users/${id}`, {
     headers: {
       Authorization: `Bearer ${req.cookies[`TAPPDIN_ACCESS_TOKEN`]}`,
     },
   });
   if (data.status === 401) {
     res.redirect("/log-in");
     return;
   }
  console.log("the user id:", id);
  if(id){
   


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
      if (!checkin.User.photo) checkin.User.photo = "/imgs/profile-default.jpg";
    });
    console.log(checkins)
    res.render("index", { user, checkins });



  }

});

app.get(`/users/:id(\\d+)`, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const data = await fetch(`http://localhost:8080/users/${id}`,{
    headers: {
      Authorization: `Bearer ${req.cookies[`TAPPDIN_ACCESS_TOKEN`]}`,
    },});
  if(data.status === 401){
    res.render("log-in");
    return
  }

  const {user, checkins} = await data.json();
  if(checkins.length){
    const sessionUser = parseInt(req.cookies["TAPPDIN_CURRENT_USER_ID"], 10);
    checkins.forEach(checkin => {
      if(sessionUser === checkin.userId) checkin.isSessionUser = true;
      else checkin.isSessionUser = false;
      let displayRating = "";
      for (let i = 1; i <= checkin.rating; i++) {
        displayRating += "🍺";
      }
      checkin.displayRating = displayRating;

      if(!checkin.User.photo) checkin.User.photo = "/imgs/profile-default.jpg";
      
    })
    if(!user.photo) user.photo = "/imgs/profile-default.jpg";
  }


  res.render("index", { user, checkins });

});

app.get("/beers/:id(\\d+)", async (req, res) => {
  const id = parseInt(req.params.id,10);
  const data = await fetch(`http://localhost:8080/beers/${id}`,{
    headers: {
      Authorization: `Bearer ${req.cookies[`TAPPDIN_ACCESS_TOKEN`]}`,
    },});
    if(data.status === 401){
      res.redirect("/log-in");
    return
    }
  const json = await data.json();
  const {beer, checkins} = json;
  beer.numCheckins = checkins.length;

  if(checkins.length){
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
      if (!checkin.User.photo) checkin.User.photo = "/imgs/profile-default.jpg";
    });
    if(!beer.image) beer.image = "/imgs/beer-default.jpg";
  } 
  
  res.render("beer", { beer, checkins });

});

app.get('/breweries/:id(\\d+)', async (req, res) => {
  const id = parseInt(req.params.id,10);
  const data = await fetch(`http://localhost:8080/breweries/${id}`,{
    headers: {
      Authorization: `Bearer ${req.cookies[`TAPPDIN_ACCESS_TOKEN`]}`,
    },});
    if(data.status === 401){
      res.redirect("log-in");
      return
    } else{
  const json = await data.json();
  const {brewery, checkins} = json;

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
      if (!checkin.User.photo) checkin.User.photo = "/imgs/profile-default.jpg";
    });
    
  }
  res.render("brewery", {brewery, checkins})
}

});


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

//delete brewery testing only

app.get('/breweries', (req, res) => {
  res.render('breweries')
})

// Define a port and start listening for connections.
const port = 4000;

app.listen(port, () => console.log(`Listening on port ${port}...`));
