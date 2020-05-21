const jwt = require('jsonwebtoken');
const {jwtConfig} = require("./config");
const {secret, expiresIn} = jwtConfig;
const bearerToken = require('express-bearer-token');
const {User} = require('./db/models');

const getUserToken = (user) =>{
    console.log()
    const userDataForToken = {
        id: user.id,
        email: user.email
    }

    const token = jwt.sign(
        {data: userDataForToken},
        secret,
        { expiresIn: parseInt(expiresIn, 10)}
    )
    return token;
}

const restoreUser = (req, res, next) => {
    const {
        token
    } = req;

    if (!token) {
        console.log("token not found");
        return res.set("WWW-Authenticate", "Bearer").status(401).end();
    }

    return jwt.verify(token, secret, null, async (err, jwtPayload) => {
        if (err) {
            console.log("this is the error: ",err);
            err.status = 401;
            return next(err);
        }

        const {
            id
        } = jwtPayload.data;

        try {
            req.user = await User.findByPk(id);
        } catch (e) {
            return next(e);
        }

        if (!req.user) {
            return res.set("WWW-Authenticate", "Bearer").status(401).end();
        }

        return next();
    });
};

const requireAuth = [bearerToken(), restoreUser];
module.exports = {getUserToken, requireAuth};
