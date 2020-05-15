const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const {
    asyncHandler,
    handleValidationErrors
} = require('./utils');
const bcrypt = require('bcryptjs');
const {User, Tweet} = require('../db/models');
const {getUserToken, requireAuth} = require('../auth');

const validateUsername =
    check("username")
    .exists({
        checkFalsy: true
    })
    .withMessage("Please provide a username");

const validateEmailAndPassword = [
    check("email")
    .exists({
        checkFalsy: true
    })
    .isEmail()
    .withMessage("Please provide a valid email."),
    check("password")
    .exists({
        checkFalsy: true
    })
    .withMessage("Please provide a password."),
];

const validateCreateUser = [
    validateUsername,
    ...validateEmailAndPassword,
    handleValidationErrors
]

router.get("/:id(\\d+)/tweets", asyncHandler(async (req, res) => {
    console.log("hiii")
    const userId = parseInt(req.params.id, 10);
    const tweets = await Tweet.findAll({
        where: {
            userId
        }
    });
    res.json({
        tweets
    });
}))

router.post('/', validateCreateUser, asyncHandler ( async (req, res) => {
    const {email, password, username} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        email,
        hashedPassword,
        username
    });
    const token = getUserToken(user);
    res.status(201).json({user: {id: user.id}, token });     
}));

router.post("/token", asyncHandler(async (req, res, next)=>{
    const {email, password} = req.body;
    const user = await User.findOne({where: { email }});
    console.log(user);
    if (!user || !user.validatePassword(password)) {
        const err = new Error("Login failed");
        err.status = 401;
        err.title = "Login failed";
        err.errors = ["The provided credentials were invalid."];
        return next(err);
    }
    const token = getUserToken(user);
    res.json({token, user:{id:user.id}});
}))


module.exports = router;