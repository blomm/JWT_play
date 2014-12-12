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
}

function base64Encode(str){
    return new Buffer(str).toString('base64');
}

//this creates the signature, a crypto-signed combination of the header and the payload
function sign(str, key){
    return crypto.createHmac('sha256', key).update(str).digest('base64');
}