var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');


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
                    avtPath: "",
                    bgPath: "",
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
                res.redirect("/");
            }
        });
    }
});


module.exports = router;