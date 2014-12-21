var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');


var UserSchema=new mongoose.Schema({
    email:String,
    password:String,
    googleId:String,
    facebookId:String,
    displayName:String,
    active:Boolean
});

//this removes the password from the user object
UserSchema.methods.toJSON = function(){
    var user = this.toObject();
    delete user.password;

    return user;
}

UserSchema.methods.comparePasswords = function(password, callback){
    //'this' refers to UserSchema
    bcrypt.compare(password, this.password, callback);
}

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

module.exports = mongoose.model('User', UserSchema);

