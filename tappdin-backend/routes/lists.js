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



router.get("/lists", asyncHandler(async (req, res) => {
    const lists = await db.List.findAll({
        include: [db.User, db.Beer]
    });
    res.json({
        lists
    });
}));

module.exports = router;
