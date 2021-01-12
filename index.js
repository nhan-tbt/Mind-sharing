const AnnouController = require('./controllers/annouController');
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
    if(req.app.get('currentUser') == '' || req.app.get('currentUser') == null){   res.locals.currentUser = "";    } 
    else {  res.locals.currentUser = req.app.get('currentUser');    }
    
    AnnouController.searchAllAnnoun(function(annou) {
        res.locals.announcement = annou;
    })

    
    next();
})

app.use('/', require('./routes/home')); // home page

app.use('/login', require('./routes/login')); // login page

app.use('/register', require('./routes/register')); // register page

app.use('/message', require('./routes/message')); // message page

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

server.listen(app.get('port'),function(){
    console.log("Server is listening on port "+ app.get('port'))
});
