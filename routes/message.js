var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController');
const chatController = require('../controllers/chatController');


router.get('/', function (req, res) {
    chatController.searchChat(req.app.get('currentUser'), function (chats) {
        userController.searchAcc(chats[0].UserId, function (user) {
            chatController.searchMess(chats[0].id, function (messes) {
                res.locals.chatId = req.app.set('chatId', chats[0].id);

                res.locals.enemy = user;
                res.locals.messes = messes;
                res.locals.chats = chats;

                res.render('message');
            })
        })
    });
})


module.exports = router;