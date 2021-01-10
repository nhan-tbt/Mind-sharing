var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');


router.get('/', function (req, res) {

    res.render('user_wall');
})


module.exports = router;