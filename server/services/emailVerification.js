var _ = require('underscore');
var fs = require('fs');
var jwt = require('jwt-simple');
var nodemailer = require('nodemailer');
var config = require('./config.js');
var User = require('../models/User.js');
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

exports.handler = function(req,res){
    var token = req.query.token;

    var payload = jwt.decode(token, config.LOCAL_SECRET);

    var email = payload.sub;

    if(!email) return errorHandler(res);

    User.findOne({email:email}, function(err, foundUser){
        if(err) return res.status(500);

        if(!foundUser) return errorHandler(res);

        if (!foundUser.active){
            foundUser.active = true;
        }
        foundUser.save(function(err){
            if(err) return res.status(500);
            return res.redirect(config.APP_URL);
        });
    })
    console.log('token '+ token);
}

function errorHandler(res){
    return res.status(401).send({
        message:'Authentication failed, unable to verify email'
    });
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