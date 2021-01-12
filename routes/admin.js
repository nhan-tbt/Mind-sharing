var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController');
const rpController = require('../controllers/rpPostController');
const pCommentController = require('../controllers/pCommentController');


router.get('/', function (req, res) {
    res.locals.currentUser = req.app.get('currentUser');
    userController.searchAcc(req.app.get('currentUser'), function(this_user) {
        res.locals.user = this_user;
        rpController.searchAllRpPost(function (rpPosts) {
            console.log(rpPosts);
            for (let i = 0; i < rpPosts.length; i++) {
        
                pCommentController.getCommentByPostId(rpPosts[i].Post.id).then(pComments => {
                    rpPosts[i].Post.pComments = pComments;
                })

                userController.searchAcc(rpPosts[i].Post.UserId, function(post_user) {
                    rpPosts[i].Post.pUser = post_user;
                })
            }

            res.locals.rpPosts = rpPosts;

            res.render('admin', { });
        })
    })
})


module.exports = router;