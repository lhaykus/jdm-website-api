const express = require('express');
//Creating express application
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const usersRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const productsRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
const stripeRoute = require('./routes/stripe');

const PORT = process.env.PORT || 2100;


dotenv.config();

//Creating mongoose database connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('DB connection successful'))
    .catch((err) => {
            console.log(err);
});

//allowing use of json files 
app.use(express.json());
app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/products', productsRoute);
app.use('/api/carts', cartRoute);
app.use('/api/orders', orderRoute);
app.use('/api/checkout', stripeRoute);


app.listen(PORT, () => {
    console.log(`app listening on ${PORT}`);
});