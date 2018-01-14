var express = require('express');
var app = express();
var port=3000;

var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var flash = require('connect-flash');

app.use(express.static('static'));

var config = require('./config/database.js');

mongoose.connect(config.database,{useMongoClient: true});
mongoose.connection.on('connected',()=>{
  console.log('Connected to database '+config.database);
})

require('./config/passport')(passport);

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
  key: 'sessid',
  secret: 'sessionissecret',
  resave: true,
  saveUninitialized: true,
  cookie: {
    path: '/',
    httpOnly: false,
    secure: false,
    maxAge:  60 *60 * 1000,
    signed: false
  }
}))
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session



app.set('view engine', 'ejs');


require('./app/routes/user.js')(app, passport);
require('./app/routes/levels.js')(app, passport);

app.listen(port,()=>{
	console.log('Server running on port: ' + 3000);
});
