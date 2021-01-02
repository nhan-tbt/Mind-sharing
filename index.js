const express = require('express');
const hbs = require('express-handlebars');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const controller = require('./controllers/blogController');
const http = require('http')
const socketio = require('socket.io')
const multer = require('multer');
const path = require('path')

var app = express();
const server = http.createServer(app);
const io = socketio(server);

var chatId = 1;

//Storage
const storage = multer.diskStorage({
    destination: __dirname + '/' + '/images',
    filename: function(req, file, cb) {
        cb(null, file.filename + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
}).single('myImage');

app.post('/upload', function(req, res) {
    upload(req, res, (err) => {
        if(err){
            console.log(err)
        } 
    });
});

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
app.set('currentUser', '');

io.on('connection', socket => {
    // socket.emit('message', `Hello ${currentUser}!`);

    // socket.on('disconnect', () => {
    //     io.emit('message', "Oops");
    // })

    //Listen
    socket.on('chatMessage', (mess) => {
        var messes = {
            id: mess.dateTime,
            ChatId: chatId,
            who: mess.user,
            typeMess: 'TEXT',
            contentMess: mess.mess,
        }
        controller.createMess(messes);
        io.emit('message', mess)
    })
})

app.get('/',function(req,res){
    res.locals.currentUser = req.app.get('currentUser');
    
    controller.searchAllPost(function(posts){
        res.locals.posts = posts;
        
        res.render('index');
    });
})

app.get('/profile',function(req,res){
    res.render('profile');
})

app.get('/contact',function(req,res){
    res.render('contact');
})

app.get('/message',function(req,res){
    controller.searchChat(req.app.get('currentUser'), function(chats) {
        controller.searchAcc(chats[0].UserId, function(user){
            chatId = chats[0].id;
            controller.searchMess(chats[0].id,function(messes){
                res.locals.enemy = user;
                res.locals.messes = messes;
                res.locals.chats = chats;

                res.render('message');
            })
        })
    });
})

app.get('/setting-password',function(req,res){
    res.render('setting-password');
})

app.get('/test',function(req,res){
    res.render('test');
})

app.get('/login',function(req,res){
    res.locals.layout = 'log_res_Layout.hbs';

    res.render('login');
})

app.get('/login',function(req,res){
    res.locals.layout = 'log_res_Layout.hbs';

    res.render('login');
})

app.get('/user_wall',function(req,res){
    res.render('user_wall');
})

app.get('/login',function(req,res){
    res.locals.layout = 'log_res_Layout.hbs';

    res.render('login');
})


app.get('/register',function(req,res){
    res.locals.layout = 'log_res_Layout.hbs';

    res.render('register');
})

app.post('/get_infor_register', (req, res) => {
    if (req.body.account.includes(" ")){
        res.locals.layout = 'log_res_Layout.hbs';
        res.locals.resAnnoun = '*Account cannot contain space';
        res.render('register');
    }
    else {
        controller.searchAcc(req.body.account, function(this_user) {
            if (this_user != null){
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
    
                controller.createAcc(userAcc);
                res.redirect("/");
            }
        });
    }
});

app.post('/get_infor_login', (req, res) => {

    controller.searchAcc(req.body.account, function(this_user) {
        if (this_user != null){
            if (bcrypt.compareSync(req.body.password, this_user.password)){
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

server.listen(app.get('port'),function(){
    console.log("Server is listening on port "+ app.get('port'))
});