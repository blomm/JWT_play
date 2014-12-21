var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var createSendToken = require('./services/jwt.js');
var jobs = require('./services/jobs.js');
var passport = require('passport');
var localStrategy = require('./services/localStrategy.js');
var facebookAuth = require('./services/facebookAuth.js');
var googleAuth = require('./services/googleAuth.js');
var emailVerification = require('./services/emailVerification.js');
var app = express();

//emailVerification.send('fake@fake.com');

app.use(bodyParser.json());
app.use(passport.initialize());

passport.serializeUser(function(user, done){
  done(null, user.id);
})

app.use(function(req, res, next){
  //these headers will enable CORS (cross origin resource sharing)
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  next();
})




passport.use('local-login', localStrategy.login);
passport.use('local-register', localStrategy.register);

//register, any user can register
app.post('/register', passport.authenticate('local-register'), function(req, res){
  emailVerification.send(req.user.email, res);
  createSendToken(req.user, res);
  /*var user = req.body;

  var newUser = new User({
    email: user.email,
    password: user.password
  });

  newUser.save(function(err){
    createSendToken(newUser, res);
  });*/
})

//login, user already has registered
app.post('/login', passport.authenticate('local-login'), function(req, res){

  createSendToken(req.user, res);

  /*passport.authenticate('local', function(err, user){
    if(err) next(err);

    req.login(user, function(err){
      if(err) next(err);
      createSendToken(user, res);
    })
  })(req, res, next)
*/
  //req.user = req.body;
  //var searchUser = {email:req.user.email};

})

app.post('/auth/facebook', facebookAuth);

app.post('/auth/google', googleAuth);

app.get('/jobs', jobs);

app.get('/auth/verifyEmail', emailVerification.handler)

mongoose.connect('mongodb://localhost/jwt')

var server = app.listen(3000, function(){
  console.log('api listening on', server.address().port);
})
