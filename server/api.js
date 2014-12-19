var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./models/User.js');
var createSendToken = require('./services/jwt.js');
var jwt = require('jwt-simple');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var request = require('request');
var facebookAuth = require('./services/facebookAuth.js')

var app = express();

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

var strategyOptions = {
  usernameField:'email'
};

var loginStrategy = new LocalStrategy(strategyOptions, function(email, password, done){
    var searchUser = {email:email};
    User.findOne(searchUser,function(err, user){
      if(err) return done(err);

      if(!user){
        return done(null, false, {message:'Email does not exist on record'});
      }

      user.comparePasswords(password, function(err, isMatch){
        if(err) return done(err);

        if (!isMatch) {
          return done(null, false, {message:'Incorrect password'});
        }
        return done(null, user);
        //createSendToken(user, res);
      });
    })
});



var registerStrategy = new LocalStrategy(strategyOptions, function(email, password, done){

  var newUser = new User({
    email: email,
    password: password
  });

  User.findOne({email:email},function(err, user) {

    if(err) return done(err);

    if(user){
      return done(null, false, {message:'Email already exists '});
    }

    newUser.save(function (err) {
      return done(null, newUser);
      //createSendToken(newUser, res);
    });
  });
})

passport.use('local-login', loginStrategy);
passport.use('local-register', registerStrategy);

//register, any user can register
app.post('/register', passport.authenticate('local-register'), function(req, res){

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

app.post('/auth/google', function(req, res){

  var url = 'https://accounts.google.com/o/oauth2/token';
  var apiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';

  var params = {
    client_id: req.body.clientId,
    redirect_uri: req.body.redirectUri,
    code: req.body.code,
    grant_type:'authorization_code',
    //for production, put this in a config file, not here
    client_secret:'9aU2NslBgyPisPRU9SuiNhTz'
  }
  request.post(url, {
    json:true,
    form:params
  },function(err, response, token){
    //console.log(token);
    var accessToken = token.access_token;
    var headers = {
      Authorization:'Bearer ' + accessToken
    }
    request.get({
      url:apiUrl,
      headers:headers,
      json:true
    }, function(error, response, profile){
      console.log(profile);
      User.findOne({googleId:profile.sub},function(err, foundUser){
        if(foundUser) return createSendToken(foundUser, res);

        //if we don't find the user in our db, register them
        var newUser = new User({googleId:profile.sub,displayName:profile.name});
        newUser.save(function(err){
          createSendToken(newUser, res);
        })
      })
    })
  });
})

var jobs =['cook','cleaner','carpenter'];

app.get('/jobs',function(req,res){

  if(!req.headers.authorization){
    return res.status(401).send({message: 'You are not authorised'});
  }
  //remove the "Bearer " text at the start of the token...
  var token = req.headers.authorization.split(' ')[1];
  var payload=jwt.decode(token, "sh..");

  if(!payload.sub){
    return res.status(401).send({message: 'Authentication failed!'});
  }

  res.json(jobs);
})

mongoose.connect('mongodb://localhost/jwt')

var server = app.listen(3000, function(){
  console.log('api listening on', server.address().port);
})
