var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const postController = require('../controllers/postController');
const pCommentController = require('../controllers/pCommentController');

router.get('/', function (req, res) {
    userController.searchAcc(req.app.get('currentUser'), function (this_user) {
        
        res.locals.currentUser = this_user;

        res.render('profile');
    });
})

router.get('/wall', function (req, res) {
    res.locals.currentUser = req.app.get('currentUser');
    userController.searchAcc(req.app.get('currentUser'), function(this_user) {
        res.locals.user = this_user;
        postController.searchUserPost(req.app.get('currentUser'), function (posts) {
            for (let i = 0; i < posts.length; i++) {
                pCommentController.getCommentByPostId(posts[i].id).then(pComments => {
                    posts[i].pComments = pComments;
                })
            }
            
            res.locals.posts = posts;
            req.app.set('last_post', posts.length);

            res.render('user_wall');
        });
    } )
})

router.get('/user/:user', function (req, res) {
    console.log(req.params.user);
    userController.searchAcc(req.params.user, function (this_user) {
        // console.log(this_user);
        res.locals.currentUser = this_user;

        res.render('profile');
    });
})


module.exports = router;