const express = require("express");
const { asyncHandler } = require("./utils");
const fetch = require("node-fetch");
const FetchRouter = require("../utils/FetchRouter");
const bodyParser = require("body-parser");
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));

router.post("/beers", asyncHandler( async(req,res)=>{
    const {query} = req.body;

    const accessToken = req.cookies["TAPPDIN_ACCESS_TOKEN"];
    const data = await FetchRouter.post(`${process.env.BACKEND_URL}/beers/search`, accessToken, {query});
    const {results} = await data.json();
    const beers = results.slice(0,10);
    beers.forEach(beer=>{
        console.log(beer.image)
        if (beer.Checkin && beer.Checkin.length) {
          const checkinsScores = checkins.map((checkin) => checkin.rating);
          beer.avgRating =
            checkinsScores.reduce((sum, rating) => {
              sum += rating;
            }) / checkins.length;
        }
        beer.image = beer.image || "/imgs/beer-default.jpg";
        date = new Date(beer.createdAt);
        beer.createdAt = date.toDateString();
    })
    res.render("search-beer", { query, beers });

}))


module.exports = router;