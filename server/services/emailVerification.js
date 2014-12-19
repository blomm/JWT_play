var _ = require('underscore');
var fs = require('fs');
var jwt = require('jwt-simple');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var config = require('./config.js');

var model ={
    verifyUrl:'http://localhost:3000/auth/verifyEmail?token=',
    title:'jwtPlay',
    subtitle:'thanks for signing up',
    body: 'please verify email address by clicking below'
}

exports.send = function(email){

    var payload= {
        sub: email
    }

    var token = jwt.encode(payload, config.EMAIL_SECRET);

    //console.log(getHtml(token));

    var transporter = nodemailer.createTransport(smtpTransport())

}



function getHtml(token){
    var path = './views/emailVerification.html';
    var html = fs.readFileSync(path, {encoding:'utf8'});

    var template = _.template(html);

    model.verifyUrl += token;

    return template(model);
}

_.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
};