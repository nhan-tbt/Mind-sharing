var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController');
const chatController = require('../controllers/chatController');
const controller = require('../controllers/chatController');


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