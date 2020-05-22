const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const {
    asyncHandler,
    handleValidationErrors
} = require('./utils');
const bcrypt = require('bcryptjs');
const db = require('../db/models');
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

router.get("/:id(\\d+)", requireAuth, asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    try{
        const user = await db.User.findByPk(userId);
        const checkins = await db.Checkin.findAll({
          where: { userId: userId },
          include: [ db.User,
            {
              model: db.Beer,
              include: db.Brewery,
            },
          ],
        });
        res.json({ user, checkins });
    }catch(err){console.log(err)}

}));

router.put("/:id(\\d+)", requireAuth, asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    try{
        const user = await db.User.findByPk(userId);
        const {username, firstName, lastName, aboutYou, email} = req.body;
        await user.update({ username, firstName, lastName, aboutYou, email, updatedAt: new Date()});
        res.json({username, firstName, lastName, aboutYou, email, message:"Your account information has been successfully updated."});
    } catch(err){
        console.error(err);
        res.message = err;
        res.status(500).send();
    }
}));

router.put("/:id(\\d+)/password", requireAuth, asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    try{
        const user = await db.User.findByPk(userId);
        const {oldPassword, newPassword} = req.body;
        const isPassword = await bcrypt.compare(oldPassword, user.hashedPassword.toString());
        if(isPassword){
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await user.update({hashedPassword});
        }
        res.json({user, message: "Your password has been successfully updated."});
    } catch(err){
        console.error(err);
        res.message = err;
        res.status(500).send();
    }
}));

router.post('/', validateCreateUser, asyncHandler ( async (req, res) => {
    console.log(req.body);
    const {email, password, username, firstName, lastName} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log( {email, password, username, firstName, lastName}, hashedPassword)
        const user = await db.User.create({
          email,
          hashedPassword,
          username,
          firstName,
          lastName,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

    console.log("USER POSTED");
    const token = getUserToken(user);

    res.status(201).json({user: {id: user.id}, token });
}));

router.post("/token", asyncHandler(async (req, res, next)=>{
    const {email, password} = req.body;
    try{
        const user = await db.User.findOne({ where: { email: email } });
        const isPassword = await bcrypt.compare(
          password,
          user.hashedPassword.toString()
        );
        console.log(user);
        if (!isPassword) {
          const err = new Error("Login failed");
          err.status = 401;
          err.title = "Login failed";
          err.errors = ["The provided credentials were invalid."];
          return next(err);
        }
        const token = getUserToken(user);
        res.json({ token, user: { id: user.id } });
    }catch(e){
        const err = new Error("Login failed");
        err.status = 401;
        err.title = "Login failed";
        err.errors = ["The provided credentials were invalid."];
        return next(err);
    }
    
}))


module.exports = router;
