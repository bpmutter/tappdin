const express = require("express");
const { asyncHandler } = require("./utils");
const fetch = require("node-fetch");
const FetchRouter = require("../utils/FetchRouter");
const bodyParser = require("body-parser");
const router = express.Router();

router.get("/", asyncHandler( async(req,res)=>{
    const search = req.query;
    let {searchType, query, id} = search;
    id = parseInt(id,10);
    const accessToken = req.cookies["TAPPDIN_ACCESS_TOKEN"];

    if(searchType === "beers"){
      const results = await searchBeers(query, accessToken)
      const beers = results.slice(0, 10);
      cleanBeerData(beers);
      res.render("search-results", { query, beers });

    } else if(searchType === "beersByBrewery"){
      const beers = await searchBeersByBrewery(id, accessToken);
      console.log(beers[1])

      cleanBeerData(beers);
      res.render("search-results", {query, beers});

    } else{
      const results = await searchBreweries(query, accessToken)
      const breweries = results.slice(0, 10);
      cleanBreweryData(breweries);
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

async function searchBeersByBrewery(id, token){
  console.log("TOKEN",token)
  const data = await FetchRouter.get(
    `${process.env.BACKEND_URL}/beers/brewery/${id}`,
    token
  );
  const {beers} = await data.json();
  return beers;
}
async function searchBreweries(query,token){
  const data = await FetchRouter.post(
    `${process.env.BACKEND_URL}/breweries/search`,
    token,
    { query }
  );
  const { results } = await data.json();
  return results;
}

function cleanBeerData(beers){
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
}

function cleanBreweryData(breweries){
  breweries.forEach((brewery) => {
    if (brewery.Checkin && brewery.Checkin.length) {
      const checkinsScores = checkins.map((checkin) => checkin.rating);
      brewery.avgRating =
        checkinsScores.reduce((sum, rating) => {
          sum += rating;
        }) / checkins.length;
    }
    date = new Date(brewery.createdAt);
    brewery.createdAt = date.toDateString();
  });
}


module.exports = router;