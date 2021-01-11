var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const postController = require('../controllers/postController');
const pCommentController = require('../controllers/pCommentController');
var pInteractionController = require('../controllers/pInteractionController');
const AWS = require('aws-sdk');
const Busboy = require('busboy');


router.post('/get_infor_create_post', (req, res) => {
    var s3bucket = new AWS.S3({
        accessKeyId: 'AKIATRGWWZO2WUH5TFNJ',
        secretAccessKey: '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',
        Bucket: 'mind-sharing'
    });
    var busboy = new Busboy({ headers: req.headers });
    var post = {}
    post['imgPath'] = []
    var num_img = 0;

    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        if (filename != ''){
            s3bucket.createBucket(function () {
                var params = {
                    Bucket: 'mind-sharing',
                    Key: "post_" + (req.app.get('last_post') + 1) + '_' + num_img + '.jpg',
                    Body: file
                };
                s3bucket.upload(params, function (err, data) {
                    if (err) {
                        console.log('error in callback');
                        console.log(err);
                    }
                    console.log('success');
                    console.log(data);
                });
            });    

            file.on('data', function(data) {});
            file.on('end', function() {});

            post['imgPath'].push('https://mind-sharing.s3-ap-southeast-1.amazonaws.com/' + "post_" + (req.app.get('last_post') + 1) + '_' + num_img + '.jpg')
            num_img += 1;
        }
    });

    busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated) {
        post[fieldname] = val;
    });

    busboy.on('finish', function() {
        var today = new Date();
        post['id'] = req.app.get('last_post') + 1;
        post['time'] = today.getHours() + ":" + today.getMinutes();
        post['pDay'] = today.getDay();
        post['pMonth'] = today.getMonth() + 1;
        post['pYear'] = today.getFullYear();
        post['UserId'] = req.app.get('currentUser');
        post['like'] = 0;
        post['comment'] = 0;

        postController.createPost(post);

        res.redirect('/');
    });

    req.pipe(busboy);
});


router.get('/', function (req, res) {
    res.locals.currentUser = req.app.get('currentUser');
    userController.searchAcc(req.app.get('currentUser'), function(this_user) {
        res.locals.user = this_user;
        postController.searchAllPost(this_user, function (posts) {
            for (let i = 0; i < posts.length; i++) {
                pCommentController.getCommentByPostId(posts[i].id).then(pComments => {
                    posts[i].pComments = pComments;
                })
            }
            res.locals.posts = posts;
            req.app.set('last_post', posts.length);
            res.render('index');
        });
    } )
    
})

router.post('/like', function(req, res) {
    postController.seachPostById(req.body.postID)
    .then(post => {
        post.like += 1;
        postController.likePost(post);

        pInteractionController.createInteraction(post.id, req.app.get('currentUser'));

        console.log(post.like);
        res.json(post.like);
    })    
})

router.post('/unlike', function(req, res) {
    postController.seachPostById(req.body.postID)
    .then(post => {
        post.like -= 1;
        postController.unlikePost(post);
        pInteractionController.removeInteraction(post.id, req.app.get('currentUser'));
        res.json(post.like)})
})

router.post('/get_cmt_content', function(req, res) {
    console.log('########');
    console.log(req.body.postID);
    postController.seachPostById(req.body.postID)
    .then(post => {
        post.comment += 1;
        var cmt = {
            PostId: post.id,
            UserId: req.app.get('currentUser'),
            contentCmt: req.body.content
        }
        pCommentController.createComment(cmt);
        res.json(post.comment);
    })
})

module.exports = router;