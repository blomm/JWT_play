var _ = require('underscore');
var fs = require('fs');
var jwt = require('jwt-simple');
var nodemailer = require('nodemailer');
var config = require('./config.js')
//var smtpTransport = require('nodemailer-smtp-transport');

var config = require('./config.js');

var model ={
    verifyUrl:'http://localhost:3000/auth/verifyEmail?token=',
    title:'jwtPlay',
    subtitle:'thanks for signing up',
    body: 'please verify email address by clicking below'
}

exports.send = function(email, res){

    var payload= {
        sub: email
    }

    var token = jwt.encode(payload, config.LOCAL_SECRET);

    //console.log(getHtml(token));

    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'michaelpeterblom@gmail.com',
            pass: config.GMAIL_PASS
        }
    });

    var mailOptions = {
        from: config.MAILING_ADDRESS, // sender address
        to: email, // list of receivers
        subject: 'jwtPlay account verification', // Subject line
        text: 'Hello world', // plaintext body
        html: getHtml(token) // html body
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
            return res.status(500, error);
        }else{
            console.log('email sent: ' + info.response);
        }
    })
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