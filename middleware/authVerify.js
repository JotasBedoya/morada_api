const jwt = require('jsonwebtoken');

const authVerify = (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.payload = decoded;
        } catch (error) {
            return res.status(401).send('Unauthorized');
        }

    } else {
        return res.status(400).send('Token is mandatory');
    }
    next();
};

module.exports = authVerify;