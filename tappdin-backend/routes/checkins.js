const express = require('express');
const router = express.Router();
const db = require("../db/models");

const {check, validationResult} = require('express-validator');
const {
    asyncHandler,
    handleValidationErrors
} = require('./utils')
const { requireAuth } = require("../auth");

//router.use(requireAuth);



router.get("/", asyncHandler(async (req, res) => {
    const checkins = await db.Checkin.findAll({
        include: [db.User, db.Beer]
    });
    res.json({
        checkins
    });
}));


router.get("/:id(\\d+)", asyncHandler(async(req, res)=>{
    const checkinId = parseInt(req.params.id,10);
    const checkin = await db.Checkin.findByPk(checkinId);
    res.json({
        checkin
    });
}));

router.delete("/checkins/:id(\\d+)",
    asyncHandler(async (req, res) => {
        const checkinId = parseInt(req.params.id, 10);
        const checkin = await db.Checkin.findByPk(checkinId);

        const deletedCheckin = await checkin.destroy();

        res.json({msg: "The brewery is no longer available 😞!",deletedCheckin});
}));

module.exports = router;
