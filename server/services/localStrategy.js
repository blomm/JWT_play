var User = require('../models/User.js');
var LocalStrategy = require('passport-local').Strategy;

var strategyOptions = {
    usernameField:'email'
};

exports.login = new LocalStrategy(strategyOptions, function(email, password, done){
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



exports.register = new LocalStrategy(strategyOptions, function(email, password, done){

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