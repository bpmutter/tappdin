const express = require("express");
const path = require("path");
const fetch = require('node-fetch');
const userRouter = require('./routes/users');
const checkinRouter = require('./routes/checkins');
const settingsRouter = require('./routes/settings');
const searchRouter = require('./routes/search');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const { asyncHandler } = require("./routes/utils");
const csrf = require("csurf");

// Create the Express app.
const app = express();

// Set the pug view engine.
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const csrfProtection = csrf({ cookie: true });
app.use("/users", userRouter);
app.use("/checkins", checkinRouter);
app.use("/settings", settingsRouter);
app.use("/search", searchRouter);

app.locals.backend = process.env.BACKEND_URL;

// Define a route.
app.get("/", asyncHandler(async (req, res) => {
  const id = parseInt(req.cookies[`TAPPDIN_CURRENT_USER_ID`], 10);
  if (!id) return res.redirect("/log-in");
  const data = await fetch(`${process.env.BACKEND_URL}/users/${id}`, {
    headers: {
      Authorization: `Bearer ${req.cookies[`TAPPDIN_ACCESS_TOKEN`]}`,
    },
  });
  if (data.status === 401) {
    res.redirect("/log-in");
    return;
  }
  if (id) {
    const { user, checkins } = await data.json();
    const sessionUser = req.cookies["TAPPDIN_CURRENT_USER_ID"];
    checkins.forEach((checkin) => {
      if (sessionUser === checkin.userId) checkin.isSessionUser = true;
      else checkin.isSessionUser = true;
      let displayRating = "";
      for (let i = 1; i <= checkin.rating; i++) {
        displayRating += "🍺";
      }
      checkin.displayRating = displayRating;
      if (!checkin.User.photo) checkin.User.photo = "/imgs/profile-default.jpg";
      date = new Date(checkin.createdAt);
      checkin.createdAt = date.toDateString();
    });
    res.render("index", { user, checkins });
  } else {
    res.render("log-in");
  }

}));

app.get(`/users/:id(\\d+)`, asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const data = await fetch(`${process.env.BACKEND_URL}/users/${id}`, {
    headers: {
      'Authorization': `Bearer ${req.cookies[`TAPPDIN_ACCESS_TOKEN`]}`,
    },
  });
  if (data.status === 401) {
    res.render("log-in");
    return
  }

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

      if (!checkin.User.photo) checkin.User.photo = "/imgs/profile-default.jpg";
      date = new Date(checkin.createdAt);
      checkin.createdAt = date.toDateString();

    })
    if (!user.photo) user.photo = "/imgs/profile-default.jpg";
  }


  res.render("index", { user, checkins });

}));

app.get("/beers/:id(\\d+)", asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const data = await fetch(`${process.env.BACKEND_URL}/beers/${id}`, {
    headers: {
      'Authorization': `Bearer ${req.cookies[`TAPPDIN_ACCESS_TOKEN`]}`,
    },
  });
  if (data.status === 401) {
    res.redirect("/log-in");
    return
  }
  const json = await data.json();
  const { beer, checkins } = json;
  beer.numCheckins = checkins.length;
  beer.image = beer.image || "/imgs/beer-default.jpg";
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
      if (!checkin.User.photo) checkin.User.photo = "/imgs/profile-default.jpg";
      date = new Date(checkin.createdAt);
      checkin.createdAt = date.toDateString();
    });
    
  }

  res.render("beer", { beer, checkins });

}));

app.get('/breweries/:id(\\d+)', asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const data = await fetch(`${process.env.BACKEND_URL}/breweries/${id}`, {
    headers: {
      'Authorization': `Bearer ${req.cookies[`TAPPDIN_ACCESS_TOKEN`]}`,
    },
  });
  if (data.status === 401) {
    res.redirect("log-in");
    return
  } else {
    const json = await data.json();
    const { brewery, checkins, beer } = json;
    brewery.numCheckins = checkins.length;
    brewery.numberOfBeers = beer.length;

    if (checkins.length) {
      const checkinsScores = checkins.map((checkin) => checkin.rating);
      brewery.avgRating =
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
        date = new Date(checkin.createdAt);
        checkin.createdAt = date.toDateString();
      });
      if (!brewery.image) brewery.image = "/imgs/beer-default.jpg";
    }
    res.render("brewery", { brewery, checkins })
  }

}));


app.get("/create", (req, res) => { res.render("create") });

app.get("/sign-up",csrfProtection, (req, res) => {
  res.render("sign-up",{csrfToken: req.csrfToken()});
});
app.get("/log-in",csrfProtection, (req, res) => {
  res.render("log-in",{csrfToken: req.csrfToken()})
})

app.get("/profile", (req, res) => {
  res.render("profile");
})

app.get("/review", (req, res) => {
  res.render("review");
})

app.get("/settings", (req, res) => {
  res.render('settings');
})
app.get("/404", (req, res) => {
  res.render("404");
});

//test pages only
app.get("/search-beer", (req, res) => {
  res.render("search-beer");
});

app.get("/search-brewery", (req, res) => {
  res.render("search-brewery");
});

// Error handler for 404 errors.
app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(404);
    res.render('page-not-found', {
      title: 'Page Not Found',
    });
  } else {
    next(err);
  }
});

// Generic error handler.
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  const isProduction = false;
  res.render('error', {
    title: 'Server Error',
    message: isProduction ? null : err.message,
    stack: isProduction ? null : err.stack,
  });
});


const port = Number.parseInt(process.env.PORT, 10) || 8081;
app.listen(port, () => {
  console.log(`Listening for requests on port ${port}...`);
});

