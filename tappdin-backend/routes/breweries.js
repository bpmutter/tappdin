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

router.get("/breweries", asyncHandler(async(req, res)=>{
    const breweries =  await db.Brewery.findAll();
    res.json({breweries});
}));

router.get("/breweries/top", asyncHandler(async(req, res)=>{
        const topBreweries = await db.Brewery.findAll({
            order: [["rating", "DESC"]],
            limit: 10

        });
        res.json({topBreweries});
    }));

router.get("/breweries/:id(\\d+)", asyncHandler(async(req, res)=>{
    const breweryId = parseInt(req.params.id,10);
    const brewery = await db.Brewery.findByPk(breweryId);
    res.json({
        brewery
    });
}));

router.delete("/breweries/:id(\\d+)",
    asyncHandler(async (req, res) => {
        const breweryId = parseInt(req.params.id, 10);
        const brewery = await db.Brewery.findByPk(breweryId);

        const deletedBrewery = await brewery.destroy();

        res.json({msg: "The brewery is no longer available 😞!",deletedBrewery});
}));



module.exports = router;
