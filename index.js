const chatController = require('./controllers/chatController');
const express = require('express');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const Busboy = require('busboy')
const http = require('http');
const socketio = require('socket.io');


var app = express();
const server = http.createServer(app);
const io = socketio(server);

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
    if(req.app.get('currentUser') == ''){   res.locals.currentUser = "";    } 
    else {  res.locals.currentUser = req.app.get('currentUser');    }
    
    next();
})

app.use('/', require('./routes/home')); // home page

app.use('/login', require('./routes/login')); // login page

app.use('/register', require('./routes/register')); // register page

app.use('/message', require('./routes/message')); // message page

app.use('/wall', require('./routes/wall')); // wall page

app.use('/profile', require('./routes/profile')); // profile page

app.use('/contact', require('./routes/contact')); // contact page

app.use('/setting', require('./routes/setting')); // setting page


io.on('connection', socket => {
    // socket.emit('message', `Hello ${currentUser}!`);

    // socket.on('disconnect', () => {
    //     io.emit('message', "Oops");
    // })

    //Listen
    socket.on('chatMessage', (mess) => {
        console.log("sended")
        io.emit('message', mess)
    })
})

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
