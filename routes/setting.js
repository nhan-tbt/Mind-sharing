var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');

const userController = require('../controllers/userController');


router.use('/password', function (req, res) {
    res.render('setting-password');
})

router.use('/privacy', function (req, res) {
    res.render('setting-privacy');
})

router.use('/general', function (req, res) {
    userController.searchAcc(req.app.get('currentUser'), function (this_user){
        res.locals.user = this_user;
        res.render('setting-general');
    })
    
})

router.post('/get_infor_change_pass', (req, res) => {
    userController.searchAcc(req.app.get('currentUser'), function (this_user) {
        const passwordMatch = bcrypt.compareSync(req.body.password, this_user.password);
        if (passwordMatch) {
            let s1 = req.body.new_password;
            let s2 = req.body.confirm_password;
            const confirmPass = s1.localeCompare(s2);
            if (confirmPass == 0) {
                var salt = bcrypt.genSaltSync(10);
                userController.update_pass(bcrypt.hashSync(req.body.new_password, salt), this_user.id);
                res.render('setting-password', {func: 'Confirm_Notification();'});
            }
            else {
                res.render('setting-password', { Announ: '*Password does not match'});

            }
        }
        else {
            res.render('setting-password', { Announ: '*Wrong password' });
        }
    })
})

router.post('/get_infor_edit', (req, res) => {
    var birthday = req.body.bDay;
    birthday = birthday.split("-");
    var new_infor = {
        fname: req.body.fname,
		lname: req.body.lname,
		email: req.body.email,
		address: req.body.address,
		pNum: req.body.pNum,
		bDay: parseInt(birthday[0]),
		bMonth: parseInt(birthday[1]),
		bYear: parseInt(birthday[2]),
		gender: req.body.gender,
		nation: req.body.nation,
		bio: req.body.bio
    }
    userController.update_infor(new_infor, req.app.get('currentUser'));
    res.redirect('/setting/general');
})

module.exports = router;