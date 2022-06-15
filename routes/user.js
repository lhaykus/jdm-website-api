const { verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin } = require('./verifyToken');
const router = require('express').Router();
const User = require('../models/User');

//User PUT request
//Allows user to modify data (such as change username)
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

//Delete request
router.delete('/:id', verifyTokenAndAuth, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json('User had been deleted')
        
    } catch (error) {
        res.status(500).json(error);
    };
});

//GET user by id
router.get('/find/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
      const user =  await User.findById(req.params.id);
      const { password, ...others } = user._doc;
        res.status(200).json(others);
        
    } catch (error) {
        res.status(500).json(error);
    };
});

//GET all users
router.get('/', verifyTokenAndAdmin, async (req, res) => {
    const query = req.query.new
    try {
      const users = query ? await User.find().sort({ _id: -1}).limit(5) : await User.find();
        res.status(200).json(users);
        
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    };
});

module.exports = router;