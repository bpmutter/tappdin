const express = require('express');
const router = express.Router();
const db = require("../db/models");
const {asyncHandler} = require("./utils");

router.get("/beers", asyncHandler(async(req, res)=>{
    const beers =  await db.Beer.findAll({
        include: [db.Brewery, db.BeerType, db.User]
    });
    res.json({beers})
}));

router.get("/checkins", asyncHandler(async (req, res) => {
    const checkins = await db.Checkin.findAll({
        include: [db.User, db.Beer]
    });
    res.json({
        checkins
    });
}));





module.exports = router;