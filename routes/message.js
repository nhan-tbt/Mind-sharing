var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController');
const chatController = require('../controllers/chatController');

const AWS = require('aws-sdk');
const Busboy = require('busboy');


router.get('/', function (req, res) {
    chatController.searchChatRoom(req.app.get('currentUser'), function (chatroom) {
        chatController.searchChatUser(chatroom.id, function(chatUsers) {
            userController.searchAcc(chatUsers[0].UserId, function (user) {
                chatController.searchMess(req.app.get('currentUser') ,chatUsers[0].UserId, function (messes) {
                    req.app.set('enemy', chatUsers[0].UserId);
                    chatUsers[0].active = true;
                    res.locals.enemy = user;
                    res.locals.messes = messes;
                    res.locals.chats = chatUsers;

                    res.render('message');
                })
            })
        })
    });
})

router.post('/get_data_message', (req, res) => {
    var s3bucket = new AWS.S3({
        accessKeyId: 'AKIATRGWWZO2WUH5TFNJ',
        secretAccessKey: '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',
        Bucket: 'mind-sharing'
    });
    var busboy = new Busboy({ headers: req.headers });
    var mess = {}
    mess['imgPath'] = []
    var num_img = 0;
    var today = new Date();

    mess['id'] = today.getFullYear() + '_' + (today.getMonth() + 1) + '_' +today.getDate() + '_' + today.getHours() + "_" + today.getMinutes() + "_" + today.getSeconds() + "_" + today.getMilliseconds() + "_" + req.app.get("currentUser") + "_" + req.app.get("enemy");
    mess['person1'] = req.app.get('currentUser');
    mess['person2'] = req.app.get('enemy');
    mess['who'] = req.app.get('currentUser');

    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        if (filename != ''){
            s3bucket.createBucket(function () {
                var params = {
                    Bucket: 'mind-sharing',
                    Key: 'mess_' + today.getFullYear() + today.getMonth() + today.getDate() + today.getHours() + today.getMinutes() + today.getSeconds() + today.getMilliseconds() + req.app.get("currentUser") + req.app.get("enemy") + num_img + '.png',
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

            mess['imgPath'].push('https://mind-sharing.s3-ap-southeast-1.amazonaws.com/' + 'mess_' + today.getFullYear() + today.getMonth() + today.getDate() + today.getHours() + today.getMinutes() + today.getSeconds() + today.getMilliseconds() + req.app.get("currentUser") + req.app.get("enemy") + num_img + '.png')
            num_img += 1;
        }
    });

    busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated) {
        console.log(fieldname);
        mess[fieldname] = val;
    });

    busboy.on('finish', function() {

        chatController.createMess(mess);

        setTimeout(() => { res.json(mess); }, 2500*num_img);
    });

    const Load = async () => {
        await req.pipe(busboy)

        if (mess['numImg'] == 0){

            chatController.createMess(mess);

            res.json(mess);
        }
    }

    Load();
});

router.get('/:enemyId', function (req, res) {
    chatController.searchChatRoom(req.app.get('currentUser'), function (chatroom) {
        chatController.searchChatUser(chatroom.id, function(chatUsers) {
            userController.searchAcc(req.params.enemyId, function (user) {
                chatController.searchMess(req.app.get('currentUser'), req.params.enemyId, function (messes) {
                    req.app.set('enemy', req.params.enemyId);
                    for (let i = 0; i < chatUsers.length; i++){
                        if (chatUsers[i].UserId == req.params.enemyId){
                            chatUsers[i].active = true;
                        }
                    }
                    res.locals.enemy = user;
                    res.locals.messes = messes;
                    res.locals.chats = chatUsers;

                    res.render('message');
                })
            })
        })
    });
})


module.exports = router;