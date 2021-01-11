var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const chatController = require('../controllers/chatController');
const bcrypt = require('bcrypt');

router.get('/', function (req, res) {
    res.locals.layout = 'log_res_Layout.hbs';

    res.render('register');
})

router.post('/get_infor_register', (req, res) => {
    if (req.body.account.includes(" ")) {
        res.locals.layout = 'log_res_Layout.hbs';
        res.locals.resAnnoun = '*Account cannot contain space';
        res.render('register');
    }
    else {
        userController.searchAcc(req.body.account, function (this_user) {
            if (this_user != null) {
                res.locals.layout = 'log_res_Layout.hbs';
                res.locals.resAnnoun = '*Account ' + req.body.account + ' has already exists';

                res.render('register');
            }
            else {
                var salt = bcrypt.genSaltSync(10);

                var userAcc = {
                    id: req.body.account,
                    password: bcrypt.hashSync(req.body.password, salt),
                    type: "USER",
                    fname: req.body.fname,
                    lname: req.body.lname,
                    avtPath: "avatar_default",
                    bgPath: "background_default",
                    email: "",
                    pNum: "",
                    bDay: req.body.Bday,
                    bMonth: req.body.Bmonth,
                    bYear: req.body.Byear,
                    gender: req.body.gender,
                    nation: "",
                    bio: "",
                }

                req.app.set('currentUser', req.body.account);
                user_name = req.body.account;

                userController.createAcc(userAcc);
                chatController.createChatRoom(userAcc.id, function(chatroom) {
                    console.log(chatroom.id)
                    var chatuser = {
                        ChatRoomId: chatroom.id,
                        UserId: "admin"
                    }
                    chatController.createChatUser(chatuser)

                    var adminChatUser = {
                        ChatRoomId: 1,
                        UserId: userAcc.id
                    }
                    chatController.createChatUser(adminChatUser)

                    var today = new Date();
                    var mess = {
                        id: today.getFullYear() + '_' + (today.getMonth() + 1) + '_' +today.getDate() + '_' + today.getHours() + "_" + today.getMinutes() + "_" + today.getSeconds() + "_" + today.getMilliseconds() + "_" + "admin" + "_" + userAcc.id,
                        person1: "admin",
                        person2: userAcc.id,
                        who: "admin",
                        contentMess: "Welcom to Mind-Sharing!"
                    }
                    chatController.createMess(mess)
                })

                
                res.redirect("/");
            }
        });
    }
});


module.exports = router;