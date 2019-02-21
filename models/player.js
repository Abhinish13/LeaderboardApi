const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const  _ = require('lodash');
const bcrypt = require('bcryptjs');
//{
// email:'abhinish@prodevans.com'
// password:'adsfkljdasjflkasj' (hash password),
//tokens:[{
//      access:'auth',
//      token:'hdsajfklasjflasj'(hash string)
//}]
//}
//
//We are using third party module called Validator-npm
//always check the url for best results in the google
// we are going to install validator v5.6.0 --save
//create a constant call validator
//
//add this to the default model while editing the
// validator.isEmail
//message:{VALUE} is not valid email
//
//add token
// is the object of string which is used for authentication
//{
// tokens: [{
// access:'auth',
//  token:'jahsdfhkashfsahfkhasjdfhkasfdhkahsdfkh'
// }]
//}

var PlayerSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: false,

    },
    score: {
        type: Number,
        default: 0

    }

});

//to overide the method

// UserSchema.methods.toJSON = function () {
//     var user = this;
//     var userObject = user.toObject();
//
//
//     return _.pick(userObject, ['_id', 'email']);
// }

// this is for defining the userschema methods

// UserSchema.methods.generateAuthToken = function () {
//     var user = this;
//     var access = 'auth';
//     var token = jwt.sign({_id: user._id.toHexString(), access}, process.env.JWT_SECRET).toString();
//
//     user.tokens.push({access, token});
//
//     return user.save().then( () => {
//        return token;
//     });
// };


// UserSchema.methods.removeToken = function (token) {
//     var user = this;
//
//    return user.update({
//         $pull:{
//             tokens:{token}
//         }
//     });
// };



// UserSchema.statics.findByToken = function (token) {
//     var User = this;
//     var decoded;
//
//     try {
//        decoded = jwt.verify(token,process.env.JWT_SECRET);
//     }catch (e){
//         return Promise.reject();
//     }
//
//   return User.findOne({
//       '_id': decoded._id,
//       'tokens.token': token,
//       'tokens.access': 'auth'
//   });
// };

// UserSchema.statics.findByCredentials = function (email,password){
//
//     var User = this;
//
//     return User.findOne({email}).then((user) => {
//         if(!user){
//             return Promise.reject();
//         }
//
//         return new Promise((resolve ,reject) => {
//             //bcryptjs compare
//             bcrypt.compare(password,user.password, (err,res) =>{
//                 if(res){
//                     resolve(user);
//                 } else {
//                     reject();
//                 }
//             })
//         });
//     });
//
// };

// UserSchema.pre('save' , function (next) {
//     var user = this;
//
//     if(user.isModified('password'))
//     {
//         bcrypt.genSalt(10, (err, salt) => {
//             bcrypt.hash(user.password,salt,(err, hash)=> {
//                 user.password= hash;
//                 next();
//             });
//         });
//     }else {
//         next();
//     }
// });

var Player = mongoose.model('Player', PlayerSchema);




module.exports = {Player};