const express = require('express');
//Creating express application
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const usersRoute = require('./routes/user');

const PORT = process.env.PORT || 2100;


dotenv.config();

//Creating mongoose database connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('DB connection seuccesful'))
    .catch((err) => {
            console.log(err);
});

//allowing use of json files 
app.use(express.json());

app.use('/api/users', usersRoute);


app.listen(PORT, () => {
    console.log(`app lsiteing on ${PORT}`);
});