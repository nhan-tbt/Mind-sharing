const express = require('express');
const hbs = require('express-handlebars');
const bcrypt = require('bcrypt');
const fs = require('fs');
const bodyParser = require("body-parser");
const controller = require('./controllers/blogController');

var app = express();

const anonymous = 1;
const user = 2;
const admin = 3;

var current_user = anonymous;
var user_name = "";

var accountFile = JSON.parse(fs.readFileSync(__dirname + "/json/account.json"));

app.engine('hbs', hbs({
    extname:'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname +'/views/layouts',
    partialsDir: __dirname +'/views/particals',
    runtimeOptions:{
      allowProtoPropertiesByDefault: true
  },
}));

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'hbs');
app.set('port',(process.env.PORT || 5000));

app.get('/',function(req,res){
    res.render('index', {current_user: current_user, user_name: user_name });
})

app.get('/profile',function(req,res){
    res.render('profile', {current_user: current_user, user_name: user_name });
})

app.get('/contact',function(req,res){
    res.render('contact', {current_user: current_user, user_name: user_name });
})

app.get('/message',function(req,res){
    res.render('message', {current_user: current_user, user_name: user_name });
})

app.get('/setting-password',function(req,res){
    res.render('setting-password', {current_user: current_user, user_name: user_name });
})

app.get('/setting-privacy',function(req,res){
    res.render('setting-privacy', {current_user: current_user, user_name: user_name });
})

app.get('/setting-general',function(req,res){
    res.render('setting-general', {current_user: current_user, user_name: user_name });
})

app.get('/user_wall',function(req,res){
    res.render('user_wall', {current_user: current_user, user_name: user_name });
})

app.get('/login',function(req,res){
    res.render('login', {layout: 'log_res_Layout.hbs'});
})

app.get('/register',function(req,res){
    res.render('register', {layout: 'log_res_Layout.hbs'});
})

app.post('/get_infor_register', (req, res) => {

    if (req.body.account.includes(" ")){
        res.render('register', {resAnnoun: '*Account cannot contain space', func: "register()"});
    }
    else {
        controller.searchAcc(req.body.account, function(this_user) {
            if (this_user != null){
                res.render('register',{layout: 'log_res_Layout.hbs', resAnnoun: '*Account ' + req.body.account + ' has already exists', func: "register()"});
            }
            else {
                var salt = bcrypt.genSaltSync(10);

                var userAcc = {
                    id: req.body.account,
                    type: "USER",
                    password: bcrypt.hashSync(req.body.password, salt),
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
                    bio: ""
                }
    
                current_user = user;
                user_name = req.body.account;
    
                controller.createAcc(userAcc);
                res.redirect("/");
            }
        });
    }
});



app.post('/get_infor_login', (req, res) => {
    controller.searchAcc(req.body.account, function(this_user) {
        if (this_user.length != 0){
            if (bcrypt.compareSync(req.body.password, this_user.password)){
                current_user = user;
                user_name = req.body.account;
                res.redirect("/");
            }
            else {
                res.render('login', {layout: 'log_res_Layout.hbs', resAnnoun: '*Invalid username or password'});
            }
        }
        else {
            res.render('login', {layout: 'log_res_Layout.hbs', resAnnoun: '*Invalid username or password'});
        }
    });
});



app.listen(app.get('port'),function(){
    console.log("Server is listening on port "+ app.get('port'));
});
