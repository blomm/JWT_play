/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var bcrypt = require('bcrypt-nodejs');
var createSendToken = require('../services/createSendToken.js');
//var User = require('../models/User.js');

module.exports = {
  login: function(req, res){
    var email = req.body.email;
    var password = req.body.password;

    if(!email || !password) {
      res.status(401).send({
        message: 'username and password required'
      });
    };

    User.findOneByEmail(email, function(err, foundUser){
      if(!foundUser){
        res.status(401).send({
          message: 'username or password invalid'
        });
      }
      //bcrypt
      bcrypt.compare(password, foundUser.password, function(err, isMatch){
        if(err) return res.status(403).send({message:'Error validating password'});

        if (!isMatch) {
          return res.status(401).send({message:'Incorrect password'});
        }

        createSendToken(foundUser, res);
        //createSendToken(user, res);
      });

    })
  },
  register:function(req,res){
    var email = req.body.email;
    var password = req.body.password;

    if(!email || !password) {
      res.status(401).send({
        message: 'username and password required'
      });
    };

    console.log(User);

    User.create({
      email:email,
      password:password
    }).exec(function(err, user){
      if(err){
        return res.status(403).send({message:'Error creating user in database'})
      }
      createSendToken(user, res);
    })
  }
};

