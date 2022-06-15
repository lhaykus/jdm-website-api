const mongoose = require('mongoose');
const { Schema } = mongoose;

const cartSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    description: {
        type: String, 
        reqiuired: true
    },
    img: {
        type: String,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;