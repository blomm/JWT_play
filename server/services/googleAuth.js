var createSendToken = require('./jwt.js');
var User = require('../models/User.js');
var request = require('request');
var config = require('./config.js');

module.exports = function(req, res){

    var url = 'https://accounts.google.com/o/oauth2/token';
    var apiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';

    var params = {
        client_id: req.body.clientId,
        redirect_uri: req.body.redirectUri,
        code: req.body.code,
        grant_type:'authorization_code',
        //for production, put this in a config file, not here
        client_secret:config.GOOGLE_SECRET
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
}