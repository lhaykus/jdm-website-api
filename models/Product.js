const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    img: {
        type: String, 
    },
    description: {
        type: String, 
    },
    price: {
        type: Number, 
        required: true,
        min: 0.99
    },
    quantity: {
        type: Number, 
        min: 0,
        default: 0
    },
    catergories: {
        type: Array,
    }
});


const Product = mongoose.model('Product', productSchema);

module.exports = Product;