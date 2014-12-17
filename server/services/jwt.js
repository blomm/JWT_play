//all of this code can be replaced by jwt-simple: https://www.npmjs.com/package/jwt-simple
var crypto=require('crypto')

exports.encode = function(payload, secret){
    algorith = 'HS256';

    var header={
        type:'JWT',
        alg:algorith
    }

    //jwt is the header, the payload & the signature
    var jwt = base64Encode(JSON.stringify(header)) + '.' + base64Encode(JSON.stringify(payload));

    return jwt + '.' + sign(jwt, secret);
};

exports.decode=function(payload, secret){
    var segments = payload.split('.');

    if(segments.length !== 3){
        throw new Error("Token structure incorrect");
    }

    var header = JSON.parse(base64Decode(segments[0]));
    var payload = JSON.parse(base64Decode(segments[1]));

    var rawSignature = segments[0] + '.' + segments[1];

    //this is where we verify that we have the same user, and that
    //user is using a token that was issued by the server
    if(!verify(rawSignature, secret, segments[2])){
        throw new Error("Verification failed");
    }

    return payload;
}

function verify(rawSignature, secret, signature){
    return signature === sign(rawSignature, secret);
}

function base64Encode(str){
    return new Buffer(str).toString('base64');
}

function base64Decode(str){
    return new Buffer(str, 'base64').toString();
}

//this creates the signature, a crypto-signed combination of the header and the payload
function sign(str, key){
    return crypto.createHmac('sha256', key).update(str).digest('base64');
}