const express = require('express');
const router = express.Router();
const db = require("../db/models");

const {check, validationResult} = require('express-validator');
const {
    asyncHandler,
    handleValidationErrors
} = require('./utils')
const { requireAuth } = require("../auth");

router.use(requireAuth);


router.get("/beers", asyncHandler(async(req, res)=>{
    const beers =  await db.Beer.findAll({
        include: [db.Brewery, db.BeerType, db.User]
    });
    res.json({beers})
}));

router.get("/beers/:id(\\d+)", asyncHandler(async(req, res)=>{
    const beerId = parseInt(req.params.id,10);
    const beer = await Beer.findByPk(beerId);
    res.json({
        beer
    });
}));

router.delete("/beers/:id(\\d+)",
    asyncHandler(async (req, res) => {
        const beerId = parseInt(req.params.id, 10);
        const beer = await Tweet.findByPk(tweetId);

        const deletedBeer = await tweet.destroy();

        res.json({msg: "The beer is no longer available 😞!",deletedBeer});
}));



module.exports = router;
