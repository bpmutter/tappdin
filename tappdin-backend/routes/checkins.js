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
    const checkins = await db.Checkin.findAll({
        include: [db.User, db.Beer]
    });
    res.json({
        checkins
    });
}));

router.post("/", asyncHandler(async (req, res)=>{
    const userId = parseInt(req.body.userId, 10)
    const beerId = parseInt(req.body.beerId, 10)
    const rating = parseInt(req.body.rating, 10)
    const comment = req.body.comment;
    const newCheckin = { userId, beerId, rating, comment };
    try{
        const success = await db.Checkin.create(newCheckin);
    }catch(err){
        console.error(err);
        throw err;
    }
    res.status(201).end();
}));


router.get("/:id(\\d+)", asyncHandler(async(req, res)=>{
    const checkinId = parseInt(req.params.id,10);
    let checkin = await db.Checkin.findAll({
      where: { id: checkinId },
      include: [
        db.User,
        {
          model: db.Beer,
          include: db.Brewery,
        },
      ],
    });
    checkin = checkin[0];
    checkin = checkin.toJSON();
    checkin.id = checkinId;
    res.json({checkin});

}));

router.delete("/:id(\\d+)",
    asyncHandler(async (req, res) => {
        const checkinId = parseInt(req.params.id, 10);
        const checkin = await db.Checkin.findByPk(checkinId);

        console.log(checkin);
        const deletedCheckin = await checkin.destroy();
        res.json({msg: "The checkin is no longer available 😞!",deletedCheckin});
}));

module.exports = router;
