const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
    avatarUrl: {type : String  },
    city: {type : String },
    companyName: {type : String , required : true, unique: true},
    countryCode: {type : String },
    email: {type : String },
    facebookId: {type : String },
    firstName: {type : String},
    gender: {type : String},
    isAmbassador: {type : Boolean },
    isBusiness: {type : Boolean },
    isVerified: {type : Boolean },
    jobTitle: {type : String },
    lastName: {type : String },
    payload: {type : String },
    phoneNumber: {type : String },
    requestNonce: {type : String },
    signature: {type : String },
    signatureAlgorithm: {type : String},
    street: {type : String },
    successful: {type : Boolean },
    twitterId: {type : String },
    url: {type : String },
    zipcode: {type : String},
}, {timestamps : true});

const User = mongoose.model('user' , UserSchema);
module.exports = User;