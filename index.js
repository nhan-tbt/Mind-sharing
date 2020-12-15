const express = require('express');
const hbs = require('express-handlebars');

var app = express();

app.use(express.static(__dirname));

app.engine('hbs', hbs({
    extname:'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname +'/views/layouts',
    partialsDir: __dirname +'/views/particals',
    runtimeOptions:{
      allowProtoPropertiesByDefault: true
  },
}));

app.set('view engine', 'hbs');
app.set('port',(process.env.PORT || 5000));

// main
app.get('/',function(req,res){
    res.render('index');
})

app.get('/profile',function(req,res){
    res.render('profile');
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

// app.use('/recipes', require('./routers/recipes'));
// app.use('/search', require('./routers/search'));

app.listen(app.get('port'),function(){
    console.log("Server is listening on port "+ app.get('port'));
});
