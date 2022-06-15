const { verifyToken, verifyTokenAndAuth } = require('./verifyToken');
const router = require('express').Router();
const User = require('../models/User');

//User PUT request
router.put('/:id', verifyTokenAndAuth, async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.SECRET_PASS
        ).toString();
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            //take everything in req.body and set again
            $set: req.body
        }, { new: true });
        //update user with new data
        res.status(200).json(updatedUser);

    } catch (error) {
        //otherwise send error
        res.status(500).json(error);
    };



});

module.exports = router;