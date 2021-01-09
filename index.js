const express = require('express');
const hbs = require('express-handlebars');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const controller = require('./controllers/blogController');
const http = require('http')
const socketio = require('socket.io')
const Busboy = require('busboy')
const inspect = require('util').inspect


var app = express();
const server = http.createServer(app);
const io = socketio(server);

var chatId = 1;

app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/particals',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true
    },
}));

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'hbs');
app.set('port', (process.env.PORT || 5000));
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

app.get('/', function (req, res) {
    res.locals.currentUser = req.app.get('currentUser');

    controller.searchAllPost(function (posts) {
        res.locals.posts = posts;

        res.render('index');
    });
})

app.get('/profile', function (req, res) {
    res.render('profile');
})

app.get('/contact', function (req, res) {
    res.render('contact');
})

app.get('/create_post', function (req, res) {
    res.render('create_post');
})

app.get('/message', function (req, res) {
    controller.searchChat(req.app.get('currentUser'), function (chats) {
        controller.searchAcc(chats[0].UserId, function (user) {
            chatId = chats[0].id;
            controller.searchMess(chats[0].id, function (messes) {
                res.locals.enemy = user;
                res.locals.messes = messes;
                res.locals.chats = chats;

                res.render('message');
            })
        })
    });
})

app.get('/setting-password', function (req, res) {
    res.render('setting-password');
})

app.get('/setting-privacy', function (req, res) {
    res.render('setting-privacy');
})

app.get('/setting-general', function (req, res) {
    res.render('setting-general');
})

app.get('/test', function (req, res) {
    res.render('test');
})

app.get('/login', function (req, res) {
    res.locals.layout = 'log_res_Layout.hbs';

    res.render('login');
})

app.get('/user_wall', function (req, res) {
    res.render('user_wall');
})

app.get('/login', function (req, res) {
    res.locals.layout = 'log_res_Layout.hbs';

    res.render('login');
})


app.get('/register', function (req, res) {
    res.locals.layout = 'log_res_Layout.hbs';

    res.render('register');
})

app.post('/get_infor_register', (req, res) => {
    if (req.body.account.includes(" ")) {
        res.locals.layout = 'log_res_Layout.hbs';
        res.locals.resAnnoun = '*Account cannot contain space';
        res.render('register');
    }
    else {
        controller.searchAcc(req.body.account, function (this_user) {
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

                controller.createAcc(userAcc);
                res.redirect("/");
            }
        });
    }
});

app.post('/get_infor_login', (req, res) => {

    controller.searchAcc(req.body.account, function (this_user) {
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

// app.post('/get_infor_change_pass', (req, res) => {
//     controller.searchAcc(currentUser, function (this_user) {
//         const passwordMatch = bcrypt.compareSync(req.body.password, this_user.password);
//         if (passwordMatch) {
//             let s1 = req.body.new_password;
//             let s2 = req.body.confirm_password;
//             const confirmPass = s1.localeCompare(s2);
//             if (confirmPass == 0) {
//                 var salt = bcrypt.genSaltSync(10);
//                 controller.update_pass(bcrypt.hashSync(req.body.new_password, salt), currentUser);
//                 res.render('setting-password', {func: 'Confirm_Notification();'});
//             }
//             else {
//                 res.render('setting-password', { Announ: '*Password does not match'});

//             }
//         }
//         else {
//             res.render('setting-password', { Announ: '*Password does not match' });
//         }
//     })
// })

const BUCKET_NAME = 'mind-sharing';
const IAM_USER_KEY = 'AKIATRGWWZO2WUH5TFNJ';
const IAM_USER_SECRET = '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';

app.post('/upload', function (req, res) {
    var busboy = new Busboy({ headers: req.headers });
    let s3bucket = new AWS.S3({
        accessKeyId: IAM_USER_KEY,
        secretAccessKey: IAM_USER_SECRET,
        Bucket: BUCKET_NAME
    });

    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        if (filename != ''){
            if (filename != ''){
                s3bucket.createBucket(function () {
                    var params = {
                        Bucket: BUCKET_NAME,
                        Key: filename,
                        Body: file
                    };
                    s3bucket.upload(params, function (err, data) {
                        if (err) {
                            console.log('error in callback');
                            console.log(err);
                        }
                        console.log('success');
                        console.log(data);
                    });
                });    
            }
            console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
        }
    });
    busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
      console.log('Field [' + fieldname + ']: value: ' + inspect(val));
    });
    req.pipe(busboy);
});

server.listen(app.get('port'),function(){
    console.log("Server is listening on port "+ app.get('port'))
});
