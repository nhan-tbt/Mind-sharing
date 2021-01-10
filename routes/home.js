var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');


router.get('/', function (req, res) {
    res.locals.currentUser = req.app.get('currentUser');

    userController.searchAllPost(function (posts) {
        res.locals.posts = posts;

        res.render('index');
    });
})


module.exports = router;