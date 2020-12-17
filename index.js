const express = require('express');
const hbs = require('express-handlebars');
const bcrypt = require('bcrypt');
const fs = require('fs');
const bodyParser = require("body-parser");
var app = express();

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
    res.render('index');
})

app.get('/profile',function(req,res){
    res.render('profile');
})

app.get('/message',function(req,res){
    res.render('message');
})

app.get('/user_wall',function(req,res){
    res.render('user_wall');
})

app.get('/login',function(req,res){
    res.render('login', {layout: 'log_res_Layout.hbs'});
})

app.get('/register',function(req,res){
    res.render('register', {layout: 'log_res_Layout.hbs'});
})

function checkExist(ArrAcc, newAcc){

    var check = false;
    ArrAcc.forEach(ele => {
        if (String(ele.account) === String(newAcc))
            check = true;
        }
    )
    return check;
}

app.post('/get_infor_register', (req, res) => {
    if (req.body.account.includes(" ")){
        res.render('register', {resAnnoun: '*Account cannot contain space', func: "register()"});
    }
    else {
        if (checkExist(accountFile.userInfor, req.body.account) == false){
            var user = {};
            user.fname = req.body.fname;
            user.lname = req.body.lname;
            user.account = req.body.account;
            user.password = req.body.password;
            user.avtImage = "";
            user.bgImage = "";
            user.email = "";
            user.pNumber = "";
            user.Bday = req.body.Bday;
            user.Bmonth = req.body.Bmonth;
            user.Byear = req.body.Byear;
            user.gender = req.body.gender;
            user.nation = "";
            user.bio = "";
            
            var salt = bcrypt.genSaltSync(10);
            user.password = bcrypt.hashSync(user.password, salt);

            accountFile.userInfor.push(user);
            fs.writeFileSync(__dirname + "/json/account.json", JSON.stringify(accountFile));

            res.redirect("/");
        }
        else {
            res.render('register',{layout: 'log_res_Layout.hbs', resAnnoun: '*Account ' + req.body.account + ' has already exists', func: "register()"});
        }
    }
});

function checkLogin(ArrAcc, Acc, Pass){
    var check = false;
    
    ArrAcc.forEach(ele => {
        if (String(ele.account) == String(Acc))
            if (bcrypt.compareSync(Pass, ele.password))
                check = true;
    })

    return check;
}

app.post('/get_infor_login', (req, res) => {
    if (checkLogin(accountFile.userInfor, req.body.account, req.body.password)){
        res.redirect("/");
    }
    else{
        res.render('login', {layout: 'log_res_Layout.hbs', resAnnoun: '*Invalid username or password'});
    }
});

app.listen(app.get('port'),function(){
    console.log("Server is listening on port "+ app.get('port'));
});
