const express = require('express');
const {asyncHandler } = require('./utils');
const fetch = require('node-fetch');
const FetchRouter = require('../utils/FetchRouter');

const router = express.Router();


router.get("/:id(\\d+)", async (req, res) => {
  const accessToken = req.cookies["TAPPDIN_ACCESS_TOKEN"];
  const beerId = parseInt(req.params.id, 10);
  const data = await FetchRouter.get(`http://localhost:8080/beers/${beerId}`, accessToken);
  const beerData = await data.json();
  const beer = {
    id: beerId,
    name: beerData.name
  }
  console.log(beer)
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


module.exports = router;

