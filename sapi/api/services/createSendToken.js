var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('../../config/local.js');

module.exports = function(user, res){
  var payload= {
    //iss: req.hostname,
    sub: user.id,
    exp:moment().add(10,'days').unix()
  };

  //token is the header, the payload, and a signature created using the secret
  var token = jwt.encode(payload, config.secrets.LOCAL_SECRET);

  res.status(200).send({
    user:user.toJSON(),
    token:token
  });
}
