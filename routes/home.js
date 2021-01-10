var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const postController = require('../controllers/postController');
const AWS = require('aws-sdk');
const Busboy = require('busboy');


const BUCKET_NAME = 'mind-sharing';
const IAM_USER_KEY = 'AKIATRGWWZO2WUH5TFNJ';
const IAM_USER_SECRET = '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';

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
        post['time'] = today.getTime();
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
        postController.searchAllPost(function (posts) {
            res.locals.posts = posts;
            req.app.set('last_post', posts.length);
            res.render('index');
        });
    } )
    
})

// router.post('/get_infor_create_post', function(req, res) {
//     var today = new Date();
//     var post = {
//         UserId: req.app.get('currentUser'),
//         content: req.body.post_area,
//         time: today.getTime,
//         pDay: today.getDay(),
//         pMonth: today.getMonth() + 1,
//         pYear: today.getFullYear(),
//         category: req.body.cate,

//     }
//     postController.createPost(post);
// })


module.exports = router;