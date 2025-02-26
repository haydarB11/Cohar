
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
                if (user) {
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
            data: 'FUCK U from HB',
        });
    }
    return res.status(200).send({msg: 'msg'});
};

module.exports = jwtMiddleware;