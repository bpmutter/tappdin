const express = require("express");
const { asyncHandler } = require("./utils");
const fetch = require("node-fetch");
const FetchRouter = require("../utils/FetchRouter");
const bodyParser = require("body-parser");
const router = express.Router();

router.get("/", asyncHandler( async(req,res)=>{
    const search = req.query;
    console.log(search)
    const {searchType, query} = search;
    const accessToken = req.cookies["TAPPDIN_ACCESS_TOKEN"];
    if(searchType === "beers"){
      const results = await searchBeers(query, accessToken)
      const beers = results.slice(0, 10);
      beers.forEach((beer) => {
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
      });
      res.render("search-results", { query, beers });
    } else{
      const data = await FetchRouter.post(
        `${process.env.BACKEND_URL}/breweries/search`,
        accessToken,
        { query }
      );
      const { results } = await data.json();
      const breweries = results.slice(0, 10);
      breweries.forEach((brewery) => {
        if (brewery.Checkin && brewery.Checkin.length) {
          const checkinsScores = checkins.map((checkin) => checkin.rating);
          brewery.avgRating =
            checkinsScores.reduce((sum, rating) => {
              sum += rating;
            }) / checkins.length;
        }
        // brewery.image = brewery.image || "/imgs/brewery-default.jpg";
        date = new Date(brewery.createdAt);
        brewery.createdAt = date.toDateString();
      });
      res.render("search-results", { query, breweries });
    }
}));

async function searchBeers(query, token){
  const data = await FetchRouter.post(
    `${process.env.BACKEND_URL}/beers/search`,
    token,
    { query }
  );
  const { results } = await data.json();
  return results;
}


module.exports = router;