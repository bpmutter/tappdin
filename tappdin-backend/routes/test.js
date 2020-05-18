const express = require('express');
const router = express.Router();
const db = require("../db/models");
const {asyncHandler} = require("./utils");

router.get("/beers", asyncHandler(async(req, res)=>{
    const users =  await db.Beer.findAll({
        include: [db.Brewery, db.BeerType]
    });
    res.json({users})
}));



module.exports = router;