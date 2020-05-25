const express = require('express');
const {asyncHandler } = require('./utils');
const fetch = require('node-fetch');
const csrf = require("csurf");
const csrfProtection = csrf({ cookie: true });

const router = express.Router();

router.post("/sign-up", asyncHandler(async (req,res)=>{
    const body = req.body;
    console.log(body);
    const backendRes = await fetch(`${process.env.BACKEND_URL}/users/`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!backendRes.ok) {
      const errorMessage =
      "Username or Email already used. Please try again! 🍻";
      res.render("sign-up",{errorMessage});
      //throw backendRes;
    }
    const {
      token,
      user: { id },
    } = await backendRes.json();

    res.cookie(`TAPPDIN_ACCESS_TOKEN`, token);
    res.cookie(`TAPPDIN_CURRENT_USER_ID`, id);
    res.redirect("/");
}));

router.post("/log-in",  asyncHandler(async (req,res)=>{
  const body = req.body;
try{
    const backendRes = await fetch(`${process.env.BACKEND_URL}/users/token`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const backendResJSON = await backendRes.json();
    if (backendResJSON.title === "Login failed") {
      const errorMessage =
        "Incorrect username password combination. Please try again! 🍻";
      res.render("log-in", { errorMessage });
    }
    const token = backendResJSON.token;
    const id = backendResJSON.user.id;

    res.cookie(`TAPPDIN_ACCESS_TOKEN`, token);
    res.cookie(`TAPPDIN_CURRENT_USER_ID`, id);
    res.redirect("/");
  }catch(err){
    console.log(err);
  }
}));


router.get("/log-out", (req, res) => {
  res.cookie(`TAPPDIN_ACCESS_TOKEN`, "");
  res.cookie(`TAPPDIN_CURRENT_USER_ID`, "");
  res.redirect("/log-in");
});

module.exports = router;
