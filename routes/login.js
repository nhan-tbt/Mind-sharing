var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const userController = require('../controllers/userController');


router.get('/', function (req, res) {
    res.locals.layout = 'log_res_Layout.hbs';
    req.app.set('currentUser', "");

    res.render('login');
})

router.post('/get_infor_login', (req, res) => {

    userController.searchAcc(req.body.account, function (this_user) {
        if (this_user != null) {
            if (bcrypt.compareSync(req.body.password, this_user.password)) {
                req.app.set('currentUser', req.body.account);

                res.redirect("/");
            }
            else {
                res.locals.layout = 'log_res_Layout.hbs';
                res.locals.resAnnoun = '*Invalid username or password';
                res.render('login');
            }
        }
        else {
            res.locals.layout = 'log_res_Layout.hbs';
            res.locals.resAnnoun = '*Invalid username or password';

            res.render('login');
        }
    });
});

module.exports = router;