var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./models/User.js');
//var jwt= require('./services/jwt.js');
var jwt = require('jwt-simple');

var app = express();

app.use(bodyParser.json());

app.use(function(req, res, next){
  //these headers will enable CORS (cross origin resource sharing)
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  next();
})


//register, any user can register
app.post('/register', function(req, res){

  var user = req.body;

  var newUser = new User({
    email: user.email,
    password: user.password
  });

  newUser.save(function(err){
    createSendToken(newUser, res);
  });
})

//login, user already has registered
app.post('/login', function(req, res){
  req.user = req.body;

  var searchUser = {email:req.user.email};

  User.findOne(searchUser,function(err, user){
    if(err) throw err;

    if(!user){
      return res.status(401).send('Email does not exist on record');
    }

    user.comparePasswords(req.user.password, function(err, isMatch){
      console.log('error: '+ err);
      if(err){
        return res.status(401).send('Incorrect password error');
      }

      if (!isMatch) {
        return res.status(401).send('Incorrect password');
      }
      createSendToken(user, res);
    });
  })
})

function createSendToken(user, res){

  var payload= {
    //iss: req.hostname,
    sub: user.id
  }

  //token is the header, the payload, and a signature created using the secret
  var token = jwt.encode(payload, "sh..");

  res.status(200).send({
    user:user.toJSON(),
    token:token
  });
}

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
