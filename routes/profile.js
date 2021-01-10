var express = require('express');
var router = express.Router();


router.get('/', function (req, res) {
    res.render('profile');
})

router.get('/wall', function (req, res) {
    res.render('user_wall');
})

module.exports = router;