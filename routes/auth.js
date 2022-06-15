const router = require('express').Router();
const User = require('../models/User');
//Using CryptoJS to hash passwords
const CryptoJS = require('crypto-js');


//Sign up
router.post('/signup', async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password:CryptoJS.AES.encrypt(
            req.body.password,
            process.env.SECRET_PASS
          ).toString(),
    });



    try {
        const savedUser = await newUser.save();
        res.status(200).json(savedUser)

    } catch (error) {
        res.status(500).json(error);
    }
});




module.exports = router;