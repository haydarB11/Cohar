
require('dotenv').config()

const jwt = require('jsonwebtoken');
const httpStatus = require('../httpStatus');
const {User} = require('../../models');


const jwtMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (typeof authHeader !== 'undefined') {
        const [, token] = authHeader.split(' ');

        jwt.verify(token, process.env.SECRETKEY, async (err, decoded) => {
            if (err) {
                res.status(httpStatus.FORBIDDEN).send({
                    error: err,
                });
            } else {
                const user = await User.findByPk(decoded.id);
                if (user && (user.type === "manager" || user.type === "supervisor")) {
                    req.user = decoded;
                    next();
                } else {
                    res.status(httpStatus.UNAUTHORIZED).send({
                        data: 'UNAUTHORIZED',
                    });
                }
            }
        });
    } else {
        res.status(httpStatus.UNAUTHORIZED).send({
            data: 'UNAUTHORIZED',
        });
    }
};

module.exports = jwtMiddleware;