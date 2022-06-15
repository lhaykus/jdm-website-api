const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
    userId: {
        type: String, 
        required:true,
    },
    products: [
        {
            productId: {
                type: String,
            },
            quantity: {
                type: Number,
                default: 1,
            },
        },
    ],
    price: {
        type: Number,
        required: true,
    },
    address: {
        type: Object, 
        required: true,
    }, 
    status: {
        type: String,
        default: 'pending',
    },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;