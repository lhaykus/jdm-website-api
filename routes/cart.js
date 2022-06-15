const router = require('express').Router();
const { verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin } = require('./verifyToken');
const Cart = require('../models/Cart');

//POST request
//CREAT
router.post('/', verifyTokenAndAdmin, async (req, res) => {
    const newCart = new Cart(req.body);

    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
        
    } catch (error) {
        res.status(500).json(error);
        
    };

});

// PUT request
//UPDATE
router.put('/:id', verifyTokenAndAuth, async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
            //take everything in req.body and set again
            $set: req.body
        }, { new: true });
        //update cart with new data
        res.status(200).json(updatedCart);

    } catch (error) {
        //otherwise send error
        res.status(500).json(error);
    };


});

//Delete request
router.delete('/:id', verifyTokenAndAuth, async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json('Cart had been deleted')
        
    } catch (error) {
        res.status(500).json(error);
    };
});

//GET user cart by id
router.get('/find/:id', async (req, res) => {
    try {
      const cart =  await Cart.findOne({ userId: req.params.userId });
        res.status(200).json(cart);
        
    } catch (error) {
        res.status(500).json(error);
    };
});


//GET all 
router.get('/', async (req, res) => {
    
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
       
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    };
});

module.exports = router;