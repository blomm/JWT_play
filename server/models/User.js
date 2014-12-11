var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');


var UserSchema=new mongoose.Schema({
    email:String,
    password:String
});

//this removes the password from the user object
UserSchema.methods.toJSON = function(){
    var user = this.toObject();
    delete user.password;

    return user;
}

exports.model = mongoose.model('User', UserSchema);

//this hashes our password before it's saved
UserSchema.pre('save', function(next){
    var user = this;

    if(!user.isModified('password')) return next();

    bcrypt.genSalt(10, function(err, salt){
        if(err) return next(err);

        bcrypt.hash(user.password, salt, null, function(err, hash){
            if(err) return next(err);

            user.password = hash;
            next();
        })
    })

})


