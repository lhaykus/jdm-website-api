const router = require('express').Router();
const User = require('../models/User');
//Using CryptoJS to hash passwords
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');


//Sign up
router.post('/signup', async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.SECRET_PASS
        ).toString(),
    });

    try {
        //saving new user data
        const savedUser = await newUser.save();
        res.status(200).json(savedUser)

    } catch (error) {
        res.status(500).json(error);
    }
});

//Login
router.post('/login', async (req, res) => {
    try {
        //making sure password and username match 
        const user = await User.findOne(
            {
                username: req.body.username
            });
        //if no user found send error
        !user && res.status(401).json('wrong username and password');

        //decrypt password
        const hashedPassword = CryptoJS.AES.decrypt(user.password,
            process.env.SECRET_PASS);

        //converting hashed password to a string
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        //if password does not equal req.body.password send error
        originalPassword !== req.body.password && res.status(401)
        .json('wrong password and username');

        //giving each user a unique token to give permission for user to delete/add/etc
        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin,
        }, process.env.JWT_KEY,
        //toekn expires in 3days and user will have to re login
        {expiresIn:'3d'}
        );
    
        //to hide password and show other information except password
        const { password, ...others } = user._doc;
        
        //if username and password match send back user
        res.status(200).json({...others, accessToken});

    } catch (error) {
        res.status(500).json(error);
    }
});




module.exports = router;