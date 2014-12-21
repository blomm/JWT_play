var jwt = require('jwt-simple');
var config = require('./config.js');

var jobs =['cook','cleaner','carpenter'];

module.exports = function(req,res){

    if(!req.headers.authorization){
        return res.status(401).send({message: 'You are not authorised'});
    }
    //remove the "Bearer " text at the start of the token...
    var token = req.headers.authorization.split(' ')[1];
    var payload=jwt.decode(token, config.LOCAL_SECRET);

    if(!payload.sub){
        return res.status(401).send({message: 'Authentication failed!'});
    }

    res.json(jobs);
}