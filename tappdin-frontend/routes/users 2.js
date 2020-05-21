const express = require('express');
const {asyncHandler } = require('./utils');
const fetch = require('node-fetch');

const router = express.Router();

router.post("/sign-up", asyncHandler(async (req,res)=>{
    const body = req.body;

    const backendRes = await fetch("http://localhost:8080/users/", {
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

    res.cookie(`TAPPDIN_ACCESS_TOKEN`, token);
    res.cookie(`TAPPDIN_CURRENT_USER_ID`, id);
    res.redirect("/");
}));

router.post("/log-in",  asyncHandler(async (req,res)=>{
  const body = req.body;
  const backendRes = await fetch("http://localhost:8080/users/token", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const backendResJSON = await backendRes.json();
  if (!backendResJSON.user || !backendResJSON.token) {
    throw backendRes;
  }
  const token = backendResJSON.token;
  const id = backendResJSON.user.id;

  res.cookie(`TAPPDIN_ACCESS_TOKEN`, token);
  res.cookie(`TAPPDIN_CURRENT_USER_ID`, id);
  res.redirect("/");

}));


router.get("/log-out", (req, res) => {
  res.cookie(`TAPPDIN_ACCESS_TOKEN`, "");
  res.cookie(`TAPPDIN_CURRENT_USER_ID`, "");
  res.redirect("/log-in");
});

module.exports = router;

