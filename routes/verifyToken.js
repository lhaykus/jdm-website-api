const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if(authHeader) {
        const token = authHeader.split(" ")[1];
        //if user has token
        jwt.verify(token, process.env.JWT_KEY, (err, user) => {
            //if error send error message
            if(err) res.status(403).json('token not valid');
            //otherwise login user with token
            req.user = user;
            //leave function and go to user route function
            next();
        });
    } else {
        //if user does not have token send error
        return res.status(401).json('not authorized');
    };
};


const verifyTokenAndAuth = (req, res, next) => {
    verifyToken(req,res, () => {
        if(req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            res.status(403).json('persmission not allowed');
        }
    });
}

module.exports = { verifyToken, verifyTokenAndAuth };