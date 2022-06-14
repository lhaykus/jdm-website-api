const express = require('express');
//Creating express application
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('DB connection seuccesful'))
    .catch((err) => {
            console.log(err);
        })


app.listen(process.env.PORT || 2100, () => {
    console.log(`app lsiteing`);
});