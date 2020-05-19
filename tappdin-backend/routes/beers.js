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

router.get("/beers/top", asyncHandler(async(req, res)=>{
        const topBeers = await db.Beer.findAll({
            include: [db.Beer, db.Checkin.rating, db.Brewery],
            order: [["rating", "DESC"]],

        });
        res.json({topBeers});
    }));

router.get("/beers/:id(\\d+)", asyncHandler(async(req, res)=>{
    const beerId = parseInt(req.params.id,10);
    const beer = await db.Beer.findByPk(beerId, {include: db.Checkin});
    res.json({
        beer
    });
}));

router.delete("/beers/:id(\\d+)",
    asyncHandler(async (req, res) => {
        const beerId = parseInt(req.params.id, 10);
        const beer = await db.Beer.findByPk(beerId);

        const deletedBeer = await beer.destroy();

        res.json({msg: "The beer is no longer available 😞!",deletedBeer});
}));



module.exports = router;
