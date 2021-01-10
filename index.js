const express = require('express');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const controller = require('./controllers/userController');
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

app.use((req, res, next) => {
    if(req.app.get('currentUser') == ''){
        res.locals.currentUser = "";
    } else {
        res.locals.currentUser = req.app.get('currentUser');
    }
    
    
    next();
})

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


app.use('/', require('./routes/home')); // home page

app.use('/login', require('./routes/login')); // login page

app.use('/register', require('./routes/register')); // register page

app.use('/profile', require('./routes/profile')); // profile page

app.use('/contact', require('./routes/contact')); // contact page

app.use('/message', require('./routes/message')); // message page

app.use('/setting', require('./routes/setting')); // setting page


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
