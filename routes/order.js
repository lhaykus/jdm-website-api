const router = require('express').Router();
const { verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin } = require('./verifyToken');
const Order = require('../models/Order');

//POST request
//CREATE
router.post('/', verifyTokenAndAdmin, async (req, res) => {
    const newOrder = new Order(req.body);

    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
        
    } catch (error) {
        res.status(500).json(error);
        
    };

});

//Product PUT request
//UPDATE
router.put('/:id', verifyTokenAndAuth, async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            //take everything in req.body and set again
            $set: req.body
        }, { new: true });
        //update order with new data
        res.status(200).json(updatedOrder);

    } catch (error) {
        //otherwise send error
        res.status(500).json(error);
    };


});

//Delete request
router.delete('/:id', verifyTokenAndAuth, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json('Order had been deleted')
        
    } catch (error) {
        res.status(500).json(error);
    };
});

//GET user order by id
router.get('/find/:id', async (req, res) => {
    try {
      const orders =  await Order.findOne({ userId: req.params.userId });
        res.status(200).json(orders);
        
    } catch (error) {
        res.status(500).json(error);
    };
});


//GET all 
router.get('/', verifyTokenAndAdmin, async (req, res) => {
    
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
       
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    };
});

module.exports = router;