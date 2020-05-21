const express = require('express');
const {asyncHandler } = require('./utils');
const fetch = require('node-fetch');
const FetchRouter = require('../utils/FetchRouter');

const router = express.Router();


router.get("/:id(\\d+)", async (req, res) => {
  const accessToken = req.cookies["TAPPDIN_ACCESS_TOKEN"];
  const beerId = parseInt(req.params.id, 10);
  const data = await FetchRouter.get(`http://localhost:8080/beers/${beerId}`, accessToken);
  const {beer} = await data.json();

  res.render("add-checkin", { beer });
});

router.post("/:id(\\d+)", asyncHandler(async (req,res)=>{
  const accessToken = req.cookies["TAPPDIN_ACCESS_TOKEN"];
  const body = req.body;
  body.beerId = parseInt(req.params.id, 10);
  body.userId = parseInt(req.cookies['TAPPDIN_CURRENT_USER_ID'], 10);
  let backendRes;
  try{
    backendRes = await fetch("http://localhost:8080/checkins/", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    const json = await backendRes.json();
  }catch(err) {console.error(err);}
  
  res.redirect("/");
}));

router.get("/:id(\\d+)/delete", asyncHandler(async (req,res)=>{
  const checkinId = parseInt(req.params.id, 10);
  const accessToken = req.cookies["TAPPDIN_ACCESS_TOKEN"];
  const backendRes = await fetch(`http://localhost:8080/checkins/${checkinId}`, {
    headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${accessToken}`,
      },
  });
  const {checkin} = await backendRes.json();
  
  let displayRating = "";
  for (let i = 1; i <= checkin.rating; i++) {
    displayRating += "🍺";
  }
  checkin.displayRating = displayRating;

  // console.log(checkin);
  // console.log("current user", parseInt(req.cookies["TAPPDIN_CURRENT_USER_ID"], 10));
  // if(parseInt(checkin.userId,10) === parseInt(req.cookies['TAPPDIN_CURRENT_USER_ID'], 10)){
    res.render("delete-checkin", {checkin});
  // }
  // else res.render("403")
}))

router.post("/:id(\\d+)/delete", asyncHandler(async (req,res)=>{
  console.log("hellooooo")
    const checkinId = parseInt(req.params.id, 10);
    const accessToken = req.cookies["TAPPDIN_ACCESS_TOKEN"];
    const backendRes = await fetch(`http://localhost:8080/checkins/${checkinId}`, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${accessToken}`,
        },
  });
  const checkin = await backendRes.json();
  console.log(checkin)

  res.redirect("/");
}));


module.exports = router;

