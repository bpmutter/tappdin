const express = require('express');
const router = express.Router();
const {Tweet, User} = require("../db/models");
const {check, validationResult} = require('express-validator');
const {
    asyncHandler,
    handleValidationErrors
} = require('./utils')
const { requireAuth } = require("../auth");

router.use(requireAuth);

const validateTweet = [
    check('message').exists({checkFalsy: true})
    .withMessage('Must include content.')
    .isLength({max: 280})
    .withMessage('Tweets must be 280 characters or less.')
];

router.get("/", asyncHandler(async(req, res) => {
    const tweets = await Tweet.findAll({
        include: [{ model: User, as: "user", attributes: ["username"] }],
        order: [["createdAt", "DESC"]],
        attributes: ["message"],
    });
    res.json({tweets});
}));

router.get("/:id(\\d+)", asyncHandler(async (req, res) => {
    const tweetId = parseInt(req.params.id,10);
    const tweet = await Tweet.findByPk(tweetId);
    res.json({
        tweet
    });
}));


router.post("/", validateTweet, handleValidationErrors, asyncHandler(async (req, res) => {
    const newTweet = await Tweet.create({
        message: req.body.message,
        userId: req.user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    console.log(newTweet)
    
    res.json({newTweet});
    // res.redirect('/')
}));

router.put("/:id(\\d+)", 
    validateTweet, 
    handleValidationErrors, 
    asyncHandler(async (req, res) => {
        const tweetId = parseInt(req.params.id, 10);
        const tweet = await Tweet.findByPk(tweetId);

        const updatedTweet = await tweet.update({
            message: req.body.message,
            updatedAt: new Date()
        });
        res.json({updatedTweet})

}));

router.delete("/:id(\\d+)",
    asyncHandler(async (req, res) => {
        const tweetId = parseInt(req.params.id, 10);
        const tweet = await Tweet.findByPk(tweetId);

        const deletedTweet = await tweet.destroy();

        res.json({msg: "bye tweet!",deletedTweet});
}));


module.exports = router;