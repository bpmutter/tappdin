const express = require('express');
const {asyncHandler } = require('./utils');
const fetch = require('node-fetch');

const router = express.Router();

router.post("/sign-up", asyncHandler(async (req,res)=>{
    const body = req.body;

    const backendRes = await fetch("http://localhost8080/users", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json", 
      },
    });
    if (!backendRes.ok) {
      throw backendRes;
    }
    const {
      token,
      user: { id },
    } = await backendRes.json();

    res.cookie[`TWITTER_LITE_ACCESS_TOKEN`] = token;
    res.cookie[`TWITTER_LITE_CURRENT_USER_ID`] = id;
    res.redirect("/");
}));

router.post("/log-in",  asyncHandler(async (req,res)=>{
  const body = req.body;
  const backendRes = await fetch("http://localhost8080/users", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json", 
      },
  });
  if (!backendRes.ok) {
    throw backendRes;
  }
  const {
    token,
    user: { id },
  } = await backendRes.json();

  res.cookie[`TWITTER_LITE_ACCESS_TOKEN`] = token;
  res.cookie[`TWITTER_LITE_CURRENT_USER_ID`] = id;
  res.redirect("/");

}));


router.get("/log-out", (req, res) => {
  res.cookie[`TWITTER_LITE_ACCESS_TOKEN`] = "";
  res.cookie[`TWITTER_LITE_CURRENT_USER_ID`] = "";
  res.redirect("/users/log-in");
});

module.exports = router;

