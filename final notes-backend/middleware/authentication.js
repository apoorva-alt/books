const jwt = require('jsonwebtoken')

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log('heyyyy', authHeader)
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            console.log("user", user)
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

module.exports = authenticateJWT
