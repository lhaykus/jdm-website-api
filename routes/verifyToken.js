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

//Verifying token and user auth to see if user is authorized to modify/delete data
const verifyTokenAndAuth = (req, res, next) => {
    verifyToken(req,res, () => {
        if(req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            res.status(403).json('persmission not allowed');
        }
    });
};

//verify admin persmission to see if user is allowed to add/modify products and orders
const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.isAdmin) {
            next();
        } else {
            res.status(403).json('permission not allowed')
        }
    });
}

module.exports = { verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin };