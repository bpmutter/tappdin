const express = require('express');
const router = express.Router();
const db = require("../db/models");
const Op = require('sequelize').Op;

const {check, validationResult} = require('express-validator');
const {
    asyncHandler,
    handleValidationErrors
} = require('./utils')
const { requireAuth } = require("../auth");

router.use(requireAuth);

router.get("/", asyncHandler(async(req, res)=>{
    const breweries =  await db.Brewery.findAll();
    res.json({breweries});
}));

router.get("/top", asyncHandler(async(req, res)=>{
        //const rating = Number(db.Brewery.key);
        const topBreweries = await db.Brewery.findAll({

            order: [["location", "DESC"]],
            limit: 10

        });
        res.json({topBreweries});
    }));

router.get("/:id(\\d+)", asyncHandler(async(req, res)=>{
    const breweryId = parseInt(req.params.id,10);
    const brewery = await db.Brewery.findByPk(breweryId);
    const breweryBeers = await db.Beer.findAll({where: {
        breweryId: breweryId
    }})
    const breweryBeerIds = breweryBeers.map(beer => beer.id);
    const checkins = await db.Checkin.findAll({
        where: {
            beerId: {[Op.or]: breweryBeerIds}
        },
        include: [db.User, {
            model: db.Beer,
            include: db.Brewery
        }]
    });
    res.json({
        brewery,
        checkins
    });
}));

router.delete("/:id(\\d+)",
    asyncHandler(async (req, res) => {
        const breweryId = parseInt(req.params.id, 10);
        const brewery = await db.Brewery.findByPk(breweryId);

        const deletedBrewery = await brewery.destroy();

        res.json({msg: "The brewery is no longer available 😞!",deletedBrewery});
}));



module.exports = router;
