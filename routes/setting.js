var express = require('express');
var router = express.Router();


router.use('/password', function (req, res) {
    res.render('setting-password');
})

router.use('/privacy', function (req, res) {
    res.render('setting-privacy');
})

router.use('/general', function (req, res) {
    res.render('setting-general');
})


module.exports = router;