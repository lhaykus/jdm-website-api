const router = require('express').Router();

router.get('/usertest', (req, res) => {
    res.send('user test a success');
});

router.post('/userposttest', (req, res) => {
    const username = req.body.username;
    console.log(username);
});




module.exports = router;