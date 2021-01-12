var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');


router.get('/', function (req, res) {
    userController.searchAcc(req.app.get('currentUser'), function (this_user) {
        
        res.locals.currentUser = this_user;

        res.render('profile');
    });
})

router.get('/wall', function (req, res) {

    res.render('user_wall');
})


module.exports = router;