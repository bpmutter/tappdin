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



router.get("/", asyncHandler(async (req, res) => {
    const likedBreweries = await db.LikedBrewery.findAll({
        include: [db.User, db.Brewery]
    });
    res.json({
        likedBreweries
    });
}));

module.exports = router;
